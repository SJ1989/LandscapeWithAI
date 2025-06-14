package com.yardalchemy.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "Health Check", description = "Basic health check and status endpoints")
class HelloController {
    
    @Operation(
        summary = "Health check endpoint",
        description = "Simple endpoint to verify the API is running and accessible"
    )
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "API is healthy and running")
    ])
    @GetMapping("/hello")
    fun hello(): String {
        return "Hello World"
    }
}
