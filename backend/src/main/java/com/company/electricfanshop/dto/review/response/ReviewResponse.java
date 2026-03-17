package com.company.electricfanshop.dto.review.response;

import com.company.electricfanshop.entity.order.OrderItem;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.user.User;

import java.time.LocalDateTime;

public class ReviewResponse {
    private Integer id;
    private OrderItem orderItem;
    private Product product;
    private User user;
    private Integer rating;
    private String comment;
    private Boolean isActive;
    private LocalDateTime createdAt;
}

