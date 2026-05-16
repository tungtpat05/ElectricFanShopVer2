package com.company.electricfanshop.repository.product;

import com.company.electricfanshop.entity.product.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSpecificationRepository extends JpaRepository<ProductSpecification, Integer> {
    List<ProductSpecification> findByProductId(Integer productId);
    boolean existsByProductIdAndSpecKey(Integer productId, String specKey);
}

