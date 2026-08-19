package com.company.electricfanshop.repository.product;

import com.company.electricfanshop.entity.product.SpecDefinition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecDefinitionRepository extends JpaRepository<SpecDefinition, Integer> {
    List<SpecDefinition> findByCategoryIdAndIsActiveTrueOrderByDisplayOrderAsc(Integer categoryId);
    List<SpecDefinition> findByCategoryIdOrderByDisplayOrderAsc(Integer categoryId);
    boolean existsByCategoryIdAndKeyCode(Integer categoryId, String keyCode);
}
