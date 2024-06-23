package com.sempressa.backend.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, Long> {
        UserDetails findByEmail(String email);
}
