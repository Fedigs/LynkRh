package com.Rhlynk.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;

import com.View.CandidatInvitationView;
import com.View.invitationTestView;
import com.fasterxml.jackson.annotation.JsonView;
import com.View;
import com.Rhlynk.entities.Offre;

@Embeddable
public class InvitationId implements Serializable {
@ManyToOne(fetch=FetchType.EAGER)
@JsonView({View.CvAnonyme.class,invitationTestView.class,CandidatInvitationView.class})	
private Offre offre;
@ManyToOne
@JsonView({View.CvAnonyme.class,View.offreView.class,CandidatInvitationView.class,invitationTestView.class})	
private Candidat candidat;

public InvitationId() {
	super();
	// TODO Auto-generated constructor stub
}
public Offre getOffre() {
	return offre;
}
public void setOffre(Offre offre) {
	this.offre = offre;
}
public Candidat getCandidat() {
	return candidat;
}
public void setCandidat(Candidat candidat) {
	this.candidat = candidat;
}





@Override
public String toString() {
	return "InvitationId [offre=" + offre + ", candidat=" + candidat + "]";
}



}
