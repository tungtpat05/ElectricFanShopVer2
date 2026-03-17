package com.company.electricfanshop.entity.order;

import com.company.electricfanshop.entity.review.Review;
import com.company.electricfanshop.entity.product.Product;
import com.company.electricfanshop.entity.product.ProductVariant;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;

    private Integer quantity;
    private BigDecimal price;

    // One OrderItem -> One Review (Unique constraint on review.order_item_id)
    @OneToOne(mappedBy = "orderItem")
    private Review review;
}