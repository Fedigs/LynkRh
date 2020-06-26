package com.Rhlynk.metier;

import static org.mockito.Matchers.anyBoolean;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.apache.commons.collections.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.Rhlynk.config.EmailService;
import com.Rhlynk.config.Mail;
import com.Rhlynk.dao.CandidatRepository;
import com.Rhlynk.dao.InvitationRepository;
import com.Rhlynk.dao.OffreRepository;
import com.Rhlynk.entities.Offre;
import com.Rhlynk.dao.SpecificationDao;
import com.Rhlynk.dao.TestRepository;
import com.Rhlynk.dao.UserRepository;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.InvitationId;
import com.Rhlynk.entities.Test;
import com.Rhlynk.entities.User;

@Service
public class OffreImpl implements IOffre {
	@Autowired
	private OffreRepository ofRep;
	
	@Autowired
	private CandidatRepository candRep;

	@Autowired
	private UserRepository userRep;

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TestRepository testRep; 
	
	@Autowired
	private InvitationRepository invitationRep; 
	
	@Autowired
    private EmailService emailService;

	@Override
	public void addOffre(Offre o) {
		// TODO Auto-generated method stub
		if (o.getId() == null) {
			o.setCreateAt(new Date());
			o.setStatus(1);

		}
		
			List<User> users = new ArrayList<User>();
			users = userRep.findAll();
			Iterator<User> i1 = users.iterator();
		if(o.getId() == null) {
			while (i1.hasNext()) {
				User user = i1.next();
				if (user.getRole().getRole().equalsIgnoreCase("GESTIONNAIRE") && user.isActived() == true) {
					System.out.println("Gestionnaire" + user + "status" + user.isActived());
					sendEmail(user, o);
				}
			}
		} else {
			while (i1.hasNext()) {
				User user = i1.next();
				if (user.getRole().getRole().equalsIgnoreCase("GESTIONNAIRE") && user.isActived() == true) {
					System.out.println("Gestionnaire" + user + "status" + user.isActived());
//					sendEmailModification(user, o);
					sendEmailSpecial(user, o);
				}
			}
		}		
			

		if (o.getId() != null) {
			Offre o1 = ofRep.findOne(o.getId());
			for (Invitation i : o.getInvitations()) {
				if (o1 != null) {
					if (!o1.getInvitations().contains(i)) {
						// send mail
					}
				} else {
					// send mail
				}
			}
		}
		
		

		if (userRep.findByUsername(o.getProprietaire().getUsername()) != null) {
			o.setProprietaire(o.getProprietaire());
//			System.out.println("invitations-----"+o.getInvitations());
			
//			***
//			HashSet<Invitation> invitations = new HashSet<>(o.getInvitations());
//			***
			
//			Set empIds= new HashSet();//flag that keeps employee ids
//			  
//			  for(Iterator it=o.getInvitations().listIterator();it.hasNext();){
//				  Invitation emp=it.next();
//			   if(empIds.add(emp.getId())==false){//if found duplicate remove from the list
//			    it.remove();
//			   }
//			  }
//			  
//			  for(Invitation emp:o.getInvitations()){
//			   System.out.println(emp.getId());
//			   System.out.println(emp.getName());
//			  }

//			****
//			System.out.println("invitations-----"+invitations);
//			System.out.println("invitationsSize-----"+invitations.size());
//			***
				
			try {
				o.setTest(testRep.findOne(o.getTest().getId()));
				System.out.println("test***************----"+o.getTest());
			}catch (Exception e) {
				System.out.println("exception-----");
			}
				
			List<Invitation> invits = new ArrayList<Invitation>();
			// don't change very important			
			if(o.getInvitations() != null) {
				for(Invitation invitation: o.getInvitations()) {
					
					try {
						invitation.getId().setOffre(ofRep.findOne(o.getId()));
						invitation.getId().setCandidat(candRep.findOne(invitation.getId().getCandidat().getUsername()));
					} catch (Exception e) {
						System.out.println(" null exception");
					}
					System.out.println("----------"+invitation);
					invits.add(invitation);
					
					if( invitation.getId() == null) {
//						invitation.setId(new InvitationId());	
						System.out.println("test"+o.getTest());						
					} else {
						if( invitation.getId().getOffre() == null ) {
//							ofRep.findOne(o.getId()); ***important
							invitation.getId().setOffre(ofRep.findOne(o.getId()));
							System.out.println(o);
							System.out.println("test"+o.getTest());
//							ofRep.save(o);
						} 	
					}
					
				}
			} 
//			else {
//				o.setInvitations(new ArrayList<Invitation>());
//			}
			
			System.out.println("invits/*_*1/"+invits);
			for (Invitation invi : invits) {
				System.out.println("invi/*_*5/"+invi);
			} 
			
			try {
				invitationRep.getOffreInvitations(o);
				List<Invitation> invitations = new ArrayList<>();
				for (Invitation inv : invitationRep.getOffreInvitations(o)) {
					System.out.println("invi/*--*/"+inv);
					invitations.add(inv);
				}
				o.setInvitations(invitations);
				
			} catch(Exception e) {
				
			}
			
			
//			System.out.println("invitations-----"+o.getInvitations());
			System.out.println("id---------"+o.getId());
			ofRep.save(o);
		}

	}

