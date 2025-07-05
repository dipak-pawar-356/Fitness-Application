package com.fitness.aiservice.controller;

import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>> getUserRecommendation(@PathVariable String userId){
        return ResponseEntity.ok(recommendationService.getUserRecommendation(userId));
    }

    @GetMapping("/all")
    public List<Recommendation> getAllRecommendations() {
        return recommendationService.getAllRecommendations();
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<Recommendation> getActivityRecommendation(@PathVariable String activityId){
        return ResponseEntity.ok(recommendationService.getActivityRecommendation(activityId));
    }

//    // Example in RecommendationController.java
//    @GetMapping("/activity/{activityId}")
//    public ResponseEntity<Recommendation> getRecommendationByActivityId(@PathVariable String activityId) {
//        return ResponseEntity.ok(
//                recommendationRepository.findByActivityId(activityId.trim())
//                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No Recommendation Found for this activity: " + activityId))
//        );
//    }
}
