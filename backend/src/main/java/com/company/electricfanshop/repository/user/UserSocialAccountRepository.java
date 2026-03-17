package com.company.electricfanshop.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.user.UserSocialAccount;
import java.util.Optional;

@Repository
public interface UserSocialAccountRepository extends JpaRepository<UserSocialAccount, Integer> {
    Optional<UserSocialAccount> findByProviderAndProviderId(String provider, String providerId);
}

