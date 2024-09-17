package com.andrewnzai.DrewsLounge.api;

import java.util.List;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.andrewnzai.DrewsLounge.dtos.DataHolder;
import com.andrewnzai.DrewsLounge.services.UserService;

@RestController
@RequestMapping("/api/user/")
@AllArgsConstructor
@Tag(name = "Users endpoint", description = "Provides a point for the retrieval of user details")
public class UserController {
    private UserService userService;

    @PostMapping("search")
    public List<String> search(DataHolder dataHolder){
        return userService.searchUsers(dataHolder);
    }
}
