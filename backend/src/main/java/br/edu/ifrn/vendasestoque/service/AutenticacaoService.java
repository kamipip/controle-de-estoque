package br.edu.ifrn.vendasestoque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.edu.ifrn.vendasestoque.domain.usuario.Usuario;
import br.edu.ifrn.vendasestoque.repository.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return repository.findByLogin(username);
  }

  public Usuario criarUsuario(Usuario usuario) {
    return repository.save(usuario);
}

}
