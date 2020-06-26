package com.Rhlynk.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.NotEmpty;

import com.View;
import com.View.CandidatInvitationView;
import com.View.QuestionOfTestView;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Test implements Serializable {
	@Id
	@GeneratedValue
	@JsonView({ View.TestView.class, View.TestView1.class, CandidatInvitationView.class, View.offresView.class,
			View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private Long id;
	@JsonView({ View.TestView.class, View.TestView1.class, CandidatInvitationView.class, View.offresView.class,
			View.offreInfoView.class })
	@NotEmpty
	private String titre;
	@ManyToMany
	@JsonView({ View.TestView.class, View.TestView1.class, CandidatInvitationView.class, QuestionOfTestView.class })
	private List<Question> questions;
	@JsonView({ View.TestView.class, View.TestView1.class })
	private String affichage;

	public Test() {

		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public String getAffichage() {
		return affichage;
	}

	public void setAffichage(String affichage) {
		this.affichage = affichage;
	}

	@Override
	public String toString() {
		return "Test [id=" + id + ", titre=" + titre + ", questions=" + questions + ", affichage=" + affichage + "]";
	}
	
	

}
