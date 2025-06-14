package com.yardalchemy.model.entity

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "images")
data class Image(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User is required")
    val user: User,

    @Column(name = "original_url", nullable = false, length = 500)
    @NotBlank(message = "Original URL is required")
    val originalUrl: String,

    @Column(name = "thumbnail_url", length = 500)
    val thumbnailUrl: String? = null,

    @Column(name = "file_size")
    val fileSize: Long? = null,

    @Column(name = "width")
    val width: Int? = null,

    @Column(name = "height")
    val height: Int? = null,

    @Column(name = "content_type", length = 100)
    val contentType: String? = null,

    @CreationTimestamp
    @Column(name = "uploaded_at", updatable = false)
    val uploadedAt: LocalDateTime? = null
)