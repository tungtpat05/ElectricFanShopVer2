package com.company.electricfanshop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
    List<Product> findByCategoryId(Integer categoryId);
}
