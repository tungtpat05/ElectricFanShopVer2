package com.company.electricfanshop.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(Object resourceId) {
        super("Resource not found with id: " + resourceId);
    }
}
