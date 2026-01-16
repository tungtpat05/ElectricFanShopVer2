
package com.company.electricfanshop.service;

import com.company.electricfanshop.entity.User;

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
