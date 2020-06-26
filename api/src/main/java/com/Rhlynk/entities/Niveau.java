package com.Rhlynk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.View;
import com.View.CandidatCvView;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Niveau {
	@Id
	@GeneratedValue
	@JsonView({ View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private Long id;
	// candidaProfileView represente la vue lors qu'on recupere une instance d'un
	// candidat alors que initValuesView represente les values que peut
	// choisir le candidat pour modifier sont profile (compétences)
	@JsonView({ View.CvAnonyme.class,View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private int niveau;
	@JsonView({ View.CvAnonyme.class,View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private String label;
	@JsonView({View.CvAnonyme.class, View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private double point;

	public Niveau() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public double getPoint() {
		return point;
	}

	public void setPoint(double point) {
		this.point = point;
	}

}
