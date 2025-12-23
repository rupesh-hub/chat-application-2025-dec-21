package com.alfarays.message.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="_messages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_message_id_seq_generator")
    @SequenceGenerator(name="_message_id_seq_generator", sequenceName = "_message_id_seq", initialValue = 1, allocationSize = 50)
    @Column(name="id", unique = true, nullable = false)
    private Long id;

    private String message;
    private LocalDateTime timestamp;

}
