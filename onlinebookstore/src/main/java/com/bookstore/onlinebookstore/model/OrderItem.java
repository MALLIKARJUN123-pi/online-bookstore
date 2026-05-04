package com.bookstore.onlinebookstore.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private Integer quantity;

    private Double price;
}