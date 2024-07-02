package com.andrewnzai.DrewsLounge.services;

import com.andrewnzai.DrewsLounge.dtos.LoginRequest;
import com.andrewnzai.DrewsLounge.dtos.LoginResponse;
import com.andrewnzai.DrewsLounge.dtos.RefreshTokenRequest;
import com.andrewnzai.DrewsLounge.dtos.RegisterRequest;
import com.andrewnzai.DrewsLounge.models.RefreshToken;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.models.UserDetailsImpl;
import com.andrewnzai.DrewsLounge.repositories.RefreshTokenRepository;
import com.andrewnzai.DrewsLounge.repositories.UserRepository;
import com.andrewnzai.DrewsLounge.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public void signup(RegisterRequest registerRequest) throws Exception {
        if(userRepository.existsByUsername(registerRequest.getUsername())){
            throw new Exception("Username already exists");
        }
        else{
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            //TO-DO: Implement mail sending capabilities
            userRepository.save(user);
        }
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername());
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        return build(jwtUtil.generateJwtToken(authenticate), loginRequest.getUsername());
    }

    public LoginResponse refresh(RefreshTokenRequest refreshTokenRequest) throws Exception {
        if(refreshTokenRepository.existsByToken(refreshTokenRequest.getRefreshToken())){
            refreshTokenRepository.deleteByToken(refreshTokenRequest.getRefreshToken());

            return build(jwtUtil.generateJwtTokenFromUsername(refreshTokenRequest.getUsername()), refreshTokenRequest.getUsername());
        }
        else {
            throw new Exception("Refresh Token is not valid");
        }
    }

    private LoginResponse build(String token, String username){
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken);

        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshToken.getToken())
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .username(username)
                .build();
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }

}
