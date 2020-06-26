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
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotEmpty;

import com.View;
import com.View.CampagneView1;
import com.View.CandidatInvitationView;
import com.View.CandidatRepView;
import com.View.CompetenceView1;
import com.View.QuestionOfTestView;
import com.View.QuestionView;
import com.View.QuestionWithStatsView;
import com.View.ReponseView;
import com.fasterxml.jackson.annotation.JsonView;


@Entity
public class Question implements Serializable,Cloneable{
@Id @GeneratedValue
@JsonView({QuestionView.class,
	QuestionWithStatsView.class,CampagneView1.class,View.TestView.class,
	View.CompetenceView.class,View.TestView1.class,ReponseView.class,
	CompetenceView1.class,CandidatInvitationView.class,QuestionOfTestView.class,CandidatRepView.class})
private Long id;
@NotEmpty
@Column(nullable=false)
@JsonView({QuestionView.class,QuestionWithStatsView.class,CampagneView1.class,View.TestView1.class,
	ReponseView.class,CompetenceView1.class,QuestionOfTestView.class,CandidatRepView.class})
private String titre;
@Column( columnDefinition="TEXT",nullable=false)
@NotEmpty
@JsonView({QuestionView.class,View.TestView1.class,ReponseView.class,CompetenceView1.class,View.QuestionWithStatsView.class,
	QuestionOfTestView.class,CandidatRepView.class})
private String enonce;
@Column(nullable=false,columnDefinition="varchar(20)")
@JsonView({QuestionView.class,QuestionWithStatsView.class,View.TestView1.class,ReponseView.class,CompetenceView1.class,QuestionOfTestView.class})
private TypeQuestion typeQuestion;
@JsonView({QuestionView.class,QuestionWithStatsView.class,View.TestView1.class,CompetenceView1.class,CandidatRepView.class})
@Column(nullable=false,columnDefinition="varchar(20)")
private Difficulte difficulte;
@JsonView({QuestionView.class,QuestionWithStatsView.class,CampagneView1.class,View.TestView1.class,CompetenceView1.class})
@Column(nullable=false,columnDefinition="varchar(20)")
private Type type;
@Min(1)
@JsonView({QuestionView.class,QuestionWithStatsView.class,View.TestView1.class,CompetenceView1.class,CandidatRepView.class})
private int score;
@NotEmpty
@Pattern(regexp="[0-9]{2}:[0-9]{2}",message="La durée doit etre au format MM:SS")
@Column(nullable=false)
@JsonView({QuestionView.class,QuestionWithStatsView.class,CampagneView1.class,View.TestView1.class,CompetenceView1.class,QuestionOfTestView.class,CandidatRepView.class})
private String duree;
@ManyToOne
@JsonView({QuestionView.class,CandidatRepView.class,QuestionWithStatsView.class,View.TestView1.class,CompetenceView1.class})
private Theme theme;
@ManyToOne
@JsonView({QuestionView.class,QuestionWithStatsView.class,CampagneView1.class,View.TestView1.class,CompetenceView1.class,QuestionOfTestView.class,CandidatRepView.class})
private Langage langage;
@JsonView({QuestionWithStatsView.class})
private boolean visibilite=true;
@Column(nullable=false)
@NotEmpty
@JsonView({QuestionView.class,QuestionWithStatsView.class,View.TestView1.class,CompetenceView1.class})
private String description;
@OneToMany(mappedBy="question",cascade={CascadeType.REMOVE,CascadeType.DETACH})
@JsonView({QuestionView.class,ReponseView.class,View.TestView1.class,CompetenceView1.class,QuestionOfTestView.class})
private List<Reponse> reponses;
@ManyToOne
private User createBy;
@JsonView({ReponseView.class})
private String compileResult;
@JsonView({ReponseView.class})
private String compileErrors;
@JsonView({ReponseView.class})
private String compileWarning;
public Question() {
	super();
	// TODO Auto-generated constructor stub
}



public Question(String titre, String enonce, TypeQuestion typeQuestion, Difficulte difficulte, Type type, int score,
		String duree, Theme theme, Langage langage, boolean visibilite, String description, List<Reponse> reponses) {
	super();
	this.titre = titre;
	this.enonce = enonce;
	this.typeQuestion = typeQuestion;
	this.difficulte = difficulte;
	this.type = type;
	this.score = score;
	this.duree = duree;
	this.theme = theme;
	this.langage = langage;
	this.visibilite = visibilite;
	this.description = description;
	this.reponses = reponses;
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
public String getEnonce() {
	return enonce;
}
public void setEnonce(String enonce) {
	this.enonce = enonce;
}

public TypeQuestion getTypeQuestion() {
	return typeQuestion;
}

public void setTypeQuestion(TypeQuestion typeQuestion) {
	this.typeQuestion = typeQuestion;
}

public Difficulte getDifficulte() {
	return difficulte;
}

public void setDifficulte(Difficulte difficulte) {
	this.difficulte = difficulte;
}

public Type getType() {
	return type;
}

public void setType(Type type) {
	this.type = type;
}

public boolean isVisibilite() {
	return visibilite;
}

public void setVisibilite(boolean visibilite) {
	this.visibilite = visibilite;
}
public List<Reponse> getReponses() {
	return reponses;
}
public void setReponses(List<Reponse> reponses) {
	this.reponses = reponses;
}
public String getDuree() {
	return duree;
}
public void setDuree(String duree) {
	this.duree = duree;
}

public Theme getTheme() {
	return theme;
}
public void setTheme(Theme theme) {
	this.theme = theme;
}
public Langage getLangage() {
	return langage;
}
public void setLangage(Langage langage) {
	this.langage = langage;
}

public int getScore() {
	return score;
}
public void setScore(int score) {
	this.score = score;
}
@Override
public Object clone() throws CloneNotSupportedException {
	// TODO Auto-generated method stub
	return super.clone();
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}

public User getCreateBy() {
	return createBy;
}

public void setCreateBy(User createBy) {
	this.createBy = createBy;
}



public String getCompileResult() {
	return compileResult;
}



public void setCompileResult(String compileResult) {
	this.compileResult = compileResult;
}



public String getCompileErrors() {
	return compileErrors;
}



public void setCompileErrors(String compileErrors) {
	this.compileErrors = compileErrors;
}



public String getCompileWarning() {
	return compileWarning;
}



public void setCompileWarning(String compileWarning) {
	this.compileWarning = compileWarning;
}

}
