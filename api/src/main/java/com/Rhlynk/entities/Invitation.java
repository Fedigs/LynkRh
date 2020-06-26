package com.Rhlynk.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.View;
import com.View.CandidatCvView;
import com.View.CandidatInvitationView;
import com.View.InvitationView;
import com.View.invitationTestView;
import com.View.offreView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Offre;
@Entity
public class Invitation implements Serializable{
	@EmbeddedId
	@JsonView({View.CvAnonyme.class,View.offreView.class,CandidatInvitationView.class,invitationTestView.class})
	private InvitationId id;
	@JsonView({View.offreView.class,CandidatInvitationView.class,invitationTestView.class})
	private boolean invite;
	@JsonView({View.offreView.class,CandidatInvitationView.class,invitationTestView.class})
	private boolean start;
	@JsonView({View.offreView.class,CandidatInvitationView.class,invitationTestView.class})
	private boolean see;

	@JsonView({invitationTestView.class, View.offreView.class})
	private boolean end=false;
	
	@JsonView({offreView.class,CandidatInvitationView.class,invitationTestView.class})
	private boolean checked;
	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
	
	public Invitation() {
		// TODO Auto-generated constructor stub
	}
	
	public InvitationId getId() {
		return id;
	}


	public void setId(InvitationId id) {
		this.id = id;
	}


	public boolean isInvite() {
		return invite;
	}

	public void setInvite(boolean invite) {
		this.invite = invite;
	}

	public boolean isStart() {
		return start;
	}

	public void setStart(boolean start) {
		this.start = start;
	}

	public boolean isSee() {
		return see;
	}

	public void setSee(boolean see) {
		this.see = see;
	}

	public boolean isEnd() {
		return end;
	}

	public void setEnd(boolean end) {
		this.end = end;
	}
	
	
	

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if(obj instanceof Invitation){
			if(((Invitation) obj).getId()==id){
				return true;
			}
			return false;
		}
		return false;
	}
	
	
	
	
//	@Override
//	public int hashCode() {
//		// TODO Auto-generated method stub
//		Long l = (this.id.getOffre().getId());
//		int idOffre = 0;
//		try {
//			idOffre = Integer.parseInt(" "+l);
//		} catch (NumberFormatException ex) {
//			System.out.println("error");
//		}
//		System.out.println("---"+idOffre);
//		int intCand = 0;
//		try {
//			 intCand = Integer.parseInt(this.id.getCandidat().getNom());
//		} catch (NumberFormatException ex) {
//			System.out.println("error");
//		}
//		System.out.println("---cand"+intCand);	
//		return idOffre;
//	}

	@Override
	public String toString() {
		return "Invitation [id=" + id + ", invite=" + invite + ", start=" + start + ", see=" + see + ", end=" + end
				+ "]";
	}

	

}
