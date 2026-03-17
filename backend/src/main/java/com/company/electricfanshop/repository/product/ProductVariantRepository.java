package com.company.electricfanshop.repository.product;

import com.company.electricfanshop.entity.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer> {
    List<ProductVariant> findByProductId(Integer productId);
    Optional<ProductVariant> findBySku(String sku);
    List<ProductVariant> findByProductIdAndIsActive(Integer productId, Boolean isActive);
}

