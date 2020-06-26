package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.InvitationId;

public interface InvitationRepository extends JpaRepository<Invitation,InvitationId> {
	@Query("select i from Invitation i inner join i.id id where id.candidat=?1 ")
public List<Invitation> getCandidatInvitations(Candidat candidat);
	@Query("select i from Invitation i inner join i.id id where id.offre=?1 ")
	public List<Invitation> getOffreInvitations(Offre offre);
}
