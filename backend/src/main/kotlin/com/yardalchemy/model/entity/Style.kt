package com.yardalchemy.model.entity

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "styles")
data class Style(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @Column(nullable = false, length = 100)
    @NotBlank(message = "Style name is required")
    val name: String,

    @Column(columnDefinition = "TEXT")
    val description: String? = null,

    @Column(length = 50)
    val category: String? = null,

    @Column(name = "thumbnail_url", length = 500)
    val thumbnailUrl: String? = null,

    @Column(name = "example_urls", columnDefinition = "JSONB")
    val exampleUrls: String? = null, // JSON string - JSONB for PostgreSQL, TEXT for H2

    @Column(name = "is_active")
    val isActive: Boolean = true,

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    val createdAt: LocalDateTime? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Style

        if (id != other.id) return false
        if (name != other.name) return false
        if (description != other.description) return false
        if (category != other.category) return false
        if (thumbnailUrl != other.thumbnailUrl) return false
        if (exampleUrls != other.exampleUrls) return false
        if (isActive != other.isActive) return false
        if (createdAt != other.createdAt) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id?.hashCode() ?: 0
        result = 31 * result + name.hashCode()
        result = 31 * result + (description?.hashCode() ?: 0)
        result = 31 * result + (category?.hashCode() ?: 0)
        result = 31 * result + (thumbnailUrl?.hashCode() ?: 0)
        result = 31 * result + (exampleUrls?.hashCode() ?: 0)
        result = 31 * result + isActive.hashCode()
        result = 31 * result + (createdAt?.hashCode() ?: 0)
        return result
    }
}