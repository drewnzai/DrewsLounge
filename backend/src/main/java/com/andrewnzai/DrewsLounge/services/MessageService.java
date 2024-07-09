package com.andrewnzai.DrewsLounge.services;

import org.springframework.stereotype.Service;

import com.andrewnzai.DrewsLounge.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public void sendMessage(MessageDTO messageDTO){
        
    }
}
