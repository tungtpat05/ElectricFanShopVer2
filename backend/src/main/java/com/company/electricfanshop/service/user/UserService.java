package com.company.electricfanshop.service.user;

import com.company.electricfanshop.entity.common.enums.Role;
import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.entity.user.UserSocialAccount;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.repository.user.UserRepository;
import com.company.electricfanshop.repository.user.UserSocialAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserSocialAccountRepository userSocialAccountRepository;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

}

