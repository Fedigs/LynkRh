package com.Rhlynk.rest;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.View;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Entretien;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.Test;
import com.Rhlynk.metier.ICandidat;
import com.Rhlynk.metier.IEntretien;
import com.Rhlynk.metier.IInvitation;
import com.Rhlynk.metier.IOffre;
import com.Rhlynk.metier.IUser;
import com.Rhlynk.metier.InvitationImpl;
import com.Rhlynk.pojo.OffrePojo;
import com.Rhlynk.entities.User;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "true")
public class OffreRest {
	@Autowired
	private IOffre iOf;
	
	@Autowired
	private IInvitation invit;
	
	@Autowired
	private IUser iUser;
	
	@Autowired
	private ICandidat icandidat;
	
	@Autowired
	private IEntretien iEntretien;

	
	@RequestMapping(value = "/offre", method = RequestMethod.POST)
	public Object addOffre(@RequestBody @Valid Offre o, BindingResult br, Principal p) {
		Map<String, Object> m = new HashMap<>();
		if (br.hasErrors()) {
			m.put("error", true);
			for (FieldError fe : br.getFieldErrors()) {
				m.put(fe.getField(), fe.getDefaultMessage());
				return m;
			}
		}
//		if (o.getProprietaire() == null) {
//			User u = new User();
//			u.setUsername(p.getName());
//			o.setProprietaire(u);
//		}
		if(o.getTest() != null) {
			if(o.getTest().getId() == null) {
				o.setTest(null);
			}
//			Test test = new Test();	
//			test.setId((long)1);
//			o.getTest().setId(null);
//			o.setTest(test.getId());
		}
//		if(o.getInvitations() == null) {
//			System.out.println("---------------------invitation vide");
//		}
		
//		if() {
//			o.setInvitations(invitations.getOffreInvitation(o.getId()));
//		}
		
		
		try {
			if(o.getInvitations() != null) {
				System.out.println("invitations/*_*/"+o.getInvitations());
				System.out.println("offre invitation"+o.getInvitations());
				List<Invitation> invitations = new ArrayList<Invitation>();
				for (Invitation invitation: o.getInvitations()) {
					System.out.println("/*_*1/"+invitation.getId().getOffre());
					invitation.getId().setOffre(iOf.getOffre(invitation.getId().getOffre().getId()));
					invitation.getId().setCandidat(icandidat.getCandidat(invitation.getId().getCandidat().getUsername()));
					System.out.println("offre"+iOf.getOffre(invitation.getId().getOffre().getId()));
					invitations.add(invitation);
				}
				invit.save(invitations);
				o.setInvitations(invitations);
			}
		} catch (Exception e) {
			System.out.println("error");
		}
		
			
			
	
//		if( iOf.getOffre(o.getId()) != null ) {
//			Offre offre = iOf.getOffre(o.getId());
//			offre.setInvitations(o.getInvitations());
//			iOf.addOffre(offre);
//		} else {
//		}
		
			iOf.addOffre(o);
	
		m.put("error", false);
		return m;
	}
	
	
	@RequestMapping(value = "/updateOffre")
	public Offre updateOffre(@RequestBody @Valid Offre o) {
		return  iOf.editOffre(o);
	}
	
	@JsonView({ View.offresView.class })
	@RequestMapping(value = "/supprimerOffre",method=RequestMethod.POST)
	public Object supprimerOffre(@RequestParam(name="idOffre") Long idOffre,@RequestParam(name = "size", defaultValue = "10") int size,
			@RequestParam(name = "status", defaultValue = "0") int status,
			@RequestParam(name = "username", defaultValue = "") String username,
			@RequestParam(name = "titre", defaultValue = "") String titre,
			@RequestParam(name = "date", defaultValue = "null") String d,
			@RequestParam(name = "page", defaultValue = "0") int page,Principal pr) {
		System.out.println(idOffre);
		Offre offre=iOf.getOffre(idOffre);
		offre.setContrats(new ArrayList<>());
		offre.setFrameworks(new ArrayList<>());
		offre.setLangages(new ArrayList<>());
//		System.out.println("/*_*/"+iEntretien.findAll());
//		for(Entretien entretien: iEntretien.findAll()) {
//			
//			System.out.println(entretien.getOffre().getClass());
////			if(entretien.getOffre().getId().equals(idOffre)) {
////				System.out.println(entretien);
////			}	
//		}
//		
		
		for(Invitation invitation : offre.getInvitations()) {
			if(invitation.getId().getOffre().getId().equals(idOffre)) {
				invit.RemoveInvitation(invitation.getId());
			}
		}
		
		
//		for(Entretien entretien: iEntretien.findAll()) {
//			if(entretien.getOffre().getId().equals(idOffre)) {
////				entretien.setLieux(null);
////				entretien.setCandidat(null);
//				iEntretien.deleteEntretien(entretien.getId());
//			}
//		}
//		offre.setInvitations(new ArrayList<>());
		iOf.editOffre(offre);
//		System.out.println("invitation"+offre.getInvitations());
		iOf.deleteOffre(idOffre);
		return getOffres(size,status,username,titre,d,page,pr);
	}
	


	@JsonView({ View.offresView.class })
	@RequestMapping(value = "/offres")
	public Object getOffres(@RequestParam(name = "size", defaultValue = "10") int size,
			@RequestParam(name = "status", defaultValue = "0") int status,
			@RequestParam(name = "username", defaultValue = "") String username,
			@RequestParam(name = "titre", defaultValue = "") String titre,
			@RequestParam(name = "date", defaultValue = "null") String d,
			@RequestParam(name = "page", defaultValue = "0") int page,Principal pr) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		Date date;
		try {
			date = sdf.parse(d);
		} catch (ParseException e) {
			date = null;
		}
		
		User user = iUser.getUser(username);
		
//		if(user.getRole().equals("ENTREPRISE")) {
//			username = pr.getName();
//		}
//		String username1 ;
//		if( user.getRole().equals("ADMIN") ) {
//			username1 = "";
//		} else {
//			username1 = pr.getName();
//		}
		return iOf.getOffres(new PageRequest(page, size), status, username, titre, date);
	}

	@JsonView({ View.offreView.class })
	@RequestMapping(value = "/offre")
	public Object getOffre(@RequestParam(name = "id", defaultValue = "0") Long id) {
		return iOf.getOffre(id);
	}

	@JsonView({ View.offreInfoView.class })
	@RequestMapping(value = "/offre/info")
	public Object getInfoOffre(@RequestParam(name = "id", defaultValue = "0") Long id) {
		return iOf.getOffre(id);
	}

	@RequestMapping(value = "/offre/test")
	public Object updateOffreTest(@RequestParam(name = "id", defaultValue = "0") Long id,
			@RequestParam(name = "idTest", defaultValue = "0") Long idTest) {

		Map<String, Object> m = new HashMap<>();
		iOf.updateOffreTest(id, idTest);
		m.put("error", false);
		return m;
	}
}
