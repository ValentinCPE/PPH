package iut.pph;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class PersonalPhotoHostingApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonalPhotoHostingApplication.class, args);
	}
}
