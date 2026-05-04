package com.bookstore.onlinebookstore.dto;

import lombok.Data;

@Data
public class CartRequest {

    private Long userId;
    private Long bookId;
    private Integer quantity;
}