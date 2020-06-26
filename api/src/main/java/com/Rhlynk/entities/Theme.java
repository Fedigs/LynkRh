package com.Rhlynk.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.View;
import com.View.CandidatRepView;
import com.View.CompetenceView1;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Theme implements Serializable{
@Id @GeneratedValue
@JsonView({View.LangageAndThemeView.class,CandidatRepView.class,View.QuestionView.class,View.QuestionWithStatsView.class,View.TestView1.class,CompetenceView1.class})
private Long id;
@NotEmpty
@JsonView({View.LangageAndThemeView.class,CandidatRepView.class,View.QuestionView.class,View.QuestionWithStatsView.class,View.TestView1.class,CompetenceView1.class})
private String nom;
@Size(min=10,max=50)
private String description;
@JsonIgnore
@OneToMany(mappedBy="theme",cascade={CascadeType.REMOVE,CascadeType.DETACH})
private List<Question> questions;
@JsonView({View.QuestionWithStatsView.class,CandidatRepView.class})
private int numbreOfQuestion;
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
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}

public Theme(String nom, String description) {
	super();
	this.nom = nom;
	this.description = description;
}
public List<Question> getQuestions() {
	return questions;
}
public void setQuestions(List<Question> questions) {
	this.questions = questions;
}
public Theme() {
	super();
	// TODO Auto-generated constructor stub
}
public int getNumbreOfQuestion() {
	return numbreOfQuestion;
}
public void setNumbreOfQuestion(int numbreOfQuestion) {
	this.numbreOfQuestion = numbreOfQuestion;
}

}
