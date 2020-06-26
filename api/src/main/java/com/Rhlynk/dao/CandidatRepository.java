package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.Rhlynk.entities.TypeContrat;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Question;

public interface CandidatRepository extends JpaRepository<Candidat, String> ,JpaSpecificationExecutor<Candidat>{
public Candidat findByEmail(String email);
public List<Candidat> findAllOrderByModifyAt(Page p);
@Query("select  DISTINCT c from Candidat c inner join c.contrats ct where ct.typeContrat in ?1")
public List<Candidat> getcandidatByContrat(List<TypeContrat> tc);
}
