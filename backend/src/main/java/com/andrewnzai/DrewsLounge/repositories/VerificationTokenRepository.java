package com.andrewnzai.DrewsLounge.repositories;

import com.andrewnzai.DrewsLounge.models.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
}
