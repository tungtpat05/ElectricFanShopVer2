/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package service;

import entity.Category;
import entity.Product;
import exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.ProductRepository;

/**
 * Created by Tungtpat05 on Sep 25, 2025.
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    //List All
    @Override
    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    //Delete
    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    //Find By Id
    @Override
    public Product findProductById(int id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

    //Save
    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    // Find By Category
    @Override
    public List<Product> findProductByCategory(Category category) {
        return productRepository.findByCategory(category);
    }
}
