package com.alfarays.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> exceptionHandler(Exception ex) {
        return new ResponseEntity<>(
                ErrorMessage.builder()
                        .timestamp(LocalDateTime.now().toString())
                        .message(ex.getMessage())
                        .build()
                , HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

}
