package com.bookstore.onlinebookstore.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    @Column(length = 1000)
    private String description;

    private Double price;

    private String imageUrl;

    private Integer stock;
}