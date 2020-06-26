package com.Rhlynk.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import com.View.LoginView;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.Rhlynk.dao.UserRepository;
import com.Rhlynk.entities.Gestionnaire;
import com.Rhlynk.entities.User;
import com.Rhlynk.pojo.Users;

@EnableWebSecurity
public class SecurityConfigurationUtilis {

	// permet d'envoyer une reponse au clientHTTP
	public void sendResponse(HttpServletResponse response, int status, Object object) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter writer = response.getWriter();
		writer.write(mapper.writeValueAsString(object));
		response.setStatus(status);
		writer.flush();
		writer.close();
	}

	@Component
	public class RestUnauthorizedEntryPoint implements AuthenticationEntryPoint {
		@Override
		public void commence(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException exception) throws IOException, ServletException {
			response.setStatus(HttpServletResponse.SC_OK);
			sendResponse(response, 201, "Déconnexion");

		}

	}

	// handling the uses case if the access with success
	@Component
	public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
		@Autowired
		UserRepository repository;

		@Override
		public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
				Authentication authentication) throws ServletException, IOException {
			response.setStatus(HttpServletResponse.SC_OK);

			User user = repository.findByUsername(authentication.getName());
			Users u = new Users(user.getUsername(), user.getNom(), user.getRole().getRole(), true);

			// si l'utilisateur est un gestionnaire alors ...
			if (user instanceof Gestionnaire) {
				// ...il va avoir un ensemble des fonctionnalites
				u.setFonctions(((Gestionnaire) user).getFonctions());
			}

			sendResponse(response, HttpServletResponse.SC_OK, u);
		}

	}

	// handling the uses case if the authentication failed 
	@Component
	public class RestAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

		@Override
		public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException exception) throws IOException, ServletException {
			response.setStatus(HttpServletResponse.SC_OK);
			sendResponse(response, 202, exception.getMessage());
		}

	}

	@Component
	public class RestAccessDeniedHandler implements AccessDeniedHandler {

		@Override
		public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exception)
				throws IOException, ServletException {
			response.setStatus(HttpServletResponse.SC_OK);
			response.sendError(203, "Vous ne possédez pas de droit sur la ressource demandée");
		}
	}

	public class CsrfHeaderFilter extends OncePerRequestFilter {
		@Override
		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
				FilterChain filterChain) throws ServletException, IOException {
			CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
			if (csrf != null) {
				Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
				String token = csrf.getToken();
				if (cookie == null || token != null && !token.equals(cookie.getValue())) {
					cookie = new Cookie("XSRF-TOKEN", token);
					cookie.setPath("/");
					response.addCookie(cookie);
				}
			}
			filterChain.doFilter(request, response);
		}
	}

	private CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}

}
