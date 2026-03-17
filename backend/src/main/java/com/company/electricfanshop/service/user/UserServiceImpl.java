package com.company.electricfanshop.service.user;

import com.company.electricfanshop.entity.common.enums.Role;
import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.entity.user.UserSocialAccount;
import com.company.electricfanshop.repository.user.UserRepository;
import com.company.electricfanshop.repository.user.UserSocialAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserSocialAccountRepository userSocialAccountRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User findOrCreateOAuth2User(OAuth2User oauth2User) {
        String googleId = oauth2User.getName(); // Google sub (unique ID)
        String email = oauth2User.getAttribute("email");
        String fullName = oauth2User.getAttribute("name");

        // Check if user already exists by social account
        Optional<UserSocialAccount> existingSocialAccount =
            userSocialAccountRepository.findByProviderAndProviderId("google", googleId);

        if (existingSocialAccount.isPresent()) {
            return existingSocialAccount.get().getUser();
        }

        // Check if user exists by email
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            // Create new user
            user = new User();
            user.setEmail(email);
            user.setFullName(fullName);
            user.setRole(Role.CUSTOMER);
            user.setIsActive(true);
            user = userRepository.save(user);
        }

        // Create social account link
        UserSocialAccount socialAccount = new UserSocialAccount();
        socialAccount.setUser(user);
        socialAccount.setProvider("google");
        socialAccount.setProviderId(googleId);
        userSocialAccountRepository.save(socialAccount);

        return user;
    }
}

