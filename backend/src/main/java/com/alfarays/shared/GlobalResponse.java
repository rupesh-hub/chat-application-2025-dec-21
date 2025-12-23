package com.alfarays.shared;

import lombok.*;
import org.springframework.http.HttpStatus;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GlobalResponse<T> {

    private String message;
    private HttpStatus status;
    private int code;
    private String timestamp;
    private T data;

}
