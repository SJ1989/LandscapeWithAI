package com.yardalchemy.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Contact
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.servers.Server
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig {

    @Bean
    fun openAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("Yard Alchemy Designs API")
                    .description("AI-powered landscape design platform API for uploading yard images and generating professional landscape designs using FLUX.1 AI models")
                    .version("1.0.0")
                    .contact(
                        Contact()
                            .name("Yard Alchemy Team")
                            .email("support@yardalchemy.com")
                    )
            )
            .servers(
                listOf(
                    Server()
                        .url("http://localhost:8081")
                        .description("Development Server"),
                    Server()
                        .url("https://api.yardalchemy.com")
                        .description("Production Server")
                )
            )
    }
}