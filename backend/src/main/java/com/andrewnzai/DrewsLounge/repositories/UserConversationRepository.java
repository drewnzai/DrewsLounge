package com.andrewnzai.DrewsLounge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.UserConversation;

@Repository
public interface UserConversationRepository extends JpaRepository<UserConversation, Long>{

}
