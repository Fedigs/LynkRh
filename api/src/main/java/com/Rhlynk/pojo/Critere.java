package com.Rhlynk.pojo;

import java.util.List;

import com.Rhlynk.entities.Framework;
import com.Rhlynk.entities.LangageProgrammation;
import com.Rhlynk.entities.TypeContrat;

public class Critere {
	private List<LangageProgrammation> langages;
	private List<Framework> frameworks;
	private List<TypeContrat> contrats;
	private int size;

	public Critere() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<LangageProgrammation> getLangages() {
		return langages;
	}

	public void setLangages(List<LangageProgrammation> langages) {
		this.langages = langages;
	}

	public List<Framework> getFrameworks() {
		return frameworks;
	}

	public void setFrameworks(List<Framework> frameworks) {
		this.frameworks = frameworks;
	}

	public List<TypeContrat> getContrats() {
		return contrats;
	}

	public void setContrats(List<TypeContrat> contrats) {
		this.contrats = contrats;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

}
