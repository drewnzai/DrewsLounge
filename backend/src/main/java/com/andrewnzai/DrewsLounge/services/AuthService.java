package com.andrewnzai.DrewsLounge.services;

import com.andrewnzai.DrewsLounge.dtos.LoginRequest;
import com.andrewnzai.DrewsLounge.dtos.LoginResponse;
import com.andrewnzai.DrewsLounge.dtos.RefreshTokenRequest;
import com.andrewnzai.DrewsLounge.dtos.RegisterRequest;
import com.andrewnzai.DrewsLounge.emails.NotificationEmail;
import com.andrewnzai.DrewsLounge.models.RefreshToken;
import com.andrewnzai.DrewsLounge.models.User;
import com.andrewnzai.DrewsLounge.models.UserDetailsImpl;
import com.andrewnzai.DrewsLounge.models.VerificationToken;
import com.andrewnzai.DrewsLounge.repositories.RefreshTokenRepository;
import com.andrewnzai.DrewsLounge.repositories.UserRepository;
import com.andrewnzai.DrewsLounge.repositories.VerificationTokenRepository;
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
    private final VerificationTokenRepository verificationTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public void signup(RegisterRequest registerRequest) throws Exception {
        if(userRepository.existsByUsername(registerRequest.getUsername())){
            throw new Exception("Username already exists");
        }
        else if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new Exception("Email is already in use");
        }
        else{
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setEnabled(false);

            String token = generateVerificationToken(user);

            mailService.sendMail(
                    new NotificationEmail("Account Verification",
                            user.getEmail(),
                            "Thank you for signing up to Spring Reddit, " +
                                    "please click on the below url to activate your account: " +
                                    "http://localhost:8080/api/auth/accountVerification/" + token)
            );

            userRepository.save(user);
        }
    }

    private void fetchUserAndEnable(VerificationToken verificationToken) {
        String username = verificationToken.getUser().getUsername();
        User user = userRepository.findByUsername(username);
        user.setEnabled(true);
        userRepository.save(user);
    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);
        return token;
    }

    public void verifyAccount(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        fetchUserAndEnable(verificationToken);
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

        User user = userRepository.findByUsername(loginRequest.getUsername());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpirationDate(Instant.now().plusSeconds(2592000));
        refreshToken.setUser(user);
        refreshTokenRepository.save(refreshToken);

        return build(jwtUtil.generateJwtToken(authenticate)
        , loginRequest.getUsername()
        , refreshToken.getToken());
    }

    public LoginResponse refresh(RefreshTokenRequest refreshTokenRequest) throws Exception {
        
        User user = userRepository.findByUsername(refreshTokenRequest.getUsername());
        RefreshToken refreshToken = refreshTokenRepository.findByTokenAndUser(refreshTokenRequest.getRefreshToken(), user);

        boolean isNotExpired = Instant.now().isBefore(refreshToken.getExpirationDate());

        if(isNotExpired){
            return build(jwtUtil.generateJwtTokenFromUsername(refreshTokenRequest.getUsername())
            , refreshTokenRequest.getUsername()
            , refreshTokenRequest.getRefreshToken());
        }
        else if(!isNotExpired){
            refreshTokenRepository.deleteByToken(refreshTokenRequest.getRefreshToken());

            throw new Exception("Refresh Token has expired");
        }
        else {
            throw new Exception("Refresh Token is not valid");
        }
    }

    private LoginResponse build(String token, String username, String refreshToken){
        return LoginResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshToken)
                .expiresAt(Instant.now().plusSeconds(jwtUtil.getJwtExpiration()))
                .username(username)
                .build();
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }

}
