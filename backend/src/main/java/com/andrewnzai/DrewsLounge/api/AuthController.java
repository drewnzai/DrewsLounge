package com.andrewnzai.DrewsLounge.api;

import com.andrewnzai.DrewsLounge.dtos.RegisterRequest;
import com.andrewnzai.DrewsLounge.services.AuthService;
import com.andrewnzai.DrewsLounge.utils.APIResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/api/auth/")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    @PostMapping(name = "signup")
    public APIResponse signup(@RequestBody RegisterRequest registerRequest) throws Exception {
        authService.signup(registerRequest);

        return APIResponse.builder()
                .statusCode(200)
                .isSuccessful(true)
                .message("Successful signup")
                .data(null)
                .build();
    }
}
