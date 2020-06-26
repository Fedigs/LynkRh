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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.SotutechTestException;
import com.View;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Entretien;
import com.Rhlynk.entities.Lieux;
import com.Rhlynk.entities.User;
import com.Rhlynk.metier.ICandidat;
import com.Rhlynk.metier.IEntretien;
import com.Rhlynk.metier.ILieux;
import com.Rhlynk.metier.IOffre;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;



@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class EntretienRest {
	
	
	//interface entretien
	@Autowired
	private IEntretien iEntr;
	
	@Autowired
	private ICandidat iCandidat;
	
	@Autowired
	private IOffre iOffre;
	
	@Autowired
	private ILieux iLieux;
	
	
	@JsonView({View.EntretienView.class})
	@RequestMapping(value="/entretien",method=RequestMethod.GET)
	public List<Entretien> getEntretiens(@RequestParam String idOffre) {
		List<Entretien> entretiens = new ArrayList<Entretien>();
		for (Entretien entr: iEntr.findAll()) {
			try {
				System.out.println("--------------"+entr.getOffre().getId());
				if( entr.getOffre().getId() == Long.valueOf(idOffre)) {
					entretiens.add(entr);
				}
			} catch(Exception e) {
				System.out.println(e);	
			}
			
		}
		return entretiens; 
	}

	
	@RequestMapping(value="/entretien",method=RequestMethod.POST)
	public Object addEntretien(@RequestBody List<Entretien> e) {
		Map<String,Object> m= new HashMap<>();
		try {
			iEntr.addEntretien(e);
			m.put("error", false);
		} catch (SotutechTestException e1) {
			// TODO Auto-generated catch block
			m.put("entretien",e1.getMessage());
		}
		return m;
	}
	
	
	@RequestMapping(value="/inviter",method=RequestMethod.POST)
	public Entretien inviter(@RequestBody Entretien entretien,
			@RequestParam(name="date" ,defaultValue = "null") String d,
			@RequestParam(name="lieu" ,defaultValue = "null" ) Long id) {
		Candidat candidat = iCandidat.getCandidat(entretien.getCandidat().getUsername());
		
		SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM d yyyy HH:mm:ss");
		Date date;
		try {
			date = sdf.parse(d.toString());
		} catch (ParseException e) {
			date = null;
		}
		entretien.setDateEntretien(date);
		entretien.setLieux(iLieux.getLieuxById(id));
		System.out.println("-************"+candidat);
		candidat.getEntretiens().add(entretien);
//		iCandidat.saveCandidat(candidat);
		try {
			iCandidat.addCandidat(candidat);
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("list des entretiens"+iCandidat.getCandidat(candidat.getUsername()).getEntretiens());
		iEntr.sendEmail(entretien);
		return iEntr.save(entretien);
	}

	@JsonView({View.EntretienView.class})
	@RequestMapping(value="/entretiens",method=RequestMethod.GET)
	public Page<Entretien> entretiens(
			@RequestParam(name="username",defaultValue="") String username,Principal principal,
			@RequestParam(name="valeur", defaultValue = "0") int valeur,
			@RequestParam(name="size", defaultValue = "7") int size,
			@RequestParam(name="page", defaultValue="0") int page) {
		System.out.println(principal.getName());
		List<Entretien> entretiens = new ArrayList<Entretien>();
			if(principal.getName().equals(username)) {
				if(valeur==0) {
				
					for (Entretien entr: iEntr.findAll()) {
						try {
							System.out.println("--------------"+entr.getCandidat().getUsername());
							if( entr.getCandidat().getUsername().equals(username)&& ((entr.getInvite()==true)||(entr.getInviteDefinitif()==true))) {
								
								entretiens.add(entr);
							}
						} catch(Exception e) {
							System.out.println(e);	
						}
						
					}
				} else if (valeur==1) {
					
					
					

					for (Entretien entr: iEntr.findAll()) {
						try {
							System.out.println("--------------"+entr.getCandidat().getUsername());
							if( entr.getCandidat().getUsername().equals(username)&& ((entr.getInvite()==true))) {
								
								entretiens.add(entr);
							}
						} catch(Exception e) {
							System.out.println(e);	
						}
						
					}
					
					
				} else {
					

					for (Entretien entr: iEntr.findAll()) {
						try {
							System.out.println("--------------"+entr.getCandidat().getUsername());
							if( entr.getCandidat().getUsername().equals(username)&& ((entr.getInviteDefinitif()==true))) {
								
								entretiens.add(entr);
							}
						} catch(Exception e) {
							System.out.println(e);	
						}
						
					}
					
				}
				entretiens=iEntr.TrierParDate(entretiens);
				
				Pageable pageable = new PageRequest(page, size);
			     int start = pageable.getOffset();
			     int end = (start + pageable.getPageSize()) > entretiens.size() ? entretiens.size() : (start + pageable.getPageSize());
			     Page<Entretien> entList = new PageImpl<Entretien>(entretiens.subList(start, end), pageable, entretiens.size());
			    
			     return entList;
				
				
				
			}
		// return entretiens;
		return null;
	}

	@JsonView({View.EntretienView.class})
	@RequestMapping(value="/saveEntretien",method=RequestMethod.POST)
	public Entretien SaveEntretien(@RequestBody Entretien entretien) {
		
		System.out.print(entretien);
		List<Entretien> entretiens = new ArrayList<Entretien>();
		for (Entretien entr: iEntr.findAll()) {
			try {
				System.out.println("--------------"+entr.getCandidat().getUsername());
				System.out.println(""+entr.getOffre().getId());
				if( (entr.getCandidat().getUsername().equals(entretien.getCandidat().getUsername())&& 
					entr.getOffre().getId().equals(entretien.getOffre().getId())) && ((entr.getInvite()==true)||(entr.getInviteDefinitif()==true))) {
					
					entr.setVu(true);
					iEntr.save(entretien);
					entretiens.add(entr);
				}
			} catch(Exception e) {
				System.out.println(e);	
			}
			
		}
		return entretien;
		
		
		
	}




	
	@JsonView({View.Lieux.class})
	@RequestMapping(value = "/initalisationLieux",method=RequestMethod.GET)
	public List<Lieux> initalisationLieux() {
		return iLieux.getLieux();
	}
	
	@JsonView({View.CandidatInviter.class})
	@RequestMapping(value = "/inviterEntretienDefinitif",method=RequestMethod.POST)
	public Candidat inviterEntretienDefinitifCandidat(@RequestParam(name="candidatUsername") String candidatUsername,
			@RequestParam(name="date" ,defaultValue = "null") String d,
			@RequestParam(name="lieu" ,defaultValue = "null" ) Long id,
			@RequestParam(name="idOffre" ,defaultValue= "null") Long idOffre,
			@RequestBody Entretien entretien) {
		Candidat candidat = iCandidat.getCandidat(candidatUsername);
		System.out.println("invitation-----------------"+candidat.getEmail());
//		Entretien entretien = new Entretien();
//		entretien.setCandidat(candidat);
//		entretien.setInvite(true);
		
		System.out.println("l'entretien"+entretien.getMessage());
		System.out.println("date"+d);
		SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM d yyyy HH:mm:ss");
		Date date;
		try {
			date = sdf.parse(d.toString());
		} catch (ParseException e) {
			date = null;
		}
		
		
		entretien.setOffre(iOffre.getOffre(idOffre));
		entretien.setDateEntretien(date);
		entretien.setCandidat(candidat);
		entretien.setInviteDefinitif(true);
		entretien.setLieux(iLieux.getLieuxById(id));
		
		System.out.println("date  "+entretien.getDateEntretien());
		System.out.println("entretien++++"+entretien);
		System.out.println("inviterDefinitif"+entretien.getInviteDefinitif());
		
		candidat.getEntretiens().add(entretien);
		try {
			iCandidat.addCandidat(candidat);
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		iEntr.save(entretien);
		
		
		boolean verif = false;
		try {
			iEntr.sendEmailEntretienDefinitif(candidat,entretien);
			verif = true;
		} catch (Exception e) {
			verif = false;
		}
		
		if(verif) {
			return candidat;
		}
		return null;
	}
	
	
	// ***important
	@JsonView({View.Statut.class})
	@RequestMapping(value = "/updateAccepteEntretien",method=RequestMethod.POST)
	public List<Entretien> updateAccepteEntretien(@RequestParam(name="idOffre") Long idOffre,
			@RequestBody String candidatUsername) {
//		System.out.println("candidat envoyer"+entertiens);
		System.out.println("idOffre envoyer"+idOffre);
		List<Entretien> entretiens = iCandidat.getCandidat(candidatUsername).getEntretiens();
		Entretien entretienFound;
		List<Entretien> entretiensReturn = new ArrayList<>();
		
		for (Entretien entretien: entretiens) {
			if( entretien.getOffre().getId().equals(idOffre) && entretien.getLieux() != null) {
				System.out.println("entretien offre"+entretien);
				System.out.println("lieux "+entretien.getLieux());
				System.out.println("entretien found/*_*/"+iEntr.findOne(entretien.getId()));
				entretienFound = iEntr.findOne(entretien.getId());
				entretienFound.setAccepte(true);
				entretiensReturn.add(entretienFound);
				iEntr.save(entretienFound);
			}	
		}
		return entretiensReturn;
	}
	
	
	
}
