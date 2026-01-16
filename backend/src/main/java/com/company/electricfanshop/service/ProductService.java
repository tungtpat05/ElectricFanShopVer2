/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.service;

import java.util.List;

import com.company.electricfanshop.entity.Category;
import com.company.electricfanshop.entity.Product;

/**
 *
 * @author nguye
 */
public interface ProductService {
    //List All
    List<Product> findAll();
    
    //Delete
    void deleteById(int id);
    
    //Find By Id
    Product findById(int id);
    
    //Save
    void save(Product product);
    
    // Find By Category
    List<Product> findByCategoryId(Integer categoryId);
}
