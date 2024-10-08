package com.andrewnzai.DrewsLounge.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    private Instant sentAt;
    
    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;
    private String status;
}
