package com.company.electricfanshop.repository.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.product.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

    boolean existsByCategoryName(String categoryName);
}
