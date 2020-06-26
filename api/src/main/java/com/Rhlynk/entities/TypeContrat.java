package com.Rhlynk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.View;
import com.View.CandidatCvView;
import com.View.CandidatInvitationView;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class TypeContrat {
	@Id @GeneratedValue
	@JsonView({View.CandidatView.class,CandidatCvView.class,
		View.CandidatProfileView.class,
		initValuesView.class,
		View.offresView.class,View.offreView.class,View.offreInfoView.class})
private Long id;
	@JsonView({View.EntretienView.class,View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,
		View.CandidatProfileView.class,initValuesView.class,
		View.offresView.class,View.offreView.class,View.offreInfoView.class,CandidatInvitationView.class})
private String nom;

public TypeContrat() {
	super();
	// TODO Auto-generated constructor stub
}
public TypeContrat(String nom) {
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
