package com.sempressa.backend.infra.security;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.sempressa.backend.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${backend.security.token.secret}")
    private String secret;

    public String gerarToken(User user) {
        try {
            //Assinatura do token, passar uma senha
            var algoritmo = Algorithm.HMAC256(secret);
            //se quiser pode usar o withcalim, para ter mais informações do usuario no token
            String token =  JWT.create()
                .withIssuer("API sem Pressa App") //identificar a api que é dona da geração do token
                .withSubject(user.getEmail())
                    .withClaim("id", user.getId())
                    .withClaim("role", user.getRole())
                    .withClaim("name", user.getName())
                .withExpiresAt(dataExpiracao())
                .sign(algoritmo);

            return token;
        } catch (JWTCreationException exception){
            throw new RuntimeException("erro ao gerar token jwt", exception);
        }
    }

    public String getSubject(String tokenJWT){
        try {
            var algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                            .withIssuer("API sem Pressa App")
                            .build()
                            .verify(tokenJWT)
                            .getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Token JWT inválido ou expirado!");
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-03:00"));
    }
}
