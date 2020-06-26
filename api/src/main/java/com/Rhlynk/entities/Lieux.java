package com.Rhlynk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.View;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Lieux {
	@Id
	@GeneratedValue
	@JsonView({ View.Lieux.class })
	private Long id;
	@JsonView({ View.Lieux.class })
	private String nom;

	public Lieux() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Lieux(String nom) {
		super();
		this.nom = nom;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

}
