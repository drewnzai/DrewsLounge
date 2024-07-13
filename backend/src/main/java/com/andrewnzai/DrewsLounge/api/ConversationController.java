package com.andrewnzai.DrewsLounge.api;

import com.andrewnzai.DrewsLounge.dtos.APIResponse;
import com.andrewnzai.DrewsLounge.dtos.ConversationDto;
import com.andrewnzai.DrewsLounge.dtos.ConversationRequest;
import com.andrewnzai.DrewsLounge.dtos.MessageDto;
import com.andrewnzai.DrewsLounge.services.ConversationService;
import com.andrewnzai.DrewsLounge.services.MessageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversation/")
@AllArgsConstructor
@Tag(name = "Conversation endpoint", description = "Provides a point for all conversation related functionality")
public class ConversationController {

    private final MessageService messageService;
    private final ConversationService conversationService;

    @PostMapping("messages")
    public Object getMessages(@RequestBody ConversationDto conversationDto){
        try{
            return conversationService.getMessagesFromConversation(conversationDto);
        }
        catch(Exception e){
            return APIResponse.builder()
            .data(e.getMessage()).build();
        }
    }

    @PostMapping("send-message")
    public Object sendMessage(@RequestBody MessageDto messageDto){
        try{
            messageService.sendMessage(messageDto);
            return null;
        }
        catch(Exception e){
            return APIResponse.builder()
                    .data(e.getMessage()).build();
        }
    }

    @PostMapping("/mark-seen")
    public Object markMessageAsSeen(@RequestBody MessageDto messageDto){
        try{
            messageService.markMessageAsSeen(messageDto.getMessageId());
            return null;
        }
        catch(Exception e){
            return APIResponse.builder()
                    .data(e.getMessage()).build();
        }
    }

    @PostMapping("create-private")
    public Object createPrivateConversation(@RequestBody ConversationRequest conversationRequest){
        try{
            conversationService.createPrivateConversation(conversationRequest);
            return null;
        }
        catch(Exception e){
            return APIResponse.builder()
                    .data(e.getMessage()).build();
        }
    }

    @PostMapping("create-group")
    public Object createGroup(@RequestBody ConversationRequest conversationRequest){
        try{
            conversationService.createGroupConversation(conversationRequest);
            return null;
        }
        catch(Exception e){
            return APIResponse.builder()
                    .data(e.getMessage()).build();
        }
    }

    @GetMapping("all")
    public List<ConversationDto> getAllConversations(){
        return conversationService.getConversations();
    }

}
