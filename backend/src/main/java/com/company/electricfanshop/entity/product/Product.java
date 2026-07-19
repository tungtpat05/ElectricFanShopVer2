package com.company.electricfanshop.entity.product;

import com.company.electricfanshop.entity.review.Review;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String productName;

    private String slug;

    // Many Products -> One Brand
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    // Many Products -> One Category
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String summary;

    private String description;

    private BigDecimal basePrice;

    private BigDecimal discountPrice;
    private String thumbnail;
    private String thumbnailPublicId;

    private Integer engineCapacity;

    private Integer weightGram;
    private Integer lengthCm;
    private Integer widthCm;
    private Integer heightCm;

    @Builder.Default
    private Boolean isFeatured = false;

    @Builder.Default
    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Relationships
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImage> images;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductVariant> variants;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductSpecification> specifications;
}