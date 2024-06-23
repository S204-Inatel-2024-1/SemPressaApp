package com.sempressa.backend.domain.token_black_list;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenBlackListRepository extends JpaRepository<TokenBlackList, Long> {
    Optional<TokenBlackList> findByToken(String token);
}
