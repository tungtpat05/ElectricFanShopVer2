package com.company.electricfanshop.service.user;

import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

}
