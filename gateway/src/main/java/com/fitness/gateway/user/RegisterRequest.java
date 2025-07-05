package com.fitness.gateway.user;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;



    @NotBlank(message = "Password is requires")
    @Size(min = 6, message = "Password must have atleast 6 characters")
    private String password;

    private String keycloakId;


    @JsonProperty("firstname")
    private String firstName;
    private String lastName;
}
