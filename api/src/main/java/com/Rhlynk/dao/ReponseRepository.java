package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Reponse;

public interface ReponseRepository extends JpaRepository<Reponse, Long>{
public List<Reponse> findByQuestion(Question q);
}
