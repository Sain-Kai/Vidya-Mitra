package com.vidyamitra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VidyaMitraBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(VidyaMitraBackendApplication.class, args);
    }
}
