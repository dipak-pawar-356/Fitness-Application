package com.fitness.aiservice.service;


import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public Recommendation getActivityRecommendation(String activityId) {
        log.info("Looking for recommendation with activityId: '{}'", activityId.trim());
        return recommendationRepository.findByActivityId(activityId.trim())
                .orElseThrow(() -> new RuntimeException("No Recommendation Found for this activity........: "+ activityId.trim()));
    }

    public List<Recommendation> getAllRecommendations() {
        return recommendationRepository.findAll();
    }
}
