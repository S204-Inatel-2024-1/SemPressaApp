package com.sempressa.backend.controller;

import com.sempressa.backend.domain.user.AuthenticationDTO;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.infra.security.JWTTokenDTO;
import com.sempressa.backend.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity efetuarLogin(@RequestBody @Valid AuthenticationDTO dados){
        //Cria DTO UsernamePasswordAuthenticationToken
        //Para receber o token
        System.out.println("passei aqui");
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.password());

        //dispara o processo de autenticação
        var authentication = manager.authenticate(authenticationToken);
        System.out.println("Aqui ");

        try {
            var tokenJWT = tokenService.gerarToken((User) authentication.getPrincipal());
            return ResponseEntity.ok(new JWTTokenDTO(tokenJWT));
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
