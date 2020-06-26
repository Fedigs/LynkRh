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
public class Framework {
@Id @GeneratedValue
@JsonView({View.CompetenceView2.class,CandidatCvView.class,
	View.CandidatProfileView.class,initValuesView.class,
	View.offresView.class,View.offreView.class,View.offreInfoView.class})
private Long id;
@JsonView({View.EntretienView.class,View.CvAnonyme.class,View.CompetenceView2.class,
	CandidatCvView.class,View.CandidatProfileView.class,
	initValuesView.class,View.offreView.class,View.offreInfoView.class,CandidatInvitationView.class})
private String nom;
@JsonView({View.CvAnonyme.class,View.CompetenceView2.class})
private String description;
@JsonView({View.CvAnonyme.class,View.CandidatProfileView.class,initValuesView.class})	
private double point;
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
public Framework() {
	super();
	// TODO Auto-generated constructor stub
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public double getPoint() {
	return point;
}
public void setPoint(double point) {
	this.point = point;
}
@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
	if(obj instanceof Framework){
	Framework f= (Framework) obj;		
			if(f.getId()==id)return true;
			return false;	
	}
		return false;
	}
}
