package com.alfarays.message.resource;

import com.alfarays.message.model.MessageRequest;
import com.alfarays.message.service.IMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "messages")
public class MessageResource {

    private final IMessageService messageService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody MessageRequest request) {
        return new ResponseEntity<>(messageService.create(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> messages() {
        return new ResponseEntity<>(messageService.messages(), HttpStatus.OK);
    }

}
