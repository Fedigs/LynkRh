package com.Rhlynk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.View;
import com.View.CandidatCvView;
import com.View.CandidatInvitationView;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;

@Table(name="langage_programmation")
@Entity
public class LangageProgrammation {
	@Id @GeneratedValue
	@JsonView({View.CandidatProfileView.class,
		CandidatCvView.class,initValuesView.class,View.CompetenceView2.class,
		View.offresView.class,View.offreView.class})	
private Long id;
	@JsonView({View.EntretienView.class,View.CvAnonyme.class,View.CandidatProfileView.class,CandidatCvView.class,initValuesView.class
		,View.CompetenceView2.class,View.offreView.class,View.offreInfoView.class,CandidatInvitationView.class})	
private String nom;
	@JsonView({View.CvAnonyme.class,View.CompetenceView2.class})	
private String description;
public LangageProgrammation() {
		super();
		// TODO Auto-generated constructor stub
	}
public LangageProgrammation(String nom) {
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
@Override
public boolean equals(Object obj) {
	// TODO Auto-generated method stub
if(obj instanceof LangageProgrammation){
	LangageProgrammation f= (LangageProgrammation) obj;		
		if(f.getId()==id)return true;
		return false;	
}
	return false;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}

}
