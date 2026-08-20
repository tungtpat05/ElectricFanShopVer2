package com.company.electricfanshop.exception;

import lombok.Getter;

@Getter
public class DuplicateResourceException extends RuntimeException {

    private String fieldName;

    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s: '%s'", resourceName, fieldName, fieldValue));
        this.fieldName = fieldName;
    }
}

