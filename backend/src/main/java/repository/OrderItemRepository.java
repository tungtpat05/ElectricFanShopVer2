/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package repository;

import entity.Order;
import entity.OrderItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author nguye
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{
    List<OrderItem> findByOrder(Order order);
}
