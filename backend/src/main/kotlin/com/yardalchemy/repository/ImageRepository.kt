package com.yardalchemy.repository

import com.yardalchemy.model.entity.Image
import com.yardalchemy.model.entity.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.*

@Repository
interface ImageRepository : JpaRepository<Image, UUID> {
    
    fun findByUser(user: User): List<Image>
    
    fun findByUserOrderByUploadedAtDesc(user: User): List<Image>
    
    fun findByUserOrderByUploadedAtDesc(user: User, pageable: Pageable): Page<Image>
    
    @Query("SELECT i FROM Image i WHERE i.user = :user AND i.uploadedAt >= :fromDate")
    fun findByUserAndUploadedAtAfter(
        @Param("user") user: User, 
        @Param("fromDate") fromDate: LocalDateTime
    ): List<Image>
    
    @Query("SELECT COUNT(i) FROM Image i WHERE i.user = :user")
    fun countByUser(@Param("user") user: User): Long
    
    @Query("SELECT i FROM Image i WHERE i.contentType LIKE :contentType%")
    fun findByContentTypeStartingWith(@Param("contentType") contentType: String): List<Image>
}