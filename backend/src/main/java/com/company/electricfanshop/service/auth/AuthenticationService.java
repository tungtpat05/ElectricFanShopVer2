package com.company.electricfanshop.service.auth;

import com.company.electricfanshop.dto.auth.request.AuthenticationRequest;
import com.company.electricfanshop.dto.auth.request.RegisterRequest;
import com.company.electricfanshop.dto.auth.response.AuthenticationResponse;
import com.company.electricfanshop.entity.common.enums.Role;
import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.exception.DuplicateResourceException;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateResourceException("User", "email", registerRequest.getEmail());
        }
        User user = User.builder()
                .fullName(registerRequest.getFullName())
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.CUSTOMER)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );

        // If authentication is successful, load the user and generate a JWT token
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException(authenticationRequest.getEmail()));
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
