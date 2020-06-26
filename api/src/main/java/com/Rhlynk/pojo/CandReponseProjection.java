package com.Rhlynk.pojo;

import com.View;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Reponse;

public class CandReponseProjection {
	@JsonView({ View.CandidatRepView.class })
	private CandReponseItem candReponseItem;
	@JsonView({ View.CandidatRepView.class })
	private Reponse reponse;

	public CandReponseProjection(CandReponseItem candReponseItem, Reponse reponse) {
		super();
		this.candReponseItem = candReponseItem;
		this.reponse = reponse;
	}

	public CandReponseProjection() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CandReponseItem getCandReponseItem() {
		return candReponseItem;
	}

	public void setCandReponseItem(CandReponseItem candReponseItem) {
		this.candReponseItem = candReponseItem;
	}

	public Reponse getReponse() {
		return reponse;
	}

	public void setReponse(Reponse reponse) {
		this.reponse = reponse;
	}

}
