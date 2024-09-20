package com.andrewnzai.DrewsLounge.api;

import com.andrewnzai.DrewsLounge.dtos.DataHolder;
import com.andrewnzai.DrewsLounge.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user/")
@AllArgsConstructor
@Tag(name = "Users endpoint", description = "Provides a point for the retrieval of user details")
public class UserController {
    private UserService userService;

    @PostMapping("search")
    public List<String> search(@RequestBody DataHolder dataHolder){
        return userService.searchUsers(dataHolder);
    }
}
