package com.yardalchemy.repository

import com.yardalchemy.model.entity.SubscriptionTier
import com.yardalchemy.model.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<User, UUID> {
    
    fun findByClerkUserId(clerkUserId: String): User?
    
    fun findByEmail(email: String): User?
    
    fun existsByClerkUserId(clerkUserId: String): Boolean
    
    fun existsByEmail(email: String): Boolean
    
    @Query("SELECT u FROM User u WHERE u.subscriptionTier = :tier")
    fun findBySubscriptionTier(@Param("tier") tier: SubscriptionTier): List<User>
}