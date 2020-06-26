package com.Rhlynk.pojo;

import java.util.List;

import com.Rhlynk.entities.Reponse;

public class CorrectionReponse {
	private Reponse reponse;
	private boolean correct;

	public CorrectionReponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public boolean isCorrect() {
		return correct;
	}

	public void setCorrect(boolean correct) {
		this.correct = correct;
	}

	public CorrectionReponse(Reponse reponse, boolean correct) {
		super();
		this.reponse = reponse;
		this.correct = correct;
	}

	public Reponse getReponse() {
		return reponse;
	}

	public void setReponse(Reponse reponse) {
		this.reponse = reponse;
	}

}
