package com.andrewnzai.DrewsLounge.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth/")
@AllArgsConstructor
@Tag(name = "Conversation endpoint", description = "Provides a point for all conversation related functionality")
public class ConversationController {

    @PostMapping("sendMessage")
    public Object sendMessage(){
        // TO-DO create message service and message DTO
        return null;
    }
}
