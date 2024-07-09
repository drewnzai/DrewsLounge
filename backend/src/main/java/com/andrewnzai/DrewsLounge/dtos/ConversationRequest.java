package com.andrewnzai.DrewsLounge.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationRequest {

    private String username1;
    private String username2;
    private String groupName;
}
