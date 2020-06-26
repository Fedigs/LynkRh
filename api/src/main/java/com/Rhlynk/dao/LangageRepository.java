package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Rhlynk.entities.Langage;

public interface LangageRepository extends JpaRepository<Langage, Long> {
@Query(value="select l.id,l.nom,compiler_args,"
		+ " default_text,numero_langage,l.description,numbre_of_question,COUNT(numbre_of_question) from langage l LEFT JOIN question q ON l.id=q.langage_id GROUP BY l.id ",nativeQuery=true)
public List<Langage> numberOfQuestionForLangage();
}
