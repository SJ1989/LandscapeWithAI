package com.yardalchemy.model.entity

import jakarta.persistence.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @Column(name = "clerk_user_id", unique = true, nullable = false)
    @NotBlank(message = "Clerk user ID is required")
    val clerkUserId: String,

    @Column(unique = true, nullable = false)
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    val email: String,

    @Column(name = "subscription_tier")
    @Enumerated(EnumType.STRING)
    val subscriptionTier: SubscriptionTier = SubscriptionTier.FREE,

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    val createdAt: LocalDateTime? = null
)

enum class SubscriptionTier {
    FREE,
    PREMIUM,
    PROFESSIONAL
}