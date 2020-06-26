package com.Rhlynk.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.UserRepository;
import com.Rhlynk.entities.Role;
import com.Rhlynk.entities.User;

@Service
public class AuthenticationProvider2 implements AuthenticationProvider {
	
	@Autowired
	private UserRepository usersRepository;

	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		// TODO Auto-generated method stub
		// get the the username and the password from the http request
		String username = (String) auth.getPrincipal();
		String password = (String) auth.getCredentials();
		// get the user from the database who has same username as the username in the
		// http request
		User user = usersRepository.findOne(username);

		System.out.println("authentifactionnnnnnnnnnnnn");

		// verification de l'authentification ...
		// si l'utilisateur n'existe pas dans la base de donnee...
		if (user == null) {
			System.out.println("nom d'utilisateur introuvable");
			// ... avoir an exception
			throw new BadCredentialsException("nom d'utilisateur introuvable");
		}
		// si le mot de passe est incorrect base de donnee...
		if (!user.getPassword().equals(password)) {
			System.out.println("Mot de passe incorrect");
			// ... avoir an exception ce msg va etre afficher dans l'interface login
			throw new BadCredentialsException("Mot de passe incorrect");
		}
		// si l'utilisateur est inactive alors ...		
		if (!user.isActived()) {
			System.out.println("Votre compte est bloqué");
			// ... son compte va etre bloque			
			throw new BadCredentialsException("Votre compte est bloqué");
		}
		
		
		Collection<Role> roles = new ArrayList<>();
		roles.add(user.getRole());
		boolean droit = true;
		/*
		 * for(Roles r:roles) { if(r.getRole().equals("ADMIN") ||
		 * r.getRole().equals("GESTIONNAIRE")) { droit=false; break; } } if(!droit)
		 * throw new BadCredentialsException("Vous avez le droit d'accés ici");
		 */
		
		// Creer un token		
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password, roles);
		// token.setDetails(user);
		
		// retourner le token		
		return token;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
