package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.models.UserConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserConversationRepository extends JpaRepository<UserConversation, Long>{
    void deleteByUser(User user);
    boolean existsByUserAndConversation(User user, Conversation conversation);
    List<UserConversation> findAllByUser(User user);
    List<UserConversation> findAllByConversation(Conversation conversation);

}
