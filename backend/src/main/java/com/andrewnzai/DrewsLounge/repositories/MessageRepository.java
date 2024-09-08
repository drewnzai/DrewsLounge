package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

    List<Message> findAllByConversation(Conversation conversation);

    @Query("SELECT m FROM Message m WHERE m.conversation.id = :conversationId AND m.sentAt <= :sentAt AND m.status = 'NOT SEEN'")
    List<Message> findAllUnseenMessagesInConversationBefore(@Param("conversationId") Long conversationId, @Param("sentAt") Instant sentAt);
    
}
