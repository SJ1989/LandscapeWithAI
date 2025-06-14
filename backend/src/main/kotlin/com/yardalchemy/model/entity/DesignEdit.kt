package com.yardalchemy.model.entity

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "design_edits")
data class DesignEdit(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_id", nullable = false)
    @NotNull(message = "Design is required")
    val design: Design,

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "Prompt is required")
    val prompt: String,

    @Column(name = "result_image_url", length = 500)
    val resultImageUrl: String? = null,

    @Column(name = "flux_job_id", length = 255)
    val fluxJobId: String? = null,

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    val status: DesignEditStatus = DesignEditStatus.PENDING,

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    val createdAt: LocalDateTime? = null,

    @Column(name = "completed_at")
    val completedAt: LocalDateTime? = null
)

enum class DesignEditStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    FAILED,
    CANCELLED
}