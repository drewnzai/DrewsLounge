package com.andrewnzai.DrewsLounge.services;

import java.time.Instant;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.andrewnzai.DrewsLounge.dtos.MessageDto;
import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.Message;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.repositories.ConversationRepository;
import com.andrewnzai.DrewsLounge.repositories.MessageRepository;
import com.andrewnzai.DrewsLounge.repositories.UserConversationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserConversationRepository userConversationRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final AuthService authService;

    public void sendMessage(MessageDto messageDto) throws Exception{
        if(conversationRepository.existsByName(messageDto.getConversationName())){
            
            Conversation conversation = conversationRepository.findByName(messageDto.getConversationName());
            User user = authService.getCurrentUser();

            if(userConversationRepository.existsByUserAndConversation(user, conversation)){

                Message message = new Message();
                message.setConversation(conversation);
                message.setContent(messageDto.getContent());
                message.setSender(user);
                message.setSentAt(Instant.now());
                
                simpMessagingTemplate.convertAndSend("/topic/conversation/" + messageDto.getConversationName(), messageDto);
    
                messageRepository.save(message);
            }
            else{
                throw new Exception("You are not a member of this conversation");
            }
        }
        else{
            throw new Exception("Conversation does not exist");
        }
    }
}
