//package com.fitness.userservice.service;
//
//import com.fitness.userservice.dto.RegisterRequest;
//import com.fitness.userservice.dto.UserResponse;
//import com.fitness.userservice.model.User;
//import com.fitness.userservice.repossitory.UserRepository;
//
//import lombok.extern.slf4j.Slf4j;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.web.server.ResponseStatusException;
//
//@Service
//@Slf4j
//public class UserService {
//
//    @Autowired
//    private UserRepository repository;
//
//    public UserResponse register(RegisterRequest request) {
//        log.info("Registering user with email: {}", request.getEmail());
//
//        if (repository.existsByEmail(request.getEmail())) {
//            log.warn("Email already exists: {}", request.getEmail());
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
//        }
//
//        User user = new User();
//        user.setEmail(request.getEmail());
//        user.setPassword(request.getPassword());
//        user.setFirstName(request.getFirstName());
//        user.setLastName(request.getLastName());
//
//        User savedUser = repository.save(user);
//        return mapToUserResponse(savedUser);
//    }
//
//    public UserResponse getUserProfile(String userId) {
//        log.info("Fetching user profile for ID: {}", userId);
//
//        User user = repository.findById(userId)
//                .orElseThrow(() -> {
//                    log.error("User not found for ID: {}", userId);
//                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
//                });
//
//        return mapToUserResponse(user);
//    }
//
//    public Boolean existByUserId(String userId) {
//        log.info("Checking existence of user with ID: {}", userId);
//        return repository.existsByKeycloakId(userId);
//    }
//
//    private UserResponse mapToUserResponse(User user) {
//        UserResponse userResponse = new UserResponse();
//        userResponse.setId(user.getId());
//        userResponse.setEmail(user.getEmail());
//        userResponse.setPassword(user.getPassword());
//        userResponse.setFirstName(user.getFirstName());
//        userResponse.setLastName(user.getLastName());
//        userResponse.setCreatedAt(user.getCreatedAt());
//        userResponse.setUpdatedAt(user.getUpdatedAt());
//        return userResponse;
//    }
//}







package com.fitness.userservice.service;


import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repossitory.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponse register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())){
            User existingUser = repository.findByEmail(request.getEmail());
            UserResponse userResponse = new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setKeycloakId(existingUser.getKeycloakId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastName(existingUser.getLastName());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());
            return userResponse;
        }

        User user= new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setKeycloakId(request.getKeycloakId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User savedUser= repository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setKeycloakId(savedUser.getKeycloakId());
        userResponse.setId(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());

        return userResponse;
    }

    public UserResponse getUserProfile(String userId) {
        User user =  repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user Not Found"));

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setPassword(user.getPassword());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        log.info("Calling User Validation API for userId: {}", userId);
        return repository.existsByKeycloakId(userId);
    }
}


