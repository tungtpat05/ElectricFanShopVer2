/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package service;

import entity.Category;
import entity.Product;
import java.util.List;

/**
 *
 * @author nguye
 */
public interface ProductService {
    //List All
    List<Product> listProducts();
    
    //Delete
    void deleteProduct(int id);
    
    //Find By Id
    Product findProductById(int id);
    
    //Save
    void saveProduct(Product product);
    
    // Find By Category
    List<Product> findProductByCategory(Category category);
}
