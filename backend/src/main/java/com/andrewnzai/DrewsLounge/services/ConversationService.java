package com.andrewnzai.DrewsLounge.services;

import com.andrewnzai.DrewsLounge.dtos.ConversationDto;
import com.andrewnzai.DrewsLounge.dtos.ConversationRequest;
import com.andrewnzai.DrewsLounge.dtos.MessageDto;
import com.andrewnzai.DrewsLounge.models.*;
import com.andrewnzai.DrewsLounge.repositories.*;
import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ConversationService {
    private static final Logger logger = LoggerFactory.getLogger(ConversationService.class);

// To-DO implement a way for private conversation names to be interchangeable i.e user1-user2 or user2-user1
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserConversationRepository userConversationRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final GroupAdminRepository groupAdminRepository;

    public void createPrivateConversation(ConversationRequest conversationRequest) throws Exception{
        User user1 = userRepository.findByUsername(conversationRequest.getUsername());
        logger.info(user1.toString());
        
        User user2 = authService.getCurrentUser();
        logger.info(user2.toString());

        String conversationName = user2.getUsername() + "-" + user1.getUsername();
        String conversationName2 = user1.getUsername() + "-" + user2.getUsername();


        if(conversationRepository.existsByName(conversationName) || conversationRepository.existsByName(conversationName2)){
            throw new Exception("Conversation already exists");
        }
        else{
            
            Conversation conversation = new Conversation();
            conversation.setName(conversationName);

            conversationRepository.save(conversation);

            UserConversation userConversation = new UserConversation();
            userConversation.setConversation(conversation);
            userConversation.setUser(user1);

            userConversationRepository.save(userConversation);

            UserConversation userConversation2 = new UserConversation();
            userConversation2.setConversation(conversation);
            userConversation2.setUser(user2);

            userConversationRepository.save(userConversation2);
        }
    }

    public void createGroupConversation(ConversationRequest conversationRequest) throws Exception{
        if(conversationRepository.existsByName(conversationRequest.getGroupName())){
            throw new Exception("Group name already exists");
        }
        else{
            Conversation conversation = new Conversation();
            conversation.setName(conversationRequest.getGroupName());
            
            conversationRepository.save(conversation);

            User owner = authService.getCurrentUser();
            
            GroupAdmin groupAdmin = new GroupAdmin();
            groupAdmin.setOwner(owner);
            groupAdmin.setGroup(conversation);

            groupAdminRepository.save(groupAdmin);

            UserConversation userConversation = new UserConversation();
            userConversation.setUser(owner);
            userConversation.setConversation(conversation);

            userConversationRepository.save(userConversation);
            
        }
    }

    public void deletePrivateConversation(ConversationRequest conversationRequest) throws Exception{
        User user = authService.getCurrentUser();
        
        String conversationName = conversationRequest.getUsername() + "-" + user.getUsername();
        String conversationName2 = user.getUsername() + "-" + conversationRequest.getUsername();

        if(conversationRepository.existsByName(conversationName)){

            Conversation conversation = conversationRepository.findByName(conversationName);

            deleteConversation(conversation);
        }
        else if(conversationRepository.existsByName(conversationName2)){
            Conversation conversation = conversationRepository.findByName(conversationName);

            deleteConversation(conversation);            
        }
        else{
            throw new Exception("No conversation with that name exists");
        }
    }

    public void deleteGroup(ConversationRequest conversationRequest) throws Exception{

        if(conversationRepository.existsByName(conversationRequest.getGroupName())){
            Conversation conversation = conversationRepository.findByName(conversationRequest.getGroupName());

            if(groupAdminRepository.existsByOwnerAndGroup(authService.getCurrentUser(), conversation)){
                deleteConversation(conversation);
            }
            else{
                throw new Exception("You are not the group admin");
            }
        }
        else{
            throw new Exception("No group with that name exists");
        }
    }
    
    // Nested-if madness
    public void addUserToGroup(ConversationRequest conversationRequest) throws Exception{
        if(userRepository.existsByUsername(conversationRequest.getUsername())){
            if(conversationRepository.existsByName(conversationRequest.getGroupName())){
                
                Conversation conversation = conversationRepository.findByName(conversationRequest.getGroupName());

                if(groupAdminRepository.
                existsByOwnerAndGroup(authService.getCurrentUser(), conversation)){
                    
                    UserConversation userConversation = new UserConversation();
                    userConversation.setUser(userRepository.findByUsername(conversationRequest.getUsername()));
                    userConversation.setConversation(conversation);

                }
                else{
                    throw new Exception("You are not the group admin");
                }
            }
            else{
                throw new Exception("Group with name: " + conversationRequest.getGroupName()+ " does not exist");
            }
        }else{
            throw new Exception("User with name: " + conversationRequest.getUsername() + " does not exist");
        }
    }

    public List<ConversationDto> getConversations(){
        List<ConversationDto> conversationDtos = new ArrayList<>();

        User user = authService.getCurrentUser();

        List<UserConversation> userConversations = userConversationRepository.findAllByUser(user);

        for(UserConversation userConversation: userConversations){
            ConversationDto conversationDto = new ConversationDto(userConversation.getConversation().getName());
            conversationDtos.add(conversationDto);
        }

       return conversationDtos;
    }

    public List<MessageDto> getMessagesFromConversation(ConversationDto conversationDto) throws Exception{
        if(conversationRepository.existsByName(conversationDto.getConversationName())){
            List<MessageDto> messageDtos = new ArrayList<>();

            Conversation conversation = conversationRepository.findByName(conversationDto.getConversationName());
            
            List<Message> messages = messageRepository.findAllByConversation(conversation);

            for(Message message: messages){
                MessageDto messageDto = new MessageDto();
                messageDto.setContent(message.getContent());
                messageDto.setSender(message.getSender().getUsername());
                messageDto.setConversationName(message.getConversation().getName());
                messageDto.setMessageId(message.getId());
                messageDto.setStatus(message.getStatus());

                messageDtos.add(messageDto);
            }

            return messageDtos;

        }
        else{
            throw new Exception("No conversation with name "+ conversationDto.getConversationName() + " exists");
        }
    }

    private void deleteConversation(Conversation conversation){
        List<UserConversation> userConversations = userConversationRepository.findAllByConversation(conversation);

        for(UserConversation userConversation: userConversations){
            userConversationRepository.delete(userConversation);
        }
        
        List<Message> messages = messageRepository.findAllByConversation(conversation);
            
        for(Message message: messages){
            messageRepository.delete(message);
        }

       conversationRepository.delete(conversation);
    }
}
