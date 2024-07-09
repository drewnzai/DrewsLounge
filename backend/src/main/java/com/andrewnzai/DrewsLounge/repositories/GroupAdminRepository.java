package com.andrewnzai.DrewsLounge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrewnzai.DrewsLounge.models.GroupAdmin;

@Repository
public interface GroupAdminRepository extends JpaRepository<GroupAdmin, Long>{

}
