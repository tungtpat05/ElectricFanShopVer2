package com.company.electricfanshop.entity.user;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Table(name = "user_social_account", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"provider", "provider_id"})
})
@Setter
@Getter
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