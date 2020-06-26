package com.Rhlynk.pojo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.Rhlynk.entities.Candidat;


public  class CandidatList extends ArrayList<Candidat> {
	private List<Candidat> Candidats;
	
	

	public CandidatList() {
		super();
	}

	public List<Candidat> getCandidats() {
		return Candidats;
	}

	public void setCandidats(List<Candidat> candidats) {
		Candidats = candidats;
	}
}
