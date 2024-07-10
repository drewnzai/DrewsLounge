package com.andrewnzai.DrewsLounge.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.models.UserConversation;

@Repository
public interface UserConversationRepository extends JpaRepository<UserConversation, Long>{
    void deleteByUser(User user);
    boolean existsByUserAndConversation(User user, Conversation conversation);
    List<UserConversation> findAllByUser(User user);
    List<UserConversation> findAllByConversation(Conversation conversation);

}
