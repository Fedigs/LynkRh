package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Rhlynk.entities.Competence;

public interface CompetenceRepository extends JpaRepository<Competence, Long> {
@Query("select c from Competence c inner join c.langage l where l.id=?1")
	public List<Competence> findByLangage(Long idL);
@Query("select c from Competence c inner join c.framework f where f.id=?1")
public List<Competence> findByFramework(Long idF);
@Query("select c from Competence c inner join c.candidat c where c.username=?1")
public List<Competence> findByCandidat(String u);
}
