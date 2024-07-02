package com.andrewnzai.DrewsLounge.api;

import com.andrewnzai.DrewsLounge.dtos.LoginRequest;
import com.andrewnzai.DrewsLounge.dtos.LoginResponse;
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

@RestController
@RequestMapping("/api/auth/")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("signup")
    public APIResponse signup(@RequestBody RegisterRequest registerRequest) throws Exception {
        authService.signup(registerRequest);

        return APIResponse.builder()
                .statusCode(200)
                .isSuccessful(true)
                .message("Successful signup")
                .data(null)
                .build();
    }

    @GetMapping("accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        authService.verifyAccount(token);
        return new ResponseEntity<>("Account Activated Successfully", OK);
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest);
    }
}
