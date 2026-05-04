package com.bookstore.onlinebookstore.service;

import com.bookstore.onlinebookstore.model.*;
import com.bookstore.onlinebookstore.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final BookRepository bookRepository;

    public OrderService(CartRepository cartRepository,
                        OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository, BookRepository bookRepository) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.bookRepository = bookRepository;
    }

    public String checkout(Long userId) {

        List<Cart> cartItems = cartRepository.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = 0;

        Order order = new Order();
        order.setUserId(userId);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        order = orderRepository.save(order);

        for (Cart cart : cartItems) {

            Book book = cart.getBook();

            if (book.getStock() < cart.getQuantity()) {
                throw new RuntimeException(
                        book.getTitle() + " is out of stock"
                );
            }

            // Reduce Stock
            book.setStock(book.getStock() - cart.getQuantity());
            bookRepository.save(book);

            // Save Order Item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setBook(book);
            orderItem.setQuantity(cart.getQuantity());
            orderItem.setPrice(book.getPrice());

            orderItemRepository.save(orderItem);

            total += book.getPrice() * cart.getQuantity();
        }

        order.setTotalAmount(total);
        orderRepository.save(order);

        // Clear Cart
        cartRepository.deleteAll(cartItems);

        return "Order Placed Successfully";
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}