package com.andrewnzai.DrewsLounge.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Long messageId;
    private String sender;
    private String content;
    private String conversationName;
    private String status;
}
