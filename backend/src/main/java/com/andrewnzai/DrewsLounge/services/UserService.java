package com.andrewnzai.DrewsLounge.services;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.andrewnzai.DrewsLounge.dtos.DataHolder;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public List<String> searchUsers(DataHolder dataHolder){
        logger.info(dataHolder.getData());
        List<User> users = userRepository.searchByUsername(dataHolder.getData());

        List<String> usernames = new ArrayList<>();
    
        for (User user : users) {
            usernames.add(user.getUsername());
        }
        logger.info(usernames.toString());
        return usernames;
    }
}
