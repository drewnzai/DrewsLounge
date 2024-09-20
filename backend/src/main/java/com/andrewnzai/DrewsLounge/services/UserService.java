package com.andrewnzai.DrewsLounge.services;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.andrewnzai.DrewsLounge.dtos.DataHolder;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private AuthService authService;

    public List<String> searchUsers(DataHolder dataHolder){
        List<User> users = userRepository.searchByUsername(dataHolder.getData());

        List<String> usernames = new ArrayList<>();
    
        for (User user : users) {
            if(!user.equals(authService.getCurrentUser())){

                usernames.add(user.getUsername());
            }
        }
        
        return usernames;
    }
}
