package com.catai.job.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "input")
public class UserInput {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String userInput;

	public UserInput() {
	}

	public UserInput(String userInput) {
		this.userInput = userInput;
	}

	public UserInput(Long id, String userInput) {
		this.id = id;
		this.userInput = userInput;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserInput() {
		return userInput;
	}

	public void setUserInput(String userInput) {
		this.userInput = userInput;
	}

	@Override
	public String toString() {
		return "UserInput [id=" + id + ", userInput=" + userInput + "]";
	}
	
	
	
	
}
