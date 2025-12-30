/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package service;

import entity.User;

/**
 *Created by Tungtpat05 on Sep 25, 2025.
 */
public interface UserService {
    // Find by Username
    User findByUsername(String userName);
    
    // Find by Email
    User findByEmail(String email);
    
    //Login
    boolean login(String userName, String password);
    
    // Save
    void save(User user);

}
