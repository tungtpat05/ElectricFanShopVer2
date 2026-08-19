package com.company.electricfanshop.repository.product;

import com.company.electricfanshop.entity.product.SpecDefinitionOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecDefinitionOptionRepository extends JpaRepository<SpecDefinitionOption, Integer> {
    List<SpecDefinitionOption> findBySpecDefinitionIdOrderByDisplayOrderAsc(Integer specDefinitionId);
}
