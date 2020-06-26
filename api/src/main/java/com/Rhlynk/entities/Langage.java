package com.Rhlynk.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.View;
import com.View.CampagneView1;
import com.View.CandidatCvView;
import com.View.CandidatRepView;
import com.View.CompetenceView1;
import com.View.CompetenceView2;
import com.View.LangageView;
import com.View.QuestionOfTestView;
import com.View.QuestionView;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Framework;

@Entity
public class Langage implements Serializable {
@Id @GeneratedValue
@JsonView({View.LangageAndThemeView.class,View.QuestionView.class,
	View.QuestionWithStatsView.class,CampagneView1.class,View.TestView1.class,
	CompetenceView1.class,CompetenceView2.class,View.CandidatProfileView.class,LangageView.class,initValuesView.class,CandidatCvView.class,QuestionOfTestView.class})
private Long id;
@NotEmpty
@JsonView({View.CvAnonyme.class,CandidatRepView.class,View.LangageAndThemeView.class,View.QuestionView.class,View.QuestionWithStatsView.class,
	View.TestView1.class,CompetenceView1.class,CompetenceView2.class,View.CandidatProfileView.class,
	LangageView.class,initValuesView.class,CandidatCvView.class,QuestionOfTestView.class})
private String nom;
@JsonView({View.CvAnonyme.class,View.CompetenceView2.class})
private String description;
@Column( columnDefinition="TEXT")
@JsonView({View.LangageAndThemeView.class,View.QuestionView.class,View.TestView1.class,CompetenceView1.class,View.CompetenceView2.class,QuestionOfTestView.class})
private String defaultText;
@JsonView({View.LangageAndThemeView.class,View.QuestionView.class,View.TestView1.class,CompetenceView1.class,View.CompetenceView2.class,QuestionOfTestView.class})
private int numeroLangage;
@JsonView({View.LangageAndThemeView.class,View.QuestionView.class,View.TestView1.class,CompetenceView1.class,View.CompetenceView2.class,QuestionOfTestView.class})
private String compilerArgs;
@OneToMany(mappedBy="langage",cascade={CascadeType.REMOVE,CascadeType.DETACH})
private List<Question> questions;
@JsonView({View.QuestionWithStatsView.class})
private int numbreOfQuestion;
@JsonView({View.CandidatProfileView.class,LangageView.class})
private double point;
public Langage() {
	super();
	// TODO Auto-generated constructor stub
}

public Langage(String nom, String description, String defaultText, int numeroLangage, String compilerArgs) {
	super();
	this.nom = nom;
	this.description = description;
	this.defaultText = defaultText;
	this.numeroLangage = numeroLangage;
	this.compilerArgs = compilerArgs;
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
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}

public String getDefaultText() {
	return defaultText;
}
public void setDefaultText(String defaultText) {
	this.defaultText = defaultText;
}
public int getNumeroLangage() {
	return numeroLangage;
}
public void setNumeroLangage(int numeroLangage) {
	this.numeroLangage = numeroLangage;
}
public String getCompilerArgs() {
	return compilerArgs;
}
public void setCompilerArgs(String compilerArgs) {
	this.compilerArgs = compilerArgs;
}

public List<Question> getQuestions() {
	return questions;
}

public void setQuestions(List<Question> questions) {
	this.questions = questions;
}

public void setNumbreOfQuestion(int numbreOfQuestion) {
	this.numbreOfQuestion = numbreOfQuestion;
}

public int getNumbreOfQuestion() {
	return numbreOfQuestion;
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
if(obj instanceof Langage){
	Langage f= (Langage) obj;		
		if(f.getId()==id)return true;
		return false;	
}
	return false;
}

}
