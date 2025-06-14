package com.yardalchemy.model.dto

data class ImageMetadata(
    val width: Int,
    val height: Int,
    val fileSize: Long,
    val format: String,
    val originalFilename: String?
)