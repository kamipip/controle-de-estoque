package br.edu.ifrn.vendasestoque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.vendasestoque.domain.usuario.DadosAutenticacao;
import br.edu.ifrn.vendasestoque.domain.usuario.Usuario;
import br.edu.ifrn.vendasestoque.infra.security.DadosTokenJWT;
import br.edu.ifrn.vendasestoque.service.AutenticacaoService;
import br.edu.ifrn.vendasestoque.service.TokenService;

@RestController
@RequestMapping("login")
@CrossOrigin(origins = "*")
public class AutenticacaoController {

  @Autowired
  private AuthenticationManager manager;


  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;


  @Autowired
  TokenService tokenService;

  @Autowired
  private AutenticacaoService usuarioService;

  @PostMapping
  public ResponseEntity<Object> efetuarLogin(@RequestBody DadosAutenticacao dados){
    var token = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
    var authentication = manager.authenticate(token);
    var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());
    return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
  }
  public class ErroCriacaoUsuario {
    private String mensagem;

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    // outros getters e setters, se necessário
}
// @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@PostMapping("/usuario")
public ResponseEntity<?> criarUsuario(@RequestBody Usuario usuario) {
    try {
        String senhaCriptografada = bCryptPasswordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);

        Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
        return ResponseEntity.ok(usuarioCriado);
    } catch (AccessDeniedException e) {
        ErroCriacaoUsuario erro = new ErroCriacaoUsuario();
        erro.setMensagem("Você não tem permissão para criar um usuário.");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
    }
}

  @GetMapping
  public ResponseEntity<String> getSenhaBcrypt(@RequestBody String senha){
    String senhaBrypt = bCryptPasswordEncoder.encode(senha);
    return ResponseEntity.ok(senhaBrypt);
  }
}
