package com.alfarays.message.service;

import com.alfarays.message.entity.Message;
import com.alfarays.message.model.MessageRequest;
import com.alfarays.message.model.MessageResponse;
import com.alfarays.message.repository.MessageRepository;
import com.alfarays.shared.GlobalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {

    private final MessageRepository messageRepository;

    @Override
    public GlobalResponse<MessageResponse> create(final MessageRequest request) {
        Message message = new Message();
        message.setMessage(request.message());
        message.setTimestamp(LocalDateTime.now());

        message = messageRepository.save(message);

        MessageResponse response = new MessageResponse(
                message.getId(),
                message.getMessage(),
                message.getTimestamp().toString()
        );

        return GlobalResponse.<MessageResponse>builder()
                .message("Message created successfully")
                .data(response)
                .code(HttpStatus.CREATED.value())
                .status(HttpStatus.CREATED)
                .timestamp(LocalDateTime.now().toString())
                .build();
    }


    @Override
    public GlobalResponse<List<MessageResponse>> messages() {

        return GlobalResponse.<List<MessageResponse>>builder()
                .message("Messages retrieved successfully")
                .status(HttpStatus.OK)
                .code(HttpStatus.OK.value())
                .timestamp(LocalDateTime.now().toString())
                .data(messageRepository.findAll()
                        .stream()
                        .map(message -> new MessageResponse(
                                message.getId(),
                                message.getMessage(),
                                message.getTimestamp().toString()
                        ))
                        .toList())
                .build();
    }

}
