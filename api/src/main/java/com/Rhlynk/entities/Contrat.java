package com.Rhlynk.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.View;
import com.View.CandidatCvView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Candidat;
@Entity
public class Contrat {
	@Id @GeneratedValue
	@JsonView({View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private Long id;
	@JsonView({View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private Date disponibilite;
	@JsonView({View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private double salaireMensuel;
	@JsonView({View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private double salaireJournalier;
	@JsonView({View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private String lieuTravail;
	@JsonView({View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private String typeFreelance;
@ManyToOne
private Candidat candidat;
@ManyToOne
@JsonView({View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private TypeContrat typeContrat;
@JsonView({View.CvAnonyme.class,View.CandidatView.class,CandidatCvView.class,View.CandidatProfileView.class})
private int nbMois;

public Contrat() {
	super();
	// TODO Auto-generated constructor stub
}

public Contrat( Date disponibilite, double salaireMensuel, double salaireJournalier, String lieuTravail,
		String typeFreelance) {
	super();
	this.disponibilite = disponibilite;
	this.salaireMensuel = salaireMensuel;
	this.salaireJournalier = salaireJournalier;
	this.lieuTravail = lieuTravail;
	this.typeFreelance = typeFreelance;
}

public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Date getDisponibilite() {
	return disponibilite;
}
public void setDisponibilite(Date disponibilite) {
	this.disponibilite = disponibilite;
}
public double getSalaireMensuel() {
	return salaireMensuel;
}
public void setSalaireMensuel(double salaireMensuel) {
	this.salaireMensuel = salaireMensuel;
}
public double getSalaireJournalier() {
	return salaireJournalier;
}
public void setSalaireJournalier(double salaireJournalier) {
	this.salaireJournalier = salaireJournalier;
}
public String getLieuTravail() {
	return lieuTravail;
}
public void setLieuTravail(String lieuTravail) {
	this.lieuTravail = lieuTravail;
}
public String getTypeFreelance() {
	return typeFreelance;
}
public void setTypeFreelance(String typeFreelance) {
	this.typeFreelance = typeFreelance;
}

public Candidat getCandidat() {
	return candidat;
}

public void setCandidat(Candidat candidat) {
	this.candidat = candidat;
}

public TypeContrat getTypeContrat() {
	return typeContrat;
}

public void setTypeContrat(TypeContrat typeContrat) {
	this.typeContrat = typeContrat;
}

public int getNbMois() {
	return nbMois;
}

public void setNbMois(int nbMois) {
	this.nbMois = nbMois;
}

}
