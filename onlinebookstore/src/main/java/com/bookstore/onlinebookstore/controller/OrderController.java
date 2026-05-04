package com.bookstore.onlinebookstore.controller;

import com.bookstore.onlinebookstore.model.Order;
import com.bookstore.onlinebookstore.model.OrderItem;
import com.bookstore.onlinebookstore.repository.OrderItemRepository;
import com.bookstore.onlinebookstore.repository.OrderRepository;
import com.bookstore.onlinebookstore.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;


    public OrderController(OrderService orderService, OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @PostMapping("/checkout/{userId}")
    public String checkout(@PathVariable Long userId) {
        return orderService.checkout(userId);
    }

    @GetMapping("/{userId}")
    public List<Order> getOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/admin/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{orderId}/items")
    public List<OrderItem> getOrderItems(@PathVariable Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
}