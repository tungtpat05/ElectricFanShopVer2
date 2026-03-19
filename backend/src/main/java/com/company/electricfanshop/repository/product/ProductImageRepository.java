package com.company.electricfanshop.repository.product;

import com.company.electricfanshop.entity.product.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
    List<ProductImage> findByProductIdOrderByDisplayOrder(Integer productId);

    @Query(value = "SELECT MAX(display_order) FROM product_images WHERE product_id = :productId",
            nativeQuery = true)
    Integer findMaxDisplayOrderByProductId(@Param("productId") Integer productId);

    boolean existsByImageUrl(String imageUrl);
}

