package com.alfarays.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class ApplicationConfiguration {

    @Value("${application.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. Credentials support is mandatory for cookies/auth headers
        config.setAllowCredentials(true);

        // 2. Set allowed origins from your application properties
        config.setAllowedOrigins(allowedOrigins);

        // 3. Standard headers used by Angular and Spring Security
        config.setAllowedHeaders(List.of(
                "Origin",
                "Content-Type",
                "Accept",
                "Authorization",
                "X-Requested-With",
                "X-XSRF-TOKEN"
        ));

        // 4. Methods allowed for the REST API
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // 5. Cache the preflight response for 1 hour to reduce network overhead
        config.setMaxAge(3600L);

        // 6. Important: Allow the frontend to read these headers
        config.setExposedHeaders(List.of("Authorization", "X-RateLimit-Remaining"));

        // Apply this configuration to all endpoints
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
