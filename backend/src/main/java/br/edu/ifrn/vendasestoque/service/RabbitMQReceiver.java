package br.edu.ifrn.vendasestoque.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQReceiver {

    @RabbitListener(queues = "v1.fila.notificacoes")
    public void receberMensagem(String mensagem) {
        // Lógica para lidar com a mensagem recebida
        System.out.println("Mensagem Recebida após cadastro de venda: " + mensagem);
    }
}