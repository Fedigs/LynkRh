package com.Rhlynk.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.View;
import com.Rhlynk.entities.Candidat;
import com.View.invitationTestView;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Entretien {
	@Id
	@GeneratedValue
	@JsonView({View.Statut.class,View.CvAnonyme.class,View.EntretienView.class,invitationTestView.class})
	private Long id;
	@ManyToOne
	@JsonView({View.EntretienView.class})
	private Candidat candidat;
	@JsonView({View.EntretienView.class})
	private Date dateEntretien;
	@JsonView({View.Statut.class,View.EntretienView.class,invitationTestView.class,View.CvAnonyme.class})
	private String message;
	@JsonView({View.EntretienView.class,invitationTestView.class,View.CvAnonyme.class})
	private boolean invite = false;
	@JsonView({View.EntretienView.class,View.CvAnonyme.class})
	private boolean inviteDefinitif;
	@JsonView({View.Statut.class,View.CvAnonyme.class,invitationTestView.class})
	private boolean accepte;
	@JsonView({View.CvAnonyme.class})
	@OneToOne
	private Lieux lieux;
	@JsonView({View.EntretienView.class})
	private boolean vu;
	
	// chaque entretien peut appartient a un seul offre
	// chaque offre peut avoir plusieur entretien
	@ManyToOne
	@JsonView({View.EntretienView.class,invitationTestView.class,View.CvAnonyme.class})
	private Offre offre;
	
	public boolean isVu() {
		return vu;
	}

	public void setVu(boolean vu) {
		this.vu = vu;
	}
	
	
	public boolean getAccepte() {
		return accepte;
	}

	public void setAccepte(boolean accepte) {
		this.accepte = accepte;
	}

	public Lieux getLieux() {
		return lieux;
	}

	public void setLieux(Lieux lieux) {
		this.lieux = lieux;
	}

	public boolean getInviteDefinitif() {
		return inviteDefinitif;
	}

	public void setInviteDefinitif(boolean inviteDefinitif) {
		this.inviteDefinitif = inviteDefinitif;
	}

	public boolean getInvite() {
		return invite;
	}

	public void setInvite(boolean invite) {
		this.invite = invite;
	}

	
	
	
	// les getters et les setters
	public Offre getOffre() {
		return offre;
	}

	public void setOffre(Offre offre) {
		this.offre = offre;
	}

	public Entretien() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Candidat getCandidat() {
		return candidat;
	}

	public void setCandidat(Candidat candidat) {
		this.candidat = candidat;
	}

	public Date getDateEntretien() {
		return dateEntretien;
	}

	public void setDateEntretien(Date dateEntretien) {
		this.dateEntretien = dateEntretien;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Entretien [id=" + id + ", candidat=" + candidat + ", dateEntretien=" + dateEntretien + ", message="
				+ message + ", invite=" + invite + ", offre=" + offre + "]";
	}
	
	

}
