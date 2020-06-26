package com.Rhlynk.pojo;

import java.util.List;

import com.View;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Question;

public class QuestionCandReponse {
	@JsonView({ View.CandidatRepView.class })
	private Question question;
	@JsonView({ View.CandidatRepView.class })
	private String duree;
	@JsonView({ View.CandidatRepView.class })
	private String type;
	@JsonView({ View.CandidatRepView.class })
	private List<CandReponseProjection> candReponseProjection;
	@JsonView({ View.CandidatRepView.class })
	private double score;

	public QuestionCandReponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public QuestionCandReponse(Question question, String duree, String type,
			List<CandReponseProjection> candReponseProjection, double score) {
		super();
		this.question = question;
		this.duree = duree;
		this.type = type;
		this.candReponseProjection = candReponseProjection;
		this.score = score;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public String getDuree() {
		return duree;
	}

	public void setDuree(String duree) {
		this.duree = duree;
	}

	public List<CandReponseProjection> getCandReponseProjection() {
		return candReponseProjection;
	}

	public void setCandReponseProjection(List<CandReponseProjection> candReponseProjection) {
		this.candReponseProjection = candReponseProjection;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

}
