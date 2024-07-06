package com.andrewnzai.DrewsLounge.api;

import com.andrewnzai.DrewsLounge.dtos.LoginRequest;
import com.andrewnzai.DrewsLounge.dtos.APIResponse;
import com.andrewnzai.DrewsLounge.dtos.RefreshTokenRequest;
import com.andrewnzai.DrewsLounge.dtos.RegisterRequest;
import com.andrewnzai.DrewsLounge.services.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/auth/")
@AllArgsConstructor
@Tag(name = "Authentication endpoint", description = "Provides a point for all authentication related functionality")
public class AuthController {

    private final AuthService authService;

    @PostMapping("signup")
    public Object signup(@RequestBody RegisterRequest registerRequest) throws Exception {
        
        try{
            authService.signup(registerRequest);
            return null;
        }
        catch(Exception e){
            return APIResponse.builder().data(e.getMessage()).build();
        }

    }

    @GetMapping("accountVerification/{token}")
    public String verifyAccount(@PathVariable String token) {

        try{
            authService.verifyAccount(token);
            return "Account Activated Successfully";
        }
        catch(Exception e){
            return "Account not activated";
        }
        
    }

    @PostMapping("login")
    public Object login(@RequestBody LoginRequest loginRequest){
        
        try{
            return authService.login(loginRequest);
        }
        catch(BadCredentialsException e){
            return APIResponse.builder().data("Wrong password").build();
        }
        catch(UsernameNotFoundException | NullPointerException e){
            return APIResponse.builder().data("Username does not exist").build();
        }
        catch(Exception e){
            return APIResponse.builder().data("Verify account").build();
        }
        
    }

    @PostMapping("refresh")
    public Object refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) throws Exception{
        
        try{
            return authService.refresh(refreshTokenRequest);
        }
        catch(Exception e){
            return APIResponse.builder().data(e.getMessage()).build();
        }

    }

}
