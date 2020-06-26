package com.Rhlynk.rest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SotutechTestException;
import com.View;
import com.View.CandidatInvitationView;
import com.View.InvitationView;
import com.View.invitationTestView;
import com.fasterxml.jackson.annotation.JsonView;


import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.User;
import com.Rhlynk.metier.IOffre;
import com.Rhlynk.metier.IUser;
import com.Rhlynk.config.EmailService;
import com.Rhlynk.config.Mail;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Entreprise;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.InvitationId;
import com.Rhlynk.metier.IInvitation;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class InvitationRest {
	@Autowired
	private IInvitation iInvitation;
	@Autowired
	private IOffre iO;
	
	@Autowired
	private IUser user;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
    private EmailService emailService;
	
    @RequestMapping(value="/invitation", method=RequestMethod.POST)
	public Object add(@RequestBody List<Invitation> i){
    	Map<String,Object> m= new HashMap<>();
			try {
				iInvitation.add(i);
			} catch (SotutechTestException e) {
				// TODO Auto-generated catch block
				m.put("invitation", e.getMessage());
			}
			m.put("error", false);
		return m;
	}
    @JsonView({InvitationView.class})	
    @RequestMapping(value="/invitations")
	public List<Invitation> getinvitations(@RequestParam(name="id",defaultValue="0") Long id) {
		return iInvitation.getinvitations(id);
	}
    @JsonView({CandidatInvitationView.class})	
    @RequestMapping(value="/invitations/candidat")
	public List<Invitation> getinvitationsCandidat(Principal p) {
    	for (Invitation invitation : iInvitation.candidatInvitations(p.getName())) {
    		System.out.println("invitations--------"+invitation.toString());
    	}
    	System.out.println("invitations--------"+iInvitation.candidatInvitations(p.getName()));
		return iInvitation.candidatInvitations(p.getName());
	}
    
    @RequestMapping(value="/envoyerEmailCandidats")
    public void envoyerEmailCandidats(@RequestBody String usernameCandidat) {
    	System.out.println("--------------*****"+usernameCandidat);
    	User candidat = user.getUserByUsername(usernameCandidat);
    	sendEmail(candidat);
    }
    
    public void sendEmail(User user) {
		// TODO Auto-generated method stub
		Mail mail = new Mail();
        mail.setFrom("seifallahmedini@gmail.com");
        mail.setTo(user.getEmail());
       
        mail.setSubject("invitation pour un test techinque en ligne");

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", user.getUsername());
        model.put("content","Bonjour, " + user.getNom() + " vous étes invité pour passer un test technique en ligne");
        model.put("location", "Manouba");
        mail.setModel(model);
        try {
        	emailService.sendSimpleMessage(mail);
        	System.out.println("mail envoyer  !!!!");
        } catch (Exception e) {
			// TODO: handle exception
        	System.out.println(e);
        }

	}
    
    @JsonView({invitationTestView.class})	
    @RequestMapping(value="/invitations/offre")
	public Page<Invitation> getinvitationsOffre(@RequestParam(name="id",defaultValue="0") Long id,
    		@RequestParam(name="size", defaultValue = "10") int size,
    		@RequestParam(name="page", defaultValue="0") int page) {
    	
    	
    		List<Invitation> listinvi = iInvitation.getOffreInvitation(id);
    	
    	Pageable pageable = new PageRequest(page, size);
    	int start = pageable.getOffset();
    	int end = (start + pageable.getPageSize()) > listinvi.size() ? listinvi.size() : (start + pageable.getPageSize());
    	Page<Invitation> invList = new PageImpl<Invitation>(listinvi.subList(start, end), pageable, listinvi.size());
		
    	return invList;
//    	return iInvitation.getOffreInvitation(id);
	}
    
    @JsonView({CandidatInvitationView.class})	
    @RequestMapping(value="/invitation")
	public Object getinvitationsCandidat(@RequestParam(name="idOffre",defaultValue="0") Long idOffre, @RequestParam(name="username",defaultValue="") String username) {
		InvitationId id= new InvitationId();
		id.setOffre(new Offre());
		id.setOffre(iO.getOffre(idOffre));
		id.setCandidat(new Candidat());
		id.getCandidat().setUsername(username);
    	return iInvitation.getInvitation(id);
	}

    @RequestMapping(value="/invitation/session", method=RequestMethod.POST)
	public Object setStart(@RequestBody InvitationId id,@RequestParam(name="duree") int duree){
    	Map<String,Object> m= new HashMap<>();
				iInvitation.sessionTest(id, duree);
			m.put("error", false);
		    return m;
	}
    @RequestMapping(value="/envoyerCandidats", method=RequestMethod.PUT) 
    public List<Invitation> envoyerCandidats(@RequestBody List<Invitation> invitation) {
    	 iInvitation.setEmail(invitation);
    	 return iInvitation.save(invitation);
    }
    
    @JsonView({View.CvAnonyme.class})
    @RequestMapping(value="/cvAnonymes", method=RequestMethod.GET)
    public List<Invitation> getCvAnonymes(@RequestParam(name="entreprise") String entreprise
//    		,@RequestParam(name="size", defaultValue = "10") int size,
//    		@RequestParam(name="page", defaultValue="0") int page 
    		) {
//    	System.out.println("tout les entreprises "+user.getEntreprises());
//    	System.out.println("entreprise "+entreprise);
//
//    	System.out.println("l'entreprise specific "+user.getEntreprise(entreprise));
    	System.out.println("  "+iO.getOffreByProprietaire(user.getEntreprise(entreprise)));
    	List<Invitation> invs = new ArrayList<>();
    	for (Offre of: iO.getOffreByProprietaire(user.getEntreprise(entreprise))) {
    		System.out.println("id offre"+of.getId());
    		
    		invs.addAll(iInvitation.getOffreInvitation(of.getId()));
    		
//    		if(  ) {
//    			
//    		}
    	}
    	System.out.print(" invitation "+invs);
    	List<Invitation> listinv = new ArrayList<>();
    	for (Invitation inv : invs) {
    		if(inv.isChecked()) {
    			listinv.add(inv);
    		}
    	}
    	
//    	Pageable pageable = new PageRequest(page, size);
//    	int start = pageable.getOffset();
//    	int end = (start + pageable.getPageSize()) > listinv.size() ? listinv.size() : (start + pageable.getPageSize());
//    	Page<Invitation> invList = new PageImpl<Invitation>(listinv.subList(start, end), pageable, listinv.size());
//    	
//    	Page<Invitation> invList = new PageImpl<Invitation>(listinv,,listinv.size());
    	return listinv;
    }
    
    
    @JsonView({View.CvAnonyme.class})
    @RequestMapping(value="/verifExistInvitation", method=RequestMethod.GET)
    public boolean vericationInvitation(@RequestParam(name="entreprise") String entreprise,
    					@RequestParam(name="idOffre") Long idOffre) {
    	System.out.println("  "+iO.getOffreByProprietaire(user.getEntreprise(entreprise)));
    	List<Invitation> invs = new ArrayList<>();
    	for (Offre of: iO.getOffreByProprietaire(user.getEntreprise(entreprise))) {
    		System.out.println("id offre"+of.getId());
    		
    		invs.addAll(iInvitation.getOffreInvitation(of.getId()));
    	}
    	System.out.print(" invitation "+invs);
    	List<Invitation> listinv = new ArrayList<>();
    	for (Invitation inv : invs) {
    		if(inv.isChecked()) {
    			listinv.add(inv);
    		}
    	}
    	for(Invitation invit : listinv) {
    		if(idOffre.equals( invit.getId().getOffre().getId() )) {
    			return true;
    		}
    	}
    	return false;
    }
    
    
    @JsonView({View.CvAnonyme.class})
    @RequestMapping(value="/cvAnonyme", method=RequestMethod.GET)
    public Page<Invitation> getCvAnonyme(@RequestParam(name="entreprise") String entreprise,
    		@RequestParam(name="idOffre") Long idOffre ,
    		@RequestParam(name="size", defaultValue = "10") int size,
    		@RequestParam(name="page", defaultValue="0") int page ) {
//    	System.out.println("  "+iO.getOffreByProprietaire(user.getEntreprise(entreprise)));
    	List<Invitation> invs = new ArrayList<>();
    	
    	for (Offre of: iO.getOffreByProprietaire(user.getEntreprise(entreprise))) {
//    		System.out.println("id offre"+of.getId());
    		invs.addAll(iInvitation.getOffreInvitation(of.getId()));
    	}
    	System.out.println(" invitation "+invs);
    	List<Invitation> listinv = new ArrayList<>();
    	
    	for (Invitation inv : invs) {
    		if(inv.isChecked()&&(inv.getId().getOffre().getId()).equals(idOffre)) {
    			listinv.add(inv);
    		}
    	}
    	
    	
//    	System.out.println("invitation final/*/*/*"+listinv);
    	
    	Pageable pageable = new PageRequest(page, size);
    	int start = pageable.getOffset();
    	int end = (start + pageable.getPageSize()) > listinv.size() ? listinv.size() : (start + pageable.getPageSize());
    	Page<Invitation> invList = new PageImpl<Invitation>(listinv.subList(start, end), pageable, listinv.size());
    
    	return invList;
    }
}
