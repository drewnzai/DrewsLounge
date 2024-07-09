package com.andrewnzai.DrewsLounge.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.User;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long>{

    boolean existsByName(String conversationName);

    Conversation findByName(String conversationName);

}
