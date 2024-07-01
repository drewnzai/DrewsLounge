package com.andrewnzai.DrewsLounge.emails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthEmail {
    private String subject;
    private String recipient;
    private String body;
}
