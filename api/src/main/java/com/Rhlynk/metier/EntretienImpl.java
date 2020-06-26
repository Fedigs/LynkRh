package com.Rhlynk.metier;

import java.util.Date;
import java.util.List;
import java.util.Comparator;
import java.util.Scanner;

import org.hibernate.cfg.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.dao.IEntretienRepository;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Entretien;
import com.Rhlynk.entities.User;

@Service
public class EntretienImpl implements IEntretien {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	
	
	@Autowired
	private IEntretienRepository entRep;
	
	@Override
	public List<Entretien> findAll() {
		return entRep.findAll(); 
	}
	

	@Override
	public void addEntretien(List<Entretien> entre) throws SotutechTestException {
		// TODO Auto-generated method stub
		for (Entretien e : entre) {
			if (e.getDateEntretien() == null)
				throw new SotutechTestException("Date", "La date de l'entretien est obligatoire ");
			if (e.getDateEntretien().before(new Date()))
				throw new SotutechTestException("Date", "La date renseignée est depassée");
			if (e.getCandidat() == null)
				throw new SotutechTestException("Candidat", "Le candidat est absent");
		}
		entRep.save(entre);
	}

	@Override
	public List<Entretien> getEntretiens() {
		// TODO Auto-generated method stub
		return entRep.findAll();
	}

	@Override
	public void sendEmail(Entretien entretien) throws MailException {
		// TODO Auto-generated method stub

		// sending an email
		SimpleMailMessage mail = new SimpleMailMessage();

		mail.setTo(entretien.getCandidat().getEmail());
		mail.setFrom(/*env.getProperty("support.email")*/ "seifallahmedini@gmail.com");
		mail.setSubject("Invitation Pour Un Entretien Prelminiaire");
		mail.setText(" "+entretien.getMessage());
		javaMailSender.send(mail);
	}
	
	@Override
	public void sendEmailEntretienDefinitif(Candidat candidat,Entretien entretien) throws MailException {
		// sending an email
		SimpleMailMessage mail = new SimpleMailMessage();

		mail.setTo(candidat.getEmail());
		mail.setFrom(/*env.getProperty("support.email")*/ "seifallahmedini@gmail.com");
		mail.setSubject("Invitation Pour Un Entretien Definitif");
		mail.setText(entretien.getMessage() + " Date: " + entretien.getDateEntretien() + ", à "+entretien.getLieux().getNom());
		javaMailSender.send(mail); 
	}

	@Override
	public Entretien save(Entretien entretien) {
		// TODO Auto-generated method stub
		return entRep.save(entretien);
	}

	@Override
	public List<Entretien> TrierParDate(List<Entretien> entretiens) {
		// TODO Auto-generated method stub
		entretiens.sort(new Comparator<Entretien>() {
				@Override
				public int compare(Entretien e1, Entretien e2) {
					// Order ascending.
					int ret = e1.getDateEntretien().compareTo(e2.getDateEntretien());
					return ret;
				}
			}
		);	
		return entretiens;
	}


	@Override
	public Entretien findOne(Long id) {
		// TODO Auto-generated method stub
		return entRep.findOne(id);
	}
	
	@Override
	public void deleteEntretien(Long id) {
		entRep.delete(id);
	}

}
