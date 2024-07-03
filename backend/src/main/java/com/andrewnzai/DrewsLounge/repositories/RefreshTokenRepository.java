package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.RefreshToken;
import com.andrewnzai.DrewsLounge.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    void deleteByToken(String refreshToken);
    RefreshToken findByTokenAndUser(String refreshToken, User user);
    
}
