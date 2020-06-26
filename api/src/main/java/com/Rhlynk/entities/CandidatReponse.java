package com.Rhlynk.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.View.CandidatRepView;
import com.fasterxml.jackson.annotation.JsonView;
@Entity
public class CandidatReponse {
@Id @GeneratedValue
private Long id;
@ManyToOne
private Invitation invitation;
@ManyToOne
private Question question;
private boolean reponseBol;
@ManyToOne()
private Reponse reponse;
private String type;
@Column(columnDefinition="TEXT")
private String reponseText;
private String duree;
private double score;
private String errors;
private String warnings;
private boolean correcte;
public CandidatReponse(Long id, Invitation invitation, Question question, boolean reponseBol, String reponseText,
		String duree, double score, String errors, String warnings) {
	super();
	this.id = id;
	this.invitation = invitation;
	this.question = question;
	this.reponseBol = reponseBol;
	this.reponseText = reponseText;
	this.duree = duree;
	this.score = score;
	this.errors = errors;
	this.warnings = warnings;
}
public CandidatReponse() {
	super();
	// TODO Auto-generated constructor stub
}
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Invitation getInvitation() {
	return invitation;
}
public void setInvitation(Invitation invitation) {
	this.invitation = invitation;
}
public Question getQuestion() {
	return question;
}
public void setQuestion(Question question) {
	this.question = question;
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
public String getDuree() {
	return duree;
}
public void setDuree(String duree) {
	this.duree = duree;
}
public double getScore() {
	return score;
}
public void setScore(double score) {
	this.score = score;
}
public String getErrors() {
	return errors;
}
public void setErrors(String errors) {
	this.errors = errors;
}
public String getWarnings() {
	return warnings;
}
public void setWarnings(String warnings) {
	this.warnings = warnings;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public Reponse getReponse() {
	return reponse;
}
public void setReponse(Reponse reponse) {
	this.reponse = reponse;
}
public boolean isCorrecte() {
	return correcte;
}
public void setCorrecte(boolean correcte) {
	this.correcte = correcte;
}


}
