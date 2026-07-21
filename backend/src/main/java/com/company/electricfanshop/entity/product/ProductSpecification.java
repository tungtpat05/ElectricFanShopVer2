package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_specification", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "spec_key"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSpecification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String specKey;

    private String specValue;
}

