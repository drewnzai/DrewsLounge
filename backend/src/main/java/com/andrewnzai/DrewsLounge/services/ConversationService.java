package com.andrewnzai.DrewsLounge.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.GroupAdmin;
import com.andrewnzai.DrewsLounge.models.Message;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.models.UserConversation;
import com.andrewnzai.DrewsLounge.repositories.ConversationRepository;
import com.andrewnzai.DrewsLounge.repositories.GroupAdminRepository;
import com.andrewnzai.DrewsLounge.repositories.UserConversationRepository;
import com.andrewnzai.DrewsLounge.repositories.UserRepository;
import com.andrewnzai.DrewsLounge.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserConversationRepository userConversationRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final GroupAdminRepository groupAdminRepository;

    public void createPrivateConversation(String username1, String username2) throws Exception{
        User user1 = userRepository.findByUsername(username1);
        User user2 = userRepository.findByUsername(username2);

        String conversationName = user1.getUsername() + "-" + user2.getUsername();

        if(conversationRepository.existsByName(conversationName)){
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

    public void createGroupConversation(String groupName) throws Exception{
        if(conversationRepository.existsByName(groupName)){
            throw new Exception("Group name already exists");
        }
        else{
            Conversation conversation = new Conversation();
            conversation.setName(groupName);
            
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

    public void deletePrivateConversation(String conversationName) throws Exception{
        
        if(conversationRepository.existsByName(conversationName)){

            Conversation conversation = conversationRepository.findByName(conversationName);

            deleteConversation(conversation);
        }
        else{
            throw new Exception("No conversation with that name exists");
        }
    }

    public void deleteGroup(String groupName) throws Exception{

        if(conversationRepository.existsByName(groupName)){
            Conversation conversation = conversationRepository.findByName(groupName);

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

    private void deleteConversation(Conversation conversation){
        List<User> users = userConversationRepository.findAllUsersByConversation(conversation);

            for(User user: users){
                userConversationRepository.deleteByUser(user);
            }

            List<Message> messages = messageRepository.findAllByConversation(conversation);
            
            for(Message message: messages){
                messageRepository.delete(message);
            }

            conversationRepository.delete(conversation);
    }
}
