package br.edu.ifrn.vendasestoque.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeradorSenhaCriptografada {
    
    public static void main(String[] args) {
        String senha = "123456";
        String senhaCriptografada = new BCryptPasswordEncoder().encode(senha);
        System.out.println(senhaCriptografada);
    }
}
