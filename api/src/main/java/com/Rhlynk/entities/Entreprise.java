package com.Rhlynk.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@Entity
@DiscriminatorValue("E")
public class Entreprise extends User{
	private static final long serialVersionUID = 1L;

	public Entreprise() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Entreprise(String username, String password, boolean actived, String nom, String email, String tel,
			String adresse, Role role) {
		super(username, password, actived, nom, email, tel, adresse, role);
		// TODO Auto-generated constructor stub
	}

}
