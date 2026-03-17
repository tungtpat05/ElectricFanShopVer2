package com.company.electricfanshop.entity.review;

import com.company.electricfanshop.entity.order.OrderItem;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // OneToOne: OrderItem <-> Review (Một sản phẩm trong đơn hàng chỉ được đánh giá 1 lần)
    @OneToOne
    @JoinColumn(name = "order_item_id", unique = true, nullable = false)
    private OrderItem orderItem;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String comment;

    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;
}