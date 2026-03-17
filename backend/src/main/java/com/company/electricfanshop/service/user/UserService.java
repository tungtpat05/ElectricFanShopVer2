package com.company.electricfanshop.service.user;

import com.company.electricfanshop.entity.user.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface UserService {

    User findByEmail(String email);

    User save(User user);

    User findOrCreateOAuth2User(OAuth2User oauth2User);
}

