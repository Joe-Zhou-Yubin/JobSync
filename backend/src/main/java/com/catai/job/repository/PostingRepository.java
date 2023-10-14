package com.catai.job.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catai.job.model.Posting;

public interface PostingRepository extends JpaRepository<Posting, Long>{

}
