package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "category")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String categoryName;

    private String slug;

    private String categoryImage;

    private String description;

    @Builder.Default
    private Boolean isActive = true;

    @OneToMany(mappedBy = "category")
    private List<Product> products;
}