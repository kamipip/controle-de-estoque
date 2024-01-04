package br.edu.ifrn.vendasestoque.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.edu.ifrn.vendasestoque.domain.usuario.Usuario;

@Service
public class TokenService {

  @Value("${api.estoque.token.secret}")
  private String seacret;

  public String gerarToken(Usuario usuario) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(seacret);
      return JWT.create()
          .withIssuer("API Controle de estoque IFRN")
          .withSubject(usuario.getLogin())
          .withClaim("id", usuario.getId())
          .withExpiresAt(dataExpiracao())
          .sign(algorithm);
    } catch (JWTCreationException exception) {
      throw new RuntimeException("Erro ao gerar o token", exception);
    }
  }

  public String getSubject(String tokenJWT) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(seacret);
      return JWT.require(algorithm)
          // specify an specific claim validations
          .withIssuer("API Controle de estoque IFRN")
          // reusable verifier instance
          .build().verify(tokenJWT).getSubject();

    } catch (JWTVerificationException exception) {
      throw new RuntimeException("Token inválido ou expirado");
    }
  }

  private Instant dataExpiracao() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }
}
