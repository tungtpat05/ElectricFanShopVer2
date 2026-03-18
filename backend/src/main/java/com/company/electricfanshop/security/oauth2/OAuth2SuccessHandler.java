package com.company.electricfanshop.security.oauth2;

import com.company.electricfanshop.entity.user.User;
import com.company.electricfanshop.service.auth.AuthenticationService;
import com.company.electricfanshop.service.auth.JwtService;
import com.company.electricfanshop.service.auth.OAuth2Service;
import com.company.electricfanshop.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final OAuth2Service oAuth2Service;

    @Value("${app.oauth2.success-redirect-url:http://localhost:3000}")
    private String successRedirectUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String jwtToken = oAuth2Service.processOAuth2Login(oAuth2User);

        String targetUrl = successRedirectUrl + "/auth/success?token=" + URLEncoder.encode(jwtToken, StandardCharsets.UTF_8.toString());

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}


