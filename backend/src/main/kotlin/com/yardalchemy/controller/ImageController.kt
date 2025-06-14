package com.yardalchemy.controller

import com.yardalchemy.model.dto.ImageUploadResponse
import com.yardalchemy.service.ImageService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = ["http://localhost:3001"]) // Allow frontend access
@Tag(name = "Image Management", description = "Upload, retrieve, and manage landscape images for AI design processing")
class ImageController(
    private val imageService: ImageService
) {

    @Operation(
        summary = "Upload landscape image",
        description = "Upload a yard/landscape image for AI design processing. Supports JPEG/PNG formats up to 10MB. Automatically generates thumbnail and AI-ready versions."
    )
    @ApiResponses(value = [
        ApiResponse(
            responseCode = "200",
            description = "Image uploaded successfully",
            content = [Content(
                mediaType = "application/json",
                schema = Schema(implementation = ImageUploadResponse::class),
                examples = [ExampleObject(
                    value = """
                    {
                        "id": "123e4567-e89b-12d3-a456-426614174000",
                        "originalUrl": "http://localhost:8081/api/images/123e4567-e89b-12d3-a456-426614174000/original",
                        "thumbnailUrl": "http://localhost:8081/api/images/123e4567-e89b-12d3-a456-426614174000/thumbnail",
                        "metadata": {
                            "width": 1920,
                            "height": 1080,
                            "fileSize": 2048576,
                            "format": "jpg",
                            "originalFilename": "my-yard.jpg"
                        }
                    }
                    """
                )]
            )]
        ),
        ApiResponse(responseCode = "400", description = "Invalid file format or size exceeds 10MB"),
        ApiResponse(responseCode = "500", description = "Internal server error during processing")
    ])
    @PostMapping("/upload", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadImage(
        @Parameter(description = "Image file (JPEG/PNG, max 10MB)", required = true)
        @RequestParam("file") file: MultipartFile,
        @Parameter(description = "Optional user ID for associating the image", required = false)
        @RequestParam("userId", required = false) userId: UUID?
    ): ResponseEntity<ImageUploadResponse> {
        return try {
            val response = imageService.uploadImage(file, userId)
            ResponseEntity.ok(response)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @Operation(summary = "Get original image", description = "Retrieve the original uploaded image file")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Image file returned", content = [Content(mediaType = "image/jpeg"), Content(mediaType = "image/png")]),
        ApiResponse(responseCode = "404", description = "Image not found")
    ])
    @GetMapping("/{imageId}/original")
    fun getOriginalImage(
        @Parameter(description = "Image UUID", required = true)
        @PathVariable imageId: UUID
    ): ResponseEntity<Resource> {
        return getImageFile(imageId, "original")
    }

    @Operation(summary = "Get thumbnail image", description = "Retrieve 256x256 thumbnail version of the image")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Thumbnail image returned", content = [Content(mediaType = "image/jpeg"), Content(mediaType = "image/png")]),
        ApiResponse(responseCode = "404", description = "Image not found")
    ])
    @GetMapping("/{imageId}/thumbnail")
    fun getThumbnailImage(
        @Parameter(description = "Image UUID", required = true)
        @PathVariable imageId: UUID
    ): ResponseEntity<Resource> {
        return getImageFile(imageId, "thumbnail")
    }

    @Operation(summary = "Get AI-ready image", description = "Retrieve 1024x1024 processed version optimized for AI design generation")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Processed image returned", content = [Content(mediaType = "image/jpeg"), Content(mediaType = "image/png")]),
        ApiResponse(responseCode = "404", description = "Image not found")
    ])
    @GetMapping("/{imageId}/processed")
    fun getProcessedImage(
        @Parameter(description = "Image UUID", required = true)
        @PathVariable imageId: UUID
    ): ResponseEntity<Resource> {
        return getImageFile(imageId, "processed")
    }

    @Operation(summary = "Get image (default to original)", description = "Retrieve image file, defaults to original version")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Image file returned", content = [Content(mediaType = "image/jpeg"), Content(mediaType = "image/png")]),
        ApiResponse(responseCode = "404", description = "Image not found")
    ])
    @GetMapping("/{imageId}")
    fun getImage(
        @Parameter(description = "Image UUID", required = true)
        @PathVariable imageId: UUID
    ): ResponseEntity<Resource> {
        // Default to original image
        return getImageFile(imageId, "original")
    }

    @Operation(summary = "Delete image", description = "Delete an image and all its variants (original, thumbnail, processed)")
    @ApiResponses(value = [
        ApiResponse(
            responseCode = "200", 
            description = "Image deleted successfully",
            content = [Content(
                mediaType = "application/json",
                examples = [ExampleObject(value = """{"message": "Image deleted successfully"}""")]
            )]
        ),
        ApiResponse(responseCode = "404", description = "Image not found"),
        ApiResponse(responseCode = "500", description = "Failed to delete image")
    ])
    @DeleteMapping("/{imageId}")
    fun deleteImage(
        @Parameter(description = "Image UUID", required = true)
        @PathVariable imageId: UUID
    ): ResponseEntity<Map<String, Any>> {
        return try {
            val deleted = imageService.deleteImage(imageId)
            if (deleted) {
                ResponseEntity.ok(mapOf("message" to "Image deleted successfully"))
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "Failed to delete image"))
        }
    }

    private fun getImageFile(imageId: UUID, type: String): ResponseEntity<Resource> {
        return try {
            val file = imageService.getImageFile(imageId, type)
            val resource = FileSystemResource(file)
            
            if (!resource.exists()) {
                return ResponseEntity.notFound().build()
            }

            val mediaType = when (file.extension.lowercase()) {
                "jpg", "jpeg" -> MediaType.IMAGE_JPEG
                "png" -> MediaType.IMAGE_PNG
                else -> MediaType.APPLICATION_OCTET_STREAM
            }

            ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"${file.name}\"")
                .body(resource)
                
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }
}