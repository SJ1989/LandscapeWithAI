package com.yardalchemy.service

import com.yardalchemy.model.dto.ImageMetadata
import com.yardalchemy.model.dto.ImageUploadResponse
import com.yardalchemy.model.entity.Image
import com.yardalchemy.repository.ImageRepository
import com.yardalchemy.repository.UserRepository
import org.apache.commons.io.FilenameUtils
import org.imgscalr.Scalr
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.awt.image.BufferedImage
import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.time.LocalDateTime
import java.util.*
import javax.imageio.ImageIO

@Service
class ImageService(
    private val imageRepository: ImageRepository,
    private val userRepository: UserRepository,
    @Value("\${app.upload.directory:uploads}") private val uploadDirectory: String,
    @Value("\${app.upload.max-file-size:10485760}") private val maxFileSize: Long, // 10MB
    @Value("\${server.port:8081}") private val serverPort: String
) {

    companion object {
        private val ALLOWED_FORMATS = setOf("jpg", "jpeg", "png")
        private const val THUMBNAIL_SIZE = 256
        private const val AI_PROCESSING_SIZE = 1024
    }

    init {
        // Create upload directories if they don't exist
        createDirectoryIfNotExists("$uploadDirectory/originals")
        createDirectoryIfNotExists("$uploadDirectory/thumbnails")
        createDirectoryIfNotExists("$uploadDirectory/processed")
    }

    fun uploadImage(file: MultipartFile, userId: UUID? = null): ImageUploadResponse {
        validateFile(file)
        
        val originalImage = ImageIO.read(file.inputStream)
            ?: throw IllegalArgumentException("Invalid image file")

        val metadata = extractMetadata(file, originalImage)
        val imageId = UUID.randomUUID()
        val extension = FilenameUtils.getExtension(file.originalFilename).lowercase()
        
        // Generate filenames
        val originalFilename = "$imageId.$extension"
        val thumbnailFilename = "${imageId}_thumb.$extension"
        
        // Save original image
        val originalPath = Paths.get(uploadDirectory, "originals", originalFilename)
        Files.copy(file.inputStream, originalPath, StandardCopyOption.REPLACE_EXISTING)
        
        // Generate and save thumbnail
        val thumbnail = createThumbnail(originalImage)
        val thumbnailPath = Paths.get(uploadDirectory, "thumbnails", thumbnailFilename)
        ImageIO.write(thumbnail, extension, thumbnailPath.toFile())
        
        // Generate AI processing version (1024x1024)
        val processedImage = resizeForAI(originalImage)
        val processedFilename = "${imageId}_processed.$extension"
        val processedPath = Paths.get(uploadDirectory, "processed", processedFilename)
        ImageIO.write(processedImage, extension, processedPath.toFile())
        
        // For MVP testing, we'll create a mock user and save it first
        val mockUser = com.yardalchemy.model.entity.User(
            clerkUserId = "temp_user_${UUID.randomUUID()}",
            email = "test@example.com",
            subscriptionTier = com.yardalchemy.model.entity.SubscriptionTier.FREE
        )
        val savedUser = userRepository.save(mockUser)

        // Save to database
        val imageEntity = Image(
            id = imageId,
            user = savedUser,
            originalUrl = "/api/images/$imageId/original",
            thumbnailUrl = "/api/images/$imageId/thumbnail",
            fileSize = metadata.fileSize,
            width = metadata.width,
            height = metadata.height,
            contentType = "image/${metadata.format}"
        )
        
        imageRepository.save(imageEntity)
        
        return ImageUploadResponse(
            id = imageId,
            originalUrl = "http://localhost:$serverPort/api/images/$imageId/original",
            thumbnailUrl = "http://localhost:$serverPort/api/images/$imageId/thumbnail",
            metadata = metadata
        )
    }

    fun getImageFile(imageId: UUID, type: String): File {
        val image = imageRepository.findById(imageId)
            .orElseThrow { NoSuchElementException("Image not found: $imageId") }
        
        val directory = when (type) {
            "original" -> "originals"
            "thumbnail" -> "thumbnails"
            "processed" -> "processed"
            else -> throw IllegalArgumentException("Invalid image type: $type")
        }
        
        val extension = extractFormatFromContentType(image.contentType)
        val filename = if (type == "thumbnail") "${imageId}_thumb.$extension" 
                      else if (type == "processed") "${imageId}_processed.$extension"
                      else "$imageId.$extension"
        
        val file = File(uploadDirectory, "$directory/$filename")
        if (!file.exists()) {
            throw NoSuchElementException("Image file not found: $filename")
        }
        
        return file
    }

    fun deleteImage(imageId: UUID): Boolean {
        val image = imageRepository.findById(imageId)
            .orElseThrow { NoSuchElementException("Image not found: $imageId") }
        
        val extension = extractFormatFromContentType(image.contentType)
        
        // Delete all file variants
        listOf(
            "$uploadDirectory/originals/$imageId.$extension",
            "$uploadDirectory/thumbnails/${imageId}_thumb.$extension",
            "$uploadDirectory/processed/${imageId}_processed.$extension"
        ).forEach { path ->
            Files.deleteIfExists(Paths.get(path))
        }
        
        imageRepository.delete(image)
        return true
    }

    private fun validateFile(file: MultipartFile) {
        if (file.isEmpty) {
            throw IllegalArgumentException("File is empty")
        }
        
        if (file.size > maxFileSize) {
            throw IllegalArgumentException("File size exceeds maximum allowed size of ${maxFileSize / 1024 / 1024}MB")
        }
        
        val extension = FilenameUtils.getExtension(file.originalFilename)?.lowercase()
        if (extension !in ALLOWED_FORMATS) {
            throw IllegalArgumentException("File format not supported. Allowed formats: ${ALLOWED_FORMATS.joinToString(", ")}")
        }
    }

    private fun extractMetadata(file: MultipartFile, image: BufferedImage): ImageMetadata {
        return ImageMetadata(
            width = image.width,
            height = image.height,
            fileSize = file.size,
            format = FilenameUtils.getExtension(file.originalFilename)?.lowercase() ?: "unknown",
            originalFilename = file.originalFilename
        )
    }

    private fun createThumbnail(originalImage: BufferedImage): BufferedImage {
        return Scalr.resize(
            originalImage,
            Scalr.Method.QUALITY,
            Scalr.Mode.FIT_TO_WIDTH,
            THUMBNAIL_SIZE,
            THUMBNAIL_SIZE
        )
    }

    private fun resizeForAI(originalImage: BufferedImage): BufferedImage {
        return Scalr.resize(
            originalImage,
            Scalr.Method.QUALITY,
            Scalr.Mode.FIT_TO_WIDTH,
            AI_PROCESSING_SIZE,
            AI_PROCESSING_SIZE
        )
    }

    private fun extractFormatFromContentType(contentType: String?): String {
        return when (contentType) {
            "image/jpeg" -> "jpg"
            "image/png" -> "png"
            else -> "jpg" // Default fallback
        }
    }

    private fun createDirectoryIfNotExists(directory: String) {
        val path = Paths.get(directory)
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path)
            } catch (e: IOException) {
                throw RuntimeException("Failed to create directory: $directory", e)
            }
        }
    }
}