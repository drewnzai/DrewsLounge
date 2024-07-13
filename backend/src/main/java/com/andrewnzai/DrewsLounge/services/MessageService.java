package com.andrewnzai.DrewsLounge.services;

import com.andrewnzai.DrewsLounge.dtos.MessageDto;
import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.Message;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.models.UserConversation;
import com.andrewnzai.DrewsLounge.repositories.ConversationRepository;
import com.andrewnzai.DrewsLounge.repositories.MessageRepository;
import com.andrewnzai.DrewsLounge.repositories.UserConversationRepository;
import com.andrewnzai.DrewsLounge.websocket.WebSocketEventListener;

import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

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
            User recipient = new User();

            if(userConversationRepository.existsByUserAndConversation(user, conversation)){
                // Get the participants in the conversation
                List<UserConversation> participants = userConversationRepository.findAllByConversation(conversation);
                
                // Get the recipient of the message
                for(UserConversation userConversation: participants){
                    if(!userConversation.getUser().equals(user)){
                        recipient = userConversation.getUser();
                    }
                }
                

                Message message = new Message();
                message.setConversation(conversation);
                message.setContent(messageDto.getContent());
                message.setSender(user);
                message.setSentAt(Instant.now());
                // Set the status of the message based on the recipient's online status
                message.setStatus(WebSocketEventListener.isUserOnline(recipient.getUsername()) ? "SEEN" : "NOT SEEN");

                // Update the status of the messageDTO being sent to the subscribed topic
                messageDto.setStatus(message.getStatus());
                
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

    public void markMessageAsSeen(Long messageId) throws Exception{
        Message message = messageRepository.findById(messageId).orElseThrow(
            () -> new Exception("No message with id: " + messageId + " is found")
        );
        message.setStatus("SEEN");
        messageRepository.save(message);
    }
}
