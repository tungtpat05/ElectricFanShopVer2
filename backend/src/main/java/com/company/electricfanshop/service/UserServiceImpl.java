/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.company.electricfanshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.electricfanshop.entity.User;
import com.company.electricfanshop.repository.UserRepository;

/**
 *Created by Tungtpat05 on Sep 28, 2025.
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    @Override
    public boolean login(String userName, String password) {
        User user = userRepository.findByUsername(userName);
        if(user==null) {
            return false;
        }
        return user.getPassword().equals(password);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

}
