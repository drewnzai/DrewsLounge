package com.andrewnzai.DrewsLounge.api;

import com.andrewnzai.DrewsLounge.dtos.LoginRequest;
import com.andrewnzai.DrewsLounge.dtos.LoginResponse;
import com.andrewnzai.DrewsLounge.dtos.RefreshTokenRequest;
import com.andrewnzai.DrewsLounge.dtos.RegisterRequest;
import com.andrewnzai.DrewsLounge.services.AuthService;
import com.andrewnzai.DrewsLounge.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.CONFLICT;

@RestController
@RequestMapping("/api/auth/")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest) throws Exception {
        
        try{
            authService.signup(registerRequest);
            return new ResponseEntity<>("Account created successfully, verification email sent to your email", OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Account not created, username already exists", CONFLICT);
        }

    }

    @GetMapping("accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {

        try{
            authService.verifyAccount(token);
            return new ResponseEntity<>("Account Activated Successfully", OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Account not activated", CONFLICT);
        }
        
    }

    @PostMapping("login")
    public Object login(@RequestBody LoginRequest loginRequest){
        
        try{
            return authService.login(loginRequest);
        }
        catch(Exception e){
            return "User credentials do not match those in system";
        }
        
    }

    @PostMapping("refresh")
    public Object refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) throws Exception{
        
        try{
            return authService.refresh(refreshTokenRequest);
        }
        catch(Exception e){
            return "Cannot refresh JWT: refresh token might be invalid";
        }

    }

}
