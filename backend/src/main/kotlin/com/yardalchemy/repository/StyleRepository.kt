package com.yardalchemy.repository

import com.yardalchemy.model.entity.Style
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StyleRepository : JpaRepository<Style, UUID> {
    
    fun findByIsActiveTrue(): List<Style>
    
    fun findByCategory(category: String): List<Style>
    
    fun findByCategoryAndIsActiveTrue(category: String): List<Style>
    
    fun findByNameContainingIgnoreCaseAndIsActiveTrue(name: String): List<Style>
    
    @Query("SELECT s FROM Style s WHERE s.isActive = true ORDER BY s.createdAt DESC")
    fun findActiveStylesOrderByCreatedDesc(): List<Style>
    
    @Query("SELECT DISTINCT s.category FROM Style s WHERE s.isActive = true AND s.category IS NOT NULL")
    fun findDistinctCategories(): List<String>
    
    @Query("SELECT s FROM Style s WHERE s.isActive = :isActive")
    fun findByActiveStatus(@Param("isActive") isActive: Boolean): List<Style>
}