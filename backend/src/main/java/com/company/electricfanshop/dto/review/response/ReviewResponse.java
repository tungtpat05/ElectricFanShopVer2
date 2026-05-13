package com.company.electricfanshop.dto.review.response;

import com.company.electricfanshop.entity.order.OrderItem;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
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

