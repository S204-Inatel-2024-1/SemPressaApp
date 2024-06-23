package com.sempressa.backend.domain.token_black_list;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "token_blacklist")
@Data
public class TokenBlackList {

    @Id
    private String token;
    private LocalDateTime expirationDate;

    // Getters and setters
}
