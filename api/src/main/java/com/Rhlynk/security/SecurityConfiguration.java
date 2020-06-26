package com.Rhlynk.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.Rhlynk.security.SecurityConfigurationUtilis.RestAccessDeniedHandler;
import com.Rhlynk.security.SecurityConfigurationUtilis.RestAuthenticationFailureHandler;
import com.Rhlynk.security.SecurityConfigurationUtilis.RestAuthenticationSuccessHandler;
import com.Rhlynk.security.SecurityConfigurationUtilis.RestUnauthorizedEntryPoint;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity()
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	// tout ces class sont declarer dans la class SecurityConfigurationUtilis
	@Autowired
	private RestAccessDeniedHandler restAccessDeniedHandler;
	@Autowired
	private RestAuthenticationFailureHandler restAuthenticationFailureHandler;
	@Autowired
	private RestUnauthorizedEntryPoint restUnauthorizedEntryPoint;
	@Autowired
	private RestAuthenticationSuccessHandler restAuthenticationSuccessHandler;

	// not used
	@Autowired
	private UserDetailsService userDetailsService;

	// l'injection de la class AuthenticationProvider2 pour l'utiliser dans la
	// processus d'authentification
	@Autowired
	private AuthenticationProvider2 authenticationProvider2;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		auth.authenticationProvider(authenticationProvider2);
		// auth.userDetailsService(userDetailsService);
	}

	// configuration de spring Security pour les services rest
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub

		// pour eliminer le probleme de CORS Origin et le csrf
		http.csrf().disable().cors().and().headers().disable()

				// authorized requests
				.authorizeRequests()
				.antMatchers("/inscription/formValues", "/langages", "/offre", "/entretien", "/invitations/offre",
						"/inviter","/offres", "/entreprises","/cvAnonymes","/inviterEntretienDefinitif","/verifExistInvitation","/cvAnonyme", "/candidatReponse","/candidat/matching", "/candidat/inscription", "/lieux")
				.permitAll().anyRequest().authenticated().and()

				// login configuration so because it a rest api the login form is represented with loginProcessingUrl()
				.formLogin().loginProcessingUrl("/login").permitAll().successHandler(restAuthenticationSuccessHandler)
				.failureHandler(restAuthenticationFailureHandler).permitAll().and()

				// handling authentication exceptions
				.exceptionHandling().authenticationEntryPoint(restUnauthorizedEntryPoint)
				.accessDeniedHandler(restAccessDeniedHandler).and()

				// logout configuration
				.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login")

		// .and().rememberMe().rememberMeParameter("rememberme")
		// .tokenRepository(persistentTokenRepository())
		// .tokenValiditySeconds(1209600)
		;
	}

//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().antMatchers("/sign-in.html", "/index.html", "/css/**", "/js/**", "/images/**", "/fonts/**",
//				"/views/**"); // #3
//	}

}
