package com.yardalchemy.repository

import com.yardalchemy.model.entity.Design
import com.yardalchemy.model.entity.DesignEdit
import com.yardalchemy.model.entity.DesignEditStatus
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.*

@Repository
interface DesignEditRepository : JpaRepository<DesignEdit, UUID> {
    
    fun findByDesign(design: Design): List<DesignEdit>
    
    fun findByDesignOrderByCreatedAtDesc(design: Design): List<DesignEdit>
    
    fun findByDesignOrderByCreatedAtDesc(design: Design, pageable: Pageable): Page<DesignEdit>
    
    fun findByStatus(status: DesignEditStatus): List<DesignEdit>
    
    fun findByFluxJobId(fluxJobId: String): DesignEdit?
    
    @Query("SELECT de FROM DesignEdit de WHERE de.design = :design AND de.status = :status")
    fun findByDesignAndStatus(
        @Param("design") design: Design, 
        @Param("status") status: DesignEditStatus
    ): List<DesignEdit>
    
    @Query("SELECT COUNT(de) FROM DesignEdit de WHERE de.design = :design")
    fun countByDesign(@Param("design") design: Design): Long
    
    @Query("SELECT de FROM DesignEdit de WHERE de.status = :status AND de.createdAt < :beforeDate")
    fun findByStatusAndCreatedAtBefore(
        @Param("status") status: DesignEditStatus,
        @Param("beforeDate") beforeDate: LocalDateTime
    ): List<DesignEdit>
    
    @Query("""
        SELECT de FROM DesignEdit de 
        WHERE de.design.user.id = :userId 
        AND de.status = :status
        ORDER BY de.createdAt DESC
    """)
    fun findByUserAndStatus(
        @Param("userId") userId: UUID,
        @Param("status") status: DesignEditStatus
    ): List<DesignEdit>
}