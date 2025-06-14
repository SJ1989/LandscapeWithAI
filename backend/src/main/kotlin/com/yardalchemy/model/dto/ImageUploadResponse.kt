package com.yardalchemy.model.dto

import java.util.UUID

data class ImageUploadResponse(
    val id: UUID,
    val originalUrl: String,
    val thumbnailUrl: String,
    val metadata: ImageMetadata
)