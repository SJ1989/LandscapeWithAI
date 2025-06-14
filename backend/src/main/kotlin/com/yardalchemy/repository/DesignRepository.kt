package com.yardalchemy.repository

import com.yardalchemy.model.entity.Design
import com.yardalchemy.model.entity.Style
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
interface DesignRepository : JpaRepository<Design, UUID> {
    
    fun findByUser(user: User): List<Design>
    
    fun findByUserOrderByCreatedAtDesc(user: User): List<Design>
    
    fun findByUserOrderByCreatedAtDesc(user: User, pageable: Pageable): Page<Design>
    
    fun findByStyle(style: Style): List<Design>
    
    @Query("SELECT d FROM Design d WHERE d.user = :user AND d.createdAt >= :fromDate")
    fun findByUserAndCreatedAtAfter(
        @Param("user") user: User, 
        @Param("fromDate") fromDate: LocalDateTime
    ): List<Design>
    
    @Query("SELECT COUNT(d) FROM Design d WHERE d.user = :user")
    fun countByUser(@Param("user") user: User): Long
    
    @Query("SELECT COUNT(d) FROM Design d WHERE d.style = :style")
    fun countByStyle(@Param("style") style: Style): Long
    
    @Query("""
        SELECT d FROM Design d 
        WHERE d.user = :user 
        AND (:styleName IS NULL OR d.style.name LIKE %:styleName%)
        AND (:designName IS NULL OR d.name LIKE %:designName%)
        ORDER BY d.createdAt DESC
    """)
    fun findByUserWithFilters(
        @Param("user") user: User,
        @Param("styleName") styleName: String?,
        @Param("designName") designName: String?,
        pageable: Pageable
    ): Page<Design>
}