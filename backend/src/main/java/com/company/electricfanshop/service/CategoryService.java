/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.company.electricfanshop.service;

import java.util.List;

import com.company.electricfanshop.entity.Category;

/**
 *Created by Tungtpat05 on Sep 25, 2025.
 */
public interface CategoryService {
    //List All
    List<Category> findAll();
    
    //Delete
    void deleteById(int id);
    
    //Find By Id
    Category findById(int id);
    
    //Save
    void save(Category category);
    
}
