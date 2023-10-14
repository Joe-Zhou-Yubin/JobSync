package com.catai.job.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.catai.job.model.ERole;
import com.catai.job.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}