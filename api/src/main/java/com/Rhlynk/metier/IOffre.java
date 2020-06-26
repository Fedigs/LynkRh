package com.Rhlynk.metier;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.SotutechTestException;
import com.Rhlynk.entities.Entretien;
import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.User;

public interface IOffre {
public void addOffre(Offre o) ;
public Offre editOffre(Offre o);
public void deleteOffre(Long id);
public Page<Offre> getOffres(Pageable p,int status, String username,String titre,Date date);
public Offre getOffre(Long id);
public void updateOffreTest(Long id,Long idTest);
public void sendEmail(User user, Offre offre);
public void sendEmailModification(User user,Offre offre);
public void sendEmailSpecial(User user,Offre offre);
public List<Offre> getOffreByProprietaire(User proprietaire);
}
