package com.Rhlynk.pojo;

import com.View;
import com.fasterxml.jackson.annotation.JsonView;

public class CandReponseItem {
	@JsonView({ View.CandidatRepView.class })
	private Long id;
	@JsonView({ View.CandidatRepView.class })
	private String errors;
	@JsonView({ View.CandidatRepView.class })
	private String warnings;
	@JsonView({ View.CandidatRepView.class })
	private boolean reponseBol;
	@JsonView({ View.CandidatRepView.class })
	private String reponseText;
	@JsonView({ View.CandidatRepView.class })
	private boolean correcte;
	@JsonView({ View.CandidatRepView.class })
	private double score;

	public CandReponseItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CandReponseItem(Long id, String errors, String warnings, boolean reponseBol, String reponseText,
			boolean correcte, double score) {
		super();
		this.id = id;
		this.errors = errors;
		this.warnings = warnings;
		this.reponseBol = reponseBol;
		this.reponseText = reponseText;
		this.correcte = correcte;
		this.score = score;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public boolean isCorrecte() {
		return correcte;
	}

	public void setCorrecte(boolean correcte) {
		this.correcte = correcte;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

}
