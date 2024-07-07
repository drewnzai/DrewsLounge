package com.andrewnzai.DrewsLounge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long>{

}
