package com.andrewnzai.DrewsLounge.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

    List<Message> findAllByConversation(Conversation conversation);
    
}
