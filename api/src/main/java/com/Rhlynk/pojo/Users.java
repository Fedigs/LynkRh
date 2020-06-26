package com.Rhlynk.pojo;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.Rhlynk.entities.Fonctionnalites;
import com.Rhlynk.entities.User;

@Service
public class Users implements UserDetails {
	private boolean login;
	private String username;
	private String nom;
	private String role;
	private List<Fonctionnalites> fonctions;

	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Users(String username, String nom, String role, boolean l, List<Fonctionnalites> fonctionnalites) {
		super();
		this.username = username;
		this.nom = nom;
		this.role = role;
		this.fonctions = fonctionnalites;
		this.login = l;
	}

	public Users(User u) {
		this.username = u.getUsername();
		this.nom = u.getNom();
		this.role = u.getRole().getRole();
		this.login = true;
	}

	public Users(String username, String nom, String role, boolean l) {
		super();
		this.username = username;
		this.nom = nom;
		this.role = role;
		this.login = l;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Fonctionnalites> getFonctions() {
		return fonctions;
	}

	public void setFonctions(List<Fonctionnalites> fonctions) {
		this.fonctions = fonctions;
	}

	public boolean isLogin() {
		return login;
	}

	public void setLogin(boolean login) {
		this.login = login;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

}
