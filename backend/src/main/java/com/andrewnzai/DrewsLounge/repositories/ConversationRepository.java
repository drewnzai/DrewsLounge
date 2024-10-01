package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.Conversation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long>{

    boolean existsByName(String conversationName);

    Conversation findByName(String conversationName);

    @Query("SELECT c FROM Conversation c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Conversation> searchByGroupName(String groupName);

}
