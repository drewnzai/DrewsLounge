package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    boolean existsByToken(String refreshToken);

    void deleteByToken(String refreshToken);
}
