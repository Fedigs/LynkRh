package com.Rhlynk.metier;

import java.util.Date;
import java.util.List;

import com.SotutechTestException;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Entretien;

public interface IEntretien {
	public List<Entretien> findAll();
	public void addEntretien(List<Entretien> e) throws SotutechTestException;
	public List<Entretien> getEntretiens();
	public void sendEmail(Entretien entretien);
	public void sendEmailEntretienDefinitif(Candidat candidat,Entretien entretien);
	public Entretien save(Entretien entretien);
	public Entretien findOne(Long id);
	public List<Entretien> TrierParDate(List<Entretien> entretiens);
	public void deleteEntretien(Long id);
}
