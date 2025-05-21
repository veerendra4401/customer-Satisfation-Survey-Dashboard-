package com.survey.survey_dashboard.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Value("${server.servlet.context-path:}")
    private String contextPath;

    @Bean
    public OpenAPI customerSatisfactionOpenAPI() {
        return new OpenAPI()
                .servers(List.of(
                        new Server().url("http://localhost:8080" + contextPath).description("Local Development Server")
                ))
                .info(new Info()
                        .title("Customer Satisfaction Survey API")
                        .description("REST API documentation for Customer Satisfaction Survey Dashboard")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Survey Dashboard Team")
                                .email("support@surveydashboard.com")
                                .url("https://www.surveydashboard.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")));
    }
} 