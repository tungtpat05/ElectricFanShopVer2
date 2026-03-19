package com.company.electricfanshop.exception;

public class DuplicateResourceException extends RuntimeException{
    public DuplicateResourceException(Object resourceId) {
        super("Resource already exists with id: " + resourceId);
    }
}
