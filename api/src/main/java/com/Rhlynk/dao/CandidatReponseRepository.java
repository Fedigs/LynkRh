package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.CandidatReponse;
import com.Rhlynk.entities.Invitation;

public interface CandidatReponseRepository extends JpaRepository<CandidatReponse, Long> {
public List<CandidatReponse>findByInvitation(Invitation invitation);
}
