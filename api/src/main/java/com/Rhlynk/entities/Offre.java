package com.Rhlynk.entities;

import java.io.Serializable;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import com.View;
import com.View.CandidatCvView;
import com.View.invitationTestView;
import com.View.CandidatInvitationView;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.Test;
import com.Rhlynk.entities.User;
import com.Rhlynk.pojo.OffrePojo;

@Entity
public class Offre implements Serializable {
	@Id
	@GeneratedValue
	@JsonView({ View.CvAnonyme.class,invitationTestView.class,View.offresView.class,View.AllOffers.class,View.EntretienView.class, View.offreInfoView.class, View.offreView.class, CandidatInvitationView.class })
	private Long id;
	@NotEmpty
	@JsonView({ View.CvAnonyme.class,invitationTestView.class,View.offresView.class,View.AllOffers.class,View.EntretienView.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private String titre;
	@ManyToMany(cascade = CascadeType.REMOVE)
	@JsonView({ View.offresView.class,View.AllOffers.class,View.EntretienView.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private List<LangageProgrammation> langages;
	@ManyToMany(cascade = CascadeType.REMOVE)
	@JsonView({ View.offresView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private List<Framework> frameworks;
	@OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, mappedBy = "id.offre")
	@JsonView({ View.offresView.class,View.AllOffers.class, View.offreView.class })
	private List<Invitation> invitations;
	@JsonView({ View.offresView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	@ManyToMany
	private List<TypeContrat> contrats;
	@ManyToOne
	@JsonView({ View.offresView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private Test test;
	@Column(columnDefinition = "TEXT", nullable = false)
	@NotEmpty
	@JsonView({ View.offresView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private String description;
	@ManyToOne
	@JsonView({ invitationTestView.class,View.offresView.class,View.EntretienView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class, CandidatInvitationView.class })
	private User proprietaire;
	@JsonView({ invitationTestView.class,View.offresView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class })
	@DateTimeFormat(pattern = "yyyy-dd-dd")
	@Temporal(TemporalType.DATE)
	private Date createAt;
	@JsonView({ View.offresView.class,View.AllOffers.class, View.offreView.class, View.offreInfoView.class })
	private int status;

	public Offre() {
		super();
		// TODO Auto-generated constructor stub
	}
	
//	*****add for test*****
//	public Offre(OffrePojo offrePojo) {
//		this.setTitre(offrePojo.getTitre());
//		this.setLangages(offrePojo.getLangages());
//		this.setContrats(offrePojo.getContrats());
//		this.setDescription(offrePojo.getDescription());
//		this.setFrameworks(offrePojo.getFrameworks());
//		this.setCreateAt(offrePojo.getCreateAt());
//		this.setProprietaire(offrePojo.getProprietaire());
////		this.setStatus(offrePojo.getStatus());
//	}

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

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
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

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public List<Invitation> getInvitations() {
		return invitations;
	}

	public void setInvitations(List<Invitation> invitations) {
		this.invitations = invitations;
	}
	

	@Override
	public String toString() {
		return "Offre [id=" + id + ", titre=" + titre + "]";
	}
	
	

}
