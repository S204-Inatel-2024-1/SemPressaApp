package com.sempressa.backend.domain.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
        UserDetails findByEmail(String email);
        Page<User> findAllByRole(String userRole, Pageable pageable);
}
