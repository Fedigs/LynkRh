package com.Rhlynk.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.View;
import com.View.BlocNoteView;
import com.View.CandidatCvView;
import com.View.CandidatInvitationView;
import com.View.CandidatInviter;
import com.View.DroitView;
import com.View.invitationTestView;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING, length = 2)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type", defaultImpl = Candidat.class)
@JsonSubTypes({
		@Type(value = Gestionnaire.class, name = "GESTIONNAIRE"),
		@Type(value = Entreprise.class, name = "ENTREPRISE"), 
		@Type(value = Candidat.class, name = "CANDIDAT") })
public class User implements Serializable {
	@NotEmpty
	@Id
	@JsonView({  View.EntretienView.class,View.UserView.class,View.CvAnonyme.class, View.CandidatView.class, CandidatCvView.class, BlocNoteView.class, DroitView.class,
			View.CandidatProfileView.class, View.offresView.class, View.offreView.class, View.offreInfoView.class,
			CandidatInvitationView.class,View.CandidatInviter.class, invitationTestView.class })
	private String username;
	@NotEmpty
	private String password;
	@JsonView({  View.EntretienView.class,View.UserView.class, View.offresView.class, View.offreInfoView.class })
	private boolean actived = true;
	@NotEmpty
	@JsonView({  View.EntretienView.class,View.UserView.class,View.CvAnonyme.class,View.CandidatInviter.class, View.CandidatView.class, CandidatCvView.class, BlocNoteView.class,
			View.CandidatProfileView.class, View.offresView.class, View.offreInfoView.class,
			CandidatInvitationView.class, invitationTestView.class })
	private String nom;
	@NotEmpty
	@JsonView({ View.UserView.class, View.CandidatView.class, CandidatCvView.class, BlocNoteView.class,
			View.CandidatProfileView.class, View.offreInfoView.class, invitationTestView.class })
	private String email;
	@NotEmpty
	@JsonView({  View.EntretienView.class,View.UserView.class, View.CandidatView.class, CandidatCvView.class, BlocNoteView.class,
			View.CandidatProfileView.class, View.offreInfoView.class, invitationTestView.class })
	private String tel;
	@NotEmpty
	@JsonView({  View.EntretienView.class,View.UserView.class, View.CandidatView.class, CandidatCvView.class, BlocNoteView.class,
			View.CandidatProfileView.class, View.offreInfoView.class, CandidatInvitationView.class,
			invitationTestView.class })
	private String adresse;
	@ManyToOne
	@JsonView({  View.EntretienView.class,View.UserView.class })
	private Role role;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String username, String password, boolean actived, String nom, String email, String tel, String adresse,
			Role role) {
		super();
		this.username = username;
		this.password = password;
		this.actived = actived;
		this.nom = nom;
		this.email = email;
		this.tel = tel;
		this.adresse = adresse;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActived() {
		return actived;
	}

	public void setActived(boolean actived) {
		this.actived = actived;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", actived=" + actived + ", nom=" + nom
				+ ", email=" + email + ", tel=" + tel + ", adresse=" + adresse + ", role=" + role + "]";
	}
	
	

}