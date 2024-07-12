package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long>{

    boolean existsByName(String conversationName);

    Conversation findByName(String conversationName);

}
