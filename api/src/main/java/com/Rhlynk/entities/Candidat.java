package com.Rhlynk.entities;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

import com.View;
import com.View.BlocNoteView;
import com.View.CandidatCvView;
import com.View.CandidatInvitationView;
import com.View.invitationTestView;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.Rhlynk.entities.Competence;
import com.Rhlynk.entities.Contrat;
import com.Rhlynk.entities.Entretien;
import com.Rhlynk.pojo.CandidatPojo;

@Entity
@DiscriminatorValue("C")
public class Candidat extends User implements Comparator<Candidat> {
	@JsonView({ View.CvAnonyme.class,View.UserView.class, View.CandidatView.class, CandidatCvView.class, BlocNoteView.class,
			View.CandidatProfileView.class, invitationTestView.class })
	private String prenom;
	private Date dateNaissance;
	@Column(columnDefinition = " boolean default '0'")
	private boolean invite = false;
	@JsonView({ View.CandidatView.class, CandidatCvView.class, View.CandidatProfileView.class })
	private String cvUrl;
	@JsonView({ View.CandidatView.class, CandidatCvView.class })
	private Date createAt;
	@JsonView({ View.CandidatView.class, CandidatCvView.class })
	private Date modifyAt;
	@OneToMany(cascade = CascadeType.REMOVE)
	@JsonView({ View.CandidatView.class,View.CvAnonyme.class,CandidatInvitationView.class,invitationTestView.class, CandidatCvView.class })
	private List<Entretien> entretiens;
	@JsonView({ View.CvAnonyme.class,View.CandidatProfileView.class, CandidatCvView.class })
	@OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Competence> competences;
	@JsonView({ View.CvAnonyme.class,View.CandidatView.class, CandidatCvView.class, View.CandidatProfileView.class })
	@OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Contrat> contrats;
	@OneToMany()
	private List<Invitation> invitations;
	@JsonView({ View.CvAnonyme.class,CandidatCvView.class })
	private double score;
	@JsonView({ View.CandidatView.class, CandidatCvView.class, View.CandidatProfileView.class,
			invitationTestView.class })
	private String photoUrl;
	@JsonView({ View.CandidatView.class, CandidatCvView.class, View.CandidatProfileView.class })
	private String note;

	public Candidat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Candidat(String username, String password, boolean actived, String nom, String email, String tel,
			String adresse, Role role, String prenom, Date dateNaissance) {
		super(username, password, actived, nom, email, tel, adresse, role);
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public boolean isInvite() {
		return invite;
	}

	public void setInvite(boolean invite) {
		this.invite = invite;
	}

	public String getCvUrl() {
		return cvUrl;
	}

	public void setCvUrl(String cvUrl) {
		this.cvUrl = cvUrl;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public Date getModifyAt() {
		return modifyAt;
	}

	public void setModifyAt(Date modifyAt) {
		this.modifyAt = modifyAt;
	}

	public List<Entretien> getEntretiens() {
		return entretiens;
	}

	public void setEntretiens(List<Entretien> entretiens) {
		this.entretiens = entretiens;
	}

	public List<Invitation> getInvitations() {
		return invitations;
	}

	public void setInvitations(List<Invitation> invitations) {
		this.invitations = invitations;
	}

	public List<Competence> getCompetences() {
		return competences;
	}

	public void setCompetences(List<Competence> competences) {
		this.competences.clear();
		this.competences.addAll(competences);
	}

	public List<Contrat> getContrats() {
		return contrats;
	}

	public void setContrats(List<Contrat> contrats) {
		this.contrats.clear();
		this.contrats.addAll(contrats);
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Candidat(CandidatPojo c) {
		this.setUsername(c.getUsername());
		this.setPassword(c.getPassword());
		this.setNom(c.getNom());
		this.setPrenom(c.getPrenom());
		this.setEmail(c.getEmail());
		this.setTel(c.getTel());
		this.setAdresse(c.getAdresse());
	}

	public void setCandidat(CandidatPojo c) {
		this.setUsername(c.getUsername());
		this.setPassword(c.getPassword());
		this.setNom(c.getNom());
		this.setPrenom(c.getPrenom());
		this.setEmail(c.getEmail());
		this.setTel(c.getTel());
		this.setAdresse(c.getAdresse());
	}

	@Override
	public int compare(Candidat o1, Candidat o2) {
		// TODO Auto-generated method stub
		return (int) (o1.getScore() - o2.getScore());
	}
	
	
	
}