/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package service;

/**
 *
 * @author nguye
 */
public interface MailService {
    // Gửi mail cho nhà bán hàng
    void sendSupportMail(String name, String phone, String email, String topic, String message);
    // Gửi lại mail cho khách
    void sendConfirmationMail(String toEmail, String name);
}
