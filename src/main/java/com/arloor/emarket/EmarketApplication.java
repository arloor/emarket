package com.arloor.emarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class EmarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmarketApplication.class, args);
	}
}
