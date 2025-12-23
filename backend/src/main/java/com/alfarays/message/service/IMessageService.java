package com.alfarays.message.service;

import com.alfarays.message.model.MessageRequest;
import com.alfarays.message.model.MessageResponse;
import com.alfarays.shared.GlobalResponse;

import java.util.List;

public interface IMessageService {

    GlobalResponse<MessageResponse> create(final MessageRequest request);
    GlobalResponse<List<MessageResponse>> messages();

}
