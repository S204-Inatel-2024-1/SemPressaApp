package com.sempressa.backend.service;

import com.sempressa.backend.domain.token_black_list.TokenBlackList;
import com.sempressa.backend.domain.token_black_list.TokenBlackListRepository;
import com.sempressa.backend.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenBlackListRepository tokenBlacklistRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username);
    }

    // Adicionar token à lista negra
    public void addToBlacklist(String token, LocalDateTime expirationDate) {
        TokenBlackList tokenBlacklist = new TokenBlackList();
        tokenBlacklist.setToken(token);
        tokenBlacklist.setExpirationDate(expirationDate);
        tokenBlacklistRepository.save(tokenBlacklist);
    }

    // Verificar se o token está na lista negra
    public boolean isTokenBlacklisted(String token) {
        return tokenBlacklistRepository.findByToken(token).isPresent();
    }
}
