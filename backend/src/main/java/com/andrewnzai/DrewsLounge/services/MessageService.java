package com.andrewnzai.DrewsLounge.services;

import java.time.Instant;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.andrewnzai.DrewsLounge.dtos.MessageDto;
import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.Message;
import com.andrewnzai.DrewsLounge.repositories.ConversationRepository;
import com.andrewnzai.DrewsLounge.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final AuthService authService;

    public void sendMessage(MessageDto messageDto) throws Exception{
        if(conversationRepository.existsByName(messageDto.getConversationName())){
            
            Conversation conversation = conversationRepository.findByName(messageDto.getConversationName());
            
            Message message = new Message();
            message.setConversation(conversation);
            message.setContent(messageDto.getContent());
            message.setSender(authService.getCurrentUser());
            message.setSentAt(Instant.now());
            
            simpMessagingTemplate.convertAndSend("/topic/conversation/" + messageDto.getConversationName(), message);

            messageRepository.save(message);
        }
        else{
            throw new Exception("Conversation does not exist");
        }
    }
}
