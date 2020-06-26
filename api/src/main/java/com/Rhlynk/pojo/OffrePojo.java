package com.Rhlynk.pojo;

import java.util.Date;
import java.util.List;

import org.hibernate.validator.constraints.NotEmpty;

import com.Rhlynk.entities.Framework;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.LangageProgrammation;

import com.Rhlynk.entities.TypeContrat;
import com.Rhlynk.entities.User;


public class OffrePojo {
	
	@NotEmpty
	private String titre;
	@NotEmpty
	private List<LangageProgrammation> langages;
	@NotEmpty
	private List<Framework> frameworks;
	@NotEmpty
	private List<Invitation> invitations;
	@NotEmpty
	private List<TypeContrat> contrats;
	@NotEmpty
	private String description;
//	@NotEmpty
	private User proprietaire;
	@NotEmpty
	private Date createAt;


	

	public OffrePojo() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public OffrePojo(String titre, List<LangageProgrammation> langages, List<Framework> frameworks,
			List<Invitation> invitations, List<TypeContrat> contrats, String description, User proprietaire,
			Date createAt) {
		super();
		this.titre = titre;
		this.langages = langages;
		this.frameworks = frameworks;
		this.invitations = invitations;
		this.contrats = contrats;
		this.description = description;
		this.proprietaire = proprietaire;
		this.createAt = createAt;
	}



	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
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


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getProprietaire() {
		return proprietaire;
	}

	public void setProprietaire(User proprietaire) {
		this.proprietaire = proprietaire;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public List<TypeContrat> getContrats() {
		return contrats;
	}

	public void setContrats(List<TypeContrat> contrats) {
		this.contrats = contrats;
	}

//	public int getStatus() {
//		return status;
//	}
//
//	public void setStatus(int status) {
//		this.status = status;
//	}

	public List<Invitation> getInvitations() {
		return invitations;
	}

	public void setInvitations(List<Invitation> invitations) {
		this.invitations = invitations;
	}

	@Override
	public String toString() {
		return "Offre [  titre=" + titre + ", langages=" + langages + ", frameworks=" + frameworks
				+ ", invitations=" + invitations + ", contrats=" + contrats + ", description="
				+ description + ", proprietaire=" + proprietaire + ", createAt=" + createAt  
				+ "]";
	}
}
