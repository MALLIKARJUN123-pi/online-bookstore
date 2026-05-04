package com.bookstore.onlinebookstore.service;

import com.bookstore.onlinebookstore.model.Book;
import com.bookstore.onlinebookstore.model.Cart;
import com.bookstore.onlinebookstore.repository.BookRepository;
import com.bookstore.onlinebookstore.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;

    public CartService(CartRepository cartRepository,
                       BookRepository bookRepository) {
        this.cartRepository = cartRepository;
        this.bookRepository = bookRepository;
    }

    public Cart addToCart(Long userId, Long bookId, Integer quantity) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<Cart> existingCart =
                cartRepository.findByUserIdAndBookId(userId, bookId);

        if (existingCart.isPresent()) {
            Cart cart = existingCart.get();

            int newQty = cart.getQuantity() + quantity;

            if (newQty > book.getStock()) {
                throw new RuntimeException("Stock limit exceeded");
            }

            cart.setQuantity(newQty);

            return cartRepository.save(cart);
        }

        if (quantity > book.getStock()) {
            throw new RuntimeException("Stock limit exceeded");
        }

        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setBook(book);
        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }

    public List<Cart> getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public Cart updateQuantity(Long cartId, Integer quantity) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity > cart.getBook().getStock()) {
            throw new RuntimeException("Stock exceeded");
        }

        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }
}