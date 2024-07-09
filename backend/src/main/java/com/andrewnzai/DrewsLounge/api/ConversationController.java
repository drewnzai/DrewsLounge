package com.andrewnzai.DrewsLounge.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andrewnzai.DrewsLounge.dtos.APIResponse;
import com.andrewnzai.DrewsLounge.dtos.MessageDto;
import com.andrewnzai.DrewsLounge.services.MessageService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/conversation/")
@AllArgsConstructor
@Tag(name = "Conversation endpoint", description = "Provides a point for all conversation related functionality")
public class ConversationController {

    private final MessageService messageService;

    @PostMapping("send-message")
    public Object sendMessage(@RequestBody MessageDto messageDto) throws Exception{
        try{
            messageService.sendMessage(messageDto);
            return null;
        }
        catch(Exception e){
            return APIResponse.builder()
                    .data(e.getMessage());
        }
    }

    @PostMapping("create-private")
    public Object createPrivateConversation(){
        return null;
    }

    @PostMapping("create-group")
    public Object createGroup(){
        return null;
    }

}
