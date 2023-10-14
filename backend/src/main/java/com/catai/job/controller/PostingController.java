package com.catai.job.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catai.job.model.Posting;
import com.catai.job.payload.MessageResponse;
import com.catai.job.repository.PostingRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/post")
public class PostingController {
	@Autowired
	private PostingRepository postingRepository;
	
	
	@PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Posting posting) {
		try {
            Posting createdPosting = postingRepository.save(posting);

            return new ResponseEntity<>("Post entry created with ID: " + createdPosting.getId(), HttpStatus.CREATED);
		}catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(new MessageResponse("Error: Unable to create the store."));
	    }
	}
	
	@GetMapping("/list")
    public ResponseEntity<List<Posting>> listPost() {
        List<Posting> postList = postingRepository.findAll();
        return ResponseEntity.ok(postList);
    }
	
	@GetMapping("/get/{id}")
    public ResponseEntity<?> getPostbyId(@PathVariable Long id) {
        Optional<Posting> postOptional = postingRepository.findById(id);

        if (postOptional.isPresent()) {
            return ResponseEntity.ok(postOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            // Check if the rice entry with the given ID exists
            Optional<Posting> postOptional = postingRepository.findById(id);
            if (!postOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            // Delete the rice entry from the database
            postingRepository.deleteById(id);

            return ResponseEntity.ok(new MessageResponse("Post entry deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: Unable to delete the post entry."));
        }
    }
	
}
