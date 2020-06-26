package com;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.Rhlynk.dao.RoleRepository;
import com.Rhlynk.entities.Role;

@SpringBootApplication
public class SotutechTestApplication {

	public static void main(String[] args) {
		ApplicationContext context=SpringApplication.run(SotutechTestApplication.class, args);
		RoleRepository roleRepository=context.getBean(RoleRepository.class);
		List<Role>roles=roleRepository.findAll();
		if(roles.size()==0){
			Role r1= new Role("ADMIN");
			Role r2= new Role("GESTIONNAIRE");
			Role r3= new Role("ENTREPRISE");
			Role r4= new Role("CANDIDAT");
			roleRepository.save(r1);
			roleRepository.save(r2);
			roleRepository.save(r3);
			roleRepository.save(r4);
		}
		
	}
	@Bean
	public Module springDataPageModule() {
	    return new SimpleModule().addSerializer(Page.class, new JsonSerializer<Page>() {
	        @Override
	        public void serialize(Page value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
	            gen.writeStartObject();
	            gen.writeNumberField("totalElements",value.getTotalElements());
	            gen.writeNumberField("totalPages", value.getTotalPages());
	            gen.writeNumberField("number", value.getNumber());
	            gen.writeNumberField("size", value.getSize());
	            gen.writeBooleanField("first", value.isFirst());
	            gen.writeBooleanField("last", value.isLast());
	            gen.writeFieldName("content");
	            serializers.defaultSerializeValue(value.getContent(),gen);
	            gen.writeEndObject();
	        }
	    });
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurerAdapter() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST","PUT", "DELETE");
	        }
	    };
	}
	
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurerAdapter() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**")
//						.allowedOrigins("*")
//						.allowedMethods("POST","DELETE","GET","PUT");
//			}
//		};
//	}
}
