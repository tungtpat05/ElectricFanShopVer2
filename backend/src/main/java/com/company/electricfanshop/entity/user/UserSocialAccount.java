package com.company.electricfanshop.entity.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_social_accounts", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"provider", "provider_id"})
})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSocialAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String provider;

    private String providerId;
}