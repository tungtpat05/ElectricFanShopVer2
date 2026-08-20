package com.company.electricfanshop.controller.auth;

import com.company.electricfanshop.dto.auth.request.AuthenticationRequest;
import com.company.electricfanshop.dto.auth.request.RegisterRequest;
import com.company.electricfanshop.dto.auth.response.AuthenticationResponse;
import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.service.auth.AuthenticationService;
import com.company.electricfanshop.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping({ "/login", "/authenticate" })
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: No user is currently authenticated");
        }

        String email = principal.getName();
        User user = userService.getByEmail(email);

        return ResponseEntity.ok(user);
    }
}
