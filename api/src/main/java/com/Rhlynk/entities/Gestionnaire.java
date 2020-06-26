package com.Rhlynk.entities;

import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import com.View;
import com.fasterxml.jackson.annotation.JsonView;
@Entity
@DiscriminatorValue("G")
public class Gestionnaire extends User{
	
	private static final long serialVersionUID = 1L;
	@JsonView({View.UserView.class})
	private String prenom;
	@ManyToMany
	@JsonView({View.UserView.class})
	private List<Fonctionnalites> fonctions;
	public Gestionnaire() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Gestionnaire(String username, String password, boolean actived, String nom, String email, String tel,
			String adresse, Role role,String prenom) {
		super(username, password, actived, nom, email, tel, adresse, role);
		this.prenom=prenom;
		// TODO Auto-generated constructor stub
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public List<Fonctionnalites> getFonctions() {
		return fonctions;
	}

	public void setFonctions(List<Fonctionnalites> fonctions) {
		this.fonctions = fonctions;
	}

}
