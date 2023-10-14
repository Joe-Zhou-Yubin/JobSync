package com.catai.job.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catai.job.dto.CompletionRequest;
import com.catai.job.dto.CompletionResponse;
import com.catai.job.dto.OpenAiApiClient;
import com.catai.job.model.Posting;
import com.catai.job.model.UserInput;
import com.catai.job.payload.MessageResponse;
import com.catai.job.repository.PostingRepository;
import com.catai.job.repository.UserInputRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ai")
public class PromptController {
	@Autowired
	private final OpenAiApiClient openAiApiClient;
	
	@Autowired
    private final ObjectMapper objectMapper;
	
	@Autowired
	private PostingRepository postingRepository;
	
	@Autowired
	private UserInputRepository userInputRepository;
	
	@Autowired
	public PromptController(OpenAiApiClient openAiApiClient, ObjectMapper objectMapper,
			PostingRepository postingRepository, UserInputRepository userInputRepository) {
		super();
		this.openAiApiClient = openAiApiClient;
		this.objectMapper = objectMapper;
		this.postingRepository = postingRepository;
		this.userInputRepository = userInputRepository;
	}
	
	@PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody UserInput inputRequest) {
		try {
	        String userinput = inputRequest.getUserInput();
			
	        List<String> presetPrompts = new ArrayList<>();
	        presetPrompts.add("extract information from the following user input:");
	        presetPrompts.add("description of the job, job type (for example waiter, shop helper, cook), location of the job, start time and end time of the job posting");
	        presetPrompts.add("and parse the information back to me only in json format(datatype String description, datatype String jobType, datatype String location, datatype Date start (yyyy-MM-dd HH:mm:ss), datatype Date end (yyyy-MM-dd HH:mm:ss))");
	        presetPrompts.add("Context: today is 14 October 2023 ");

	        presetPrompts.add("user input below: ");
	        
	        OpenAiApiClient.OpenAiService service = OpenAiApiClient.OpenAiService.GPT_3;
	        
	        List<String> combinedPrompts = new ArrayList<>();
	        combinedPrompts.addAll(presetPrompts);
	        combinedPrompts.add(userinput);

	        String combinedPrompt = String.join("\n\n", combinedPrompts);
	        System.out.println(combinedPrompt);

	        // Create a completion request with the combined prompt
	        CompletionRequest completionRequest = CompletionRequest.defaultWith(combinedPrompt);
	        String requestBodyAsJson = objectMapper.writeValueAsString(completionRequest);

	        // Send request to OpenAI API and get the response JSON
	        String responseJson = openAiApiClient.postToOpenAiApi(requestBodyAsJson, service);

	        // Parse the JSON response using ObjectMapper
	        CompletionResponse completionResponse = objectMapper.readValue(responseJson, CompletionResponse.class);
	        
	     // Get the answer from the response
	        String answer = completionResponse.firstAnswer().orElse("");

	        // Print the response from ChatGPT
	        System.out.println("Response from ChatGPT:");
	        System.out.println(answer);
	        
	        JsonNode jsonResponse = objectMapper.readTree(answer);

	        String description = jsonResponse.get("description").asText();
	        String jobType = jsonResponse.get("jobType").asText();
	        String location = jsonResponse.get("location").asText();
	        String start = jsonResponse.get("start").asText();
	        String end = jsonResponse.get("end").asText();
	        
	        Date startDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(start);
	        Date endDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(end);

	        Posting postingFromResponse = new Posting (description, jobType, location, startDate, endDate);

            Posting createdPosting = postingRepository.save(postingFromResponse);

            return new ResponseEntity<>("Post entry created with ID: " + createdPosting.getId(), HttpStatus.CREATED);
		}catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(new MessageResponse("Error: Unable to create the store."));
	    }
	}

	
	
}
