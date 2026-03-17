package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "brands")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String brandName;

    private String logoUrl;

    private String description;

    private Boolean isActive = true;

    // One Brand -> Many Products
    @OneToMany(mappedBy = "brand")
    private List<Product> products;
}