package com.company.electricfanshop.service.auth;

import com.company.electricfanshop.entity.common.enums.Role;
import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.entity.user.UserSocialAccount;
import com.company.electricfanshop.repository.user.UserRepository;
import com.company.electricfanshop.repository.user.UserSocialAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2Service {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserSocialAccountRepository userSocialAccountRepository;

    @Transactional
    public String processOAuth2Login(OAuth2User oAuth2User) {
        User user = findOrCreateOAuth2User(oAuth2User);
        return jwtService.generateToken(user);
    }

    @Transactional
    public User findOrCreateOAuth2User(OAuth2User oAuth2User) {
        String googleId = oAuth2User.getName(); // Google sub (unique ID)
        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");

        // Check if user already exists by social account
        Optional<UserSocialAccount> existingSocialAccount =
                userSocialAccountRepository.findByProviderAndProviderId("google", googleId);

        if (existingSocialAccount.isPresent()) {
            return existingSocialAccount.get().getUser();
        }

        // Check if user exists by email
        User user = userRepository.findByEmail(email).orElseGet(()->{
            User newUser = User.builder()
                    .fullName(fullName)
                    .email(email)
                    .passwordHash("") // No password for social login
                    .role(Role.CUSTOMER)
                    .isActive(true)
                    .createdAt(LocalDateTime.now())
                    .build();
            return userRepository.save(newUser);
        });

        // Create social account link
        UserSocialAccount socialAccount = UserSocialAccount.builder()
                .user(user)
                .provider("google")
                .providerId(googleId)
                .build();
        userSocialAccountRepository.save(socialAccount);

        return user;
    }
}
