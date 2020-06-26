package com.Rhlynk.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;

import com.View;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Role implements Serializable, GrantedAuthority {
	@Id
	@JsonView({ View.UserView.class })
	private String role;

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Role(String role) {
		super();
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return role;
	}

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return role;
	}
}