	@Override
	public Offre editOffre(Offre o) {
		// TODO Auto-generated method stub
		System.out.print("------------"+o);
		return ofRep.save(o);
	}

	@Override
	public void deleteOffre(Long id) {
		// TODO Auto-generated method stub
		ofRep.delete(id);

	}

	@Override
	public Page<Offre> getOffres(Pageable p, int status, String username, String titre, Date date) {
		// TODO Auto-generated method stub
		return ofRep.findAll(
				Specifications.where(SpecificationDao.selonUsername(username)).and(SpecificationDao.selonStatus(status))
						.and(SpecificationDao.selonTitreOffre(titre)).and(SpecificationDao.selonDateCreation(date))

				, p);

	}

	@Override
	public Offre getOffre(Long id) {
		// TODO Auto-generated method stub
		return ofRep.findOne(id);
	}

	@Override
	public void updateOffreTest(Long id, Long idTest) {
		// TODO Auto-generated method stub
		Test t = new Test();
		t.setId(idTest);
		Offre o = ofRep.findOne(id);
		o.setTest(t);
		ofRep.save(o);

	}

	@Override
	public void sendEmail(User user,Offre offre) {
		// TODO Auto-generated method stub
		Mail mail = new Mail();
        mail.setFrom("seifallahmedini@gmail.com");
        mail.setTo(user.getEmail());
       
        mail.setSubject("Creation d'une nouvelle offre");

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", user.getUsername());
        model.put("content","Bonjour, " + user.getNom() + " une nouvelle offre est créer. titre de l'offre: "+offre.getTitre()+" par l'entreprise "+offre.getProprietaire().getUsername());
        model.put("location", "Manouba");
        mail.setModel(model);
        try {
        	emailService.sendSimpleMessage(mail);
        } catch (Exception e) {
			// TODO: handle exception
        	System.out.println(e);
        }

	}
	
	@Override
	public void sendEmailModification(User user,Offre offre) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(user.getEmail());
		mail.setFrom(/* env.getProperty("support.email") */ "seifallahmedini@gmail.com");
		mail.setSubject("Modification de l'offre "+offre.getTitre());
		mail.setText("Bonjour, " + user.getNom() + " l'offre: "+offre.getTitre()+" est modifier par l'entreprise "+offre.getProprietaire().getUsername());
		javaMailSender.send(mail);
	}
	
	@Override
	public void sendEmailSpecial(User user,Offre offre) {
		Mail mail = new Mail();
        mail.setFrom("seifallahmedini@gmail.com");
        mail.setTo(user.getEmail());
       
        mail.setSubject("Modification de l'offre "+offre.getTitre());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", user.getUsername());
        model.put("content", "Bonjour, " + user.getNom() + " l'offre: "+offre.getTitre()+" est modifier par l'entreprise "+offre.getProprietaire().getUsername());
        model.put("location", "Manouba");
        mail.setModel(model);
        try {
        	emailService.sendSimpleMessage(mail);
        } catch (Exception e) {
			// TODO: handle exception
        	System.out.println(e);
        }
	}

	@Override
	public List<Offre> getOffreByProprietaire(User proprietaire) {
		// TODO Auto-generated method stub
		return ofRep.findOffreByProprietaire(proprietaire);
	}

}
