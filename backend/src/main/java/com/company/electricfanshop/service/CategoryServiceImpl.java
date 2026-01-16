/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.company.electricfanshop.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.electricfanshop.entity.Category;
import com.company.electricfanshop.exception.ResourceNotFoundException;
import com.company.electricfanshop.repository.CategoryRepository;

/**
 *Created by Tungtpat05 on Sep 27, 2025.
 */
@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    //List All
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    //Delete
    public void deleteById(int id) {
        categoryRepository.deleteById(id);
    }


    //Find By Id
    public Category findById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException(id));
    }
    
    //Save
    public void save(Category category) {
        categoryRepository.save(category);
    }
}
