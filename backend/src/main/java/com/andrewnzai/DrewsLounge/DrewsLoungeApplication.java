package com.andrewnzai.DrewsLounge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class DrewsLoungeApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrewsLoungeApplication.class, args);
	}

}
