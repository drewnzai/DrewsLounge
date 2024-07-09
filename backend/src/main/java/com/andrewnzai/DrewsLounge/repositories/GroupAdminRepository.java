package com.andrewnzai.DrewsLounge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.Conversation;
import com.andrewnzai.DrewsLounge.models.GroupAdmin;
import com.andrewnzai.DrewsLounge.models.User;

@Repository
public interface GroupAdminRepository extends JpaRepository<GroupAdmin, Long>{

    boolean existsByOwnerAndGroup(User owner, Conversation conversation);

}
