package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product_variants", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "color_id"})
})
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    private String sku;

    @Builder.Default
    private BigDecimal additionalPrice = BigDecimal.ZERO;

    @Builder.Default
    private Integer stockQuantity = 0;

    private String variantImage;

    @Builder.Default
    private Boolean isActive = true;
}