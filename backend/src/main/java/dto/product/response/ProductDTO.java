package dto.product.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductDTO {
    private Integer id;
    private String productName;
    private String description;
    private BigDecimal price;
    private String image;
    private Integer stock;    
}