package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.User;

public interface OffreRepository extends JpaRepository<Offre, Long>,JpaSpecificationExecutor<Offre> {
public Page<Offre> findAllByOrderByCreateAtDesc(Pageable p);
public Page<Offre> findStatusByOrderByCreateAtDesc(Pageable p,int status);
public Page<Offre> findStatusAndProprietaireByOrderByCreateAtDesc(Pageable p,int status,User u);
public Page<Offre> findProprietaireByOrderByCreateAtDesc(Pageable p,User u);
public List<Offre> findOffreByProprietaire(User proprietaire);
}
