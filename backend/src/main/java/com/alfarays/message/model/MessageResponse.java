package com.alfarays.message.model;

public record MessageResponse(
        Long id,
        String message,
        String timestamp
) {
}
