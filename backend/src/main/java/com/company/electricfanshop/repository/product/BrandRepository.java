package com.company.electricfanshop.repository.product;

import com.company.electricfanshop.entity.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    boolean existsByBrandName(String brandName);
}
