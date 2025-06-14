package com.yardalchemy

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class YardAlchemyApplication

fun main(args: Array<String>) {
    runApplication<YardAlchemyApplication>(*args)
}
