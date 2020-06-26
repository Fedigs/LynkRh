package com.Rhlynk.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@Entity
@DiscriminatorValue("A")
public class Admin extends User{

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(String username, String password, boolean actived, String nom, String email, String tel,
			String adresse, Role role) {
		super(username, password, actived, nom, email, tel, adresse, role);
		// TODO Auto-generated constructor stub
	}

}
