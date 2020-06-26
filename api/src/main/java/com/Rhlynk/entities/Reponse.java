package com.Rhlynk.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;
import org.hibernate.loader.plan.build.internal.CascadeStyleLoadPlanBuildingAssociationVisitationStrategy;

import com.View;
import com.View.CandidatRepView;
import com.View.CompetenceView1;
import com.View.QuestionOfTestView;
import com.View.QuestionView;
import com.View.ReponseView;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Reponse implements Serializable, Cloneable {
	@Id
	@GeneratedValue
	@JsonView({ QuestionView.class, ReponseView.class, View.TestView1.class, CompetenceView1.class,
			QuestionOfTestView.class, CandidatRepView.class })
	private Long id;
	@JsonView({ QuestionView.class, ReponseView.class, View.TestView1.class, CompetenceView1.class,
			QuestionOfTestView.class, CandidatRepView.class })
	private String titre;
	@JsonView({ QuestionView.class, ReponseView.class, View.TestView1.class, CompetenceView1.class,
			CandidatRepView.class })
	private boolean reponseBol;
	@JsonView({ QuestionView.class, ReponseView.class, View.TestView1.class, CompetenceView1.class,
			CandidatRepView.class })
	@Column(columnDefinition = "TEXT")
	private String reponseText;
	@ManyToOne
	@JsonIgnore
//	@JsonView({CandidatRepView.class})	
	private Question question;
	@JsonIgnore
	@OneToMany(mappedBy = "reponse")
	private List<CandidatReponse> candidatReponses;

	public Reponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Reponse(Long id, String titre, boolean reponseBol, String reponseText, Question question) {
		super();
		this.id = id;
		this.titre = titre;
		this.reponseBol = reponseBol;
		this.reponseText = reponseText;
		this.question = question;
	}

	public Reponse(Question question) {
		super();
		this.question = question;
	}

	public Reponse(String reponseText, Question question) {
		super();
		this.reponseText = reponseText;
		this.question = question;
	}

	public Reponse(String titre, boolean reponseBol, Question question) {
		super();
		this.titre = titre;
		this.reponseBol = reponseBol;
		this.question = question;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public boolean isReponseBol() {
		return reponseBol;
	}

	public void setReponseBol(boolean reponseBol) {
		this.reponseBol = reponseBol;
	}

	public String getReponseText() {
		return reponseText;
	}

	public void setReponseText(String reponseText) {
		this.reponseText = reponseText;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		// TODO Auto-generated method stub
		return super.clone();
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public List<CandidatReponse> getCandidatReponses() {
		return candidatReponses;
	}

	public void setCandidatReponses(List<CandidatReponse> candidatReponses) {
		this.candidatReponses = candidatReponses;
	}

}
