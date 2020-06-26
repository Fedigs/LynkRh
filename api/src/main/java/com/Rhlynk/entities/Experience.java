package com.Rhlynk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.View;
import com.View.CandidatCvView;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Experience {
	@Id
	@GeneratedValue
	@JsonView({ View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private Long id;
	@JsonView({ View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private int experience;
	@JsonView({ View.CvAnonyme.class,View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private String label;
	@JsonView({ View.CandidatProfileView.class, initValuesView.class, CandidatCvView.class })
	private double point;

	public Experience() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
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
