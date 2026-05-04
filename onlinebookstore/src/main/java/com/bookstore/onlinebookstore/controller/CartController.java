package com.bookstore.onlinebookstore.controller;

import com.bookstore.onlinebookstore.dto.CartRequest;
import com.bookstore.onlinebookstore.model.Cart;
import com.bookstore.onlinebookstore.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody CartRequest request) {
        return cartService.addToCart(
                request.getUserId(),
                request.getBookId(),
                request.getQuantity()
        );
    }

    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return cartService.getCartByUser(userId);
    }

    @DeleteMapping("/{cartId}")
    public String removeCart(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
        return "Item removed from cart";
    }

    @PutMapping("/{cartId}/quantity/{quantity}")
    public Cart updateQuantity(@PathVariable Long cartId,
                               @PathVariable Integer quantity) {
        return cartService.updateQuantity(cartId, quantity);
    }
}