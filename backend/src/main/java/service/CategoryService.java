/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package service;

import entity.Category;
import java.util.List;

/**
 *Created by Tungtpat05 on Sep 25, 2025.
 */
public interface CategoryService {
    //List All
    List<Category> listCategories();
    
    //Delete
    void deleteCategory(int id);
    
    //Find By Id
    Category findCategoryById(int id);
    
    //Save
    void saveCategory(Category category);
    
}
