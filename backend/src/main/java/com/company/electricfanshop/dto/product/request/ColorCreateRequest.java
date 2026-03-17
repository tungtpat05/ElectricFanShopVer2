package com.company.electricfanshop.dto.product.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ColorCreateRequest {
    private String colorName;
    private String colorCode;
}
