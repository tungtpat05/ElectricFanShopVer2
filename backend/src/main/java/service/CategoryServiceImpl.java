/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package service;

import entity.Category;
import exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.CategoryRepository;

/**
 *Created by Tungtpat05 on Sep 27, 2025.
 */
@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    //List All
    public List<Category> listCategories() {
        return categoryRepository.findAll();
    }

    //Delete
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }


    //Find By Id
    public Category findCategoryById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException(id));
    }
    
    //Save
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }
}
