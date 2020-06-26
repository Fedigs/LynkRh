package com.Rhlynk.metier;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.entities.Offre;
import com.Rhlynk.dao.InvitationRepository;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.InvitationId;

@Service
public class InvitationImpl implements IInvitation {
	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private InvitationRepository invRep;

	@Override
	public void add(List<Invitation> i) throws SotutechTestException {
		// TODO Auto-generated method stub
		invRep.save(i);
	}

	@Override
	public void setInvitation(Invitation i) throws SotutechTestException {
		// TODO Auto-generated method stub

	}
	
	@Override
	public void RemoveInvitation(InvitationId id) {
		invRep.delete(id);
	}

	@Override
	public void deleteInvitation(Long id) throws SotutechTestException {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Invitation> getinvitations(long idC) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Invitation> candidatInvitations(String username) {
		// TODO Auto-generated method stub
		Candidat c = new Candidat();
		c.setUsername(username);
		return invRep.getCandidatInvitations(c);
	}

	@Override
	public Invitation getInvitation(InvitationId id) {
		// TODO Auto-generated method stub
		Invitation i = invRep.findOne(id);
		System.out.println(i.getId().getOffre().getTest());
		return i;
	}

	@Override
	public void setStart(boolean start, InvitationId id) {
		// TODO Auto-generated method stub
		Invitation i = invRep.findOne(id);
		i.setStart(start);
		invRep.save(i);
	}

	@Override
	public void sessionTest(InvitationId id, int duree) {
		// TODO Auto-generated method stub
		Invitation i = invRep.findOne(id);
		if (i != null) {
			i.setStart(true);
			invRep.save(i);
		}

		Thread th = new Thread(new Runnable() {

			@Override
			public void run() {
				try {
					Thread.sleep(duree * 1000);
					i.setEnd(true);
					invRep.save(i);
					System.out.println("test terminé");
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		});
		th.start();

	}
	@Override
	public void setEmail(List<Invitation> invitation) {
		//invitation.save();
		
			String email=invitation.get(0).getId().getOffre().getProprietaire().getEmail();
			String titreOffre=invitation.get(0).getId().getOffre().getTitre();
			sendEmail(email,titreOffre,invitation.size());
		
		
	}
	@Override
	public void sendEmail(String email,String titreOffre,int n) throws MailException {
		// TODO Auto-generated method stub

		// sending an email
		String msg;
		if(n==1) {
			msg="Nous vous informons que "+n+" candidat a été trouvé pour l'offre "+titreOffre;
		}
		else {
			msg="Nous vous informons que "+n+" candidats ont été trouvés pour l'offre "+titreOffre;
		}
		SimpleMailMessage mail = new SimpleMailMessage();

		mail.setTo(email);
		mail.setFrom("sotutechtest@gmail.com");
		mail.setSubject("Information sur l'offre");
		
		mail.setText(msg);
		
		
		javaMailSender.send(mail); 
		
		
	}

	@Override
	public List<Invitation> save(List<Invitation> invitation) {
		// TODO Auto-generated method stub
		
		return invRep.save(invitation);
	}

	@Override
	public List<Invitation> getOffreInvitation(Long idOffre) {
		// TODO Auto-generated method stub
		Offre offre = new Offre();
		offre.setId(idOffre);

		return invRep.getOffreInvitations(offre);
	}

}
