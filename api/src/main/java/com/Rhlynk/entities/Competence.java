package com.Rhlynk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.View;
import com.View.CandidatCvView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Candidat;

@Entity
public class Competence {
@Id @GeneratedValue
@JsonView({View.CandidatProfileView.class,CandidatCvView.class})	
private Long id;
@ManyToOne
@JsonView({View.CvAnonyme.class,View.CandidatProfileView.class,CandidatCvView.class})	
private LangageProgrammation langage;
@ManyToOne
@JsonView({View.CvAnonyme.class,View.CandidatProfileView.class,CandidatCvView.class})	
private Framework framework;
@JsonView({View.CvAnonyme.class,View.CandidatProfileView.class,CandidatCvView.class})	
@ManyToOne
private Niveau niveau;
@ManyToOne
@JsonView({View.CvAnonyme.class,View.CandidatProfileView.class,CandidatCvView.class})	
private Experience experience;
@ManyToOne
private Candidat candidat;
@Transient
@JsonView({View.CandidatProfileView.class})
private double points;
public Competence(LangageProgrammation langage, Framework framework, Niveau niveau, Experience experience) {
	super();
	this.langage = langage;
	this.framework = framework;
	this.niveau = niveau;
	this.experience = experience;
}
public Competence() {
	super();
	// TODO Auto-generated constructor stub
}
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public LangageProgrammation getLangage() {
	return langage;
}
public void setLangage(LangageProgrammation langage) {
	this.langage = langage;
}
public Framework getFramework() {
	return framework;
}
public void setFramework(Framework framework) {
	this.framework = framework;
}
public Niveau getNiveau() {
	return niveau;
}
public void setNiveau(Niveau niveau) {
	this.niveau = niveau;
}
public Experience getExperience() {
	return experience;
}
public void setExperience(Experience experience) {
	this.experience = experience;
}
public double getPoints() {
	return points;
}
public void setPoints(double points) {
	this.points = points;
}
public Candidat getCandidat() {
	return candidat;
}
public void setCandidat(Candidat candidat) {
	this.candidat = candidat;
}

}
