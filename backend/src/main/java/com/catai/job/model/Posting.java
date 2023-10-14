package com.catai.job.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "posting")
public class Posting {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String description;
	
	private String jobType;
	
	private String location;
	
	@Column(name = "start_time")
	@Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date start;
	
	@Column(name = "end_time")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date end;

	public Posting() {
	}
	

	public Posting(String description, String jobType, String location, Date start, Date end) {
		this.description = description;
		this.jobType = jobType;
		this.location = location;
		this.start = start;
		this.end = end;
	}


	public Posting(Long id, String description, String jobType, String location, Date start, Date end) {
		this.id = id;
		this.description = description;
		this.jobType = jobType;
		this.location = location;
		this.start = start;
		this.end = end;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	@Override
	public String toString() {
		return "Posting [id=" + id + ", description=" + description + ", jobType=" + jobType + ", location=" + location
				+ ", start=" + start + ", end=" + end + "]";
	}

	
    
    
    
}
