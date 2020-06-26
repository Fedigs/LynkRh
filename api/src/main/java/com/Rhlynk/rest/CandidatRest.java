package com.Rhlynk.rest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
// cette classe permet de générer les entrées et sortie concernant le candidat en ce qui concerne l'application matching
//elle peut utiliser des méthodes CRUD tres déjà existantes pour la plateforme de test de compétence
import org.springframework.web.multipart.MultipartFile;

import com.SotutechTestException;
import com.View;
import com.View.CandidatCvView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Contrat;
import com.Rhlynk.entities.User;
import com.Rhlynk.dao.CandidatRepository;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Competence;
import com.Rhlynk.metier.ICandidat;
import com.Rhlynk.metier.IContrat;
import com.Rhlynk.metier.IFramework;
import com.Rhlynk.metier.ILangageProgrammation;
import com.Rhlynk.metier.ITypeContrat;
import com.Rhlynk.pojo.CandidatList;
import com.Rhlynk.pojo.CandidatPojo;
import com.Rhlynk.pojo.Critere;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "true")
public class CandidatRest {
	@Autowired
	private ICandidat iCandidat;
	
	@Autowired
	private ITypeContrat iTypeContrat;
	
	@Autowired
	private ILangageProgrammation iLangageProgrammation;
	
	@Autowired
	private IFramework iFramwork;
	
	@Autowired
	private CandidatRepository rep;

	@RequestMapping(value = "/candidat/inscription", method = RequestMethod.POST)

	public Object addCandidat(@RequestPart(required = true) @Valid CandidatPojo c, BindingResult br,
			@RequestPart(required = false) MultipartFile cv) {
		Map<String, Object> m = new HashMap<>();
		// if(c.getCvFile()==null){
		// m.put("error", true);
		// m.put("file","Le Cv est obligatoire");
		//
		// }
		if (br.hasErrors()) {
			m.put("error", true);
			for (FieldError fe : br.getFieldErrors()) {
				m.put(fe.getField(), fe.getDefaultMessage());
			}
			return m;
		}

		try {
			Candidat c1 = new Candidat(c);
			c1.setCreateAt(new Date());
			c1.setModifyAt(new Date());
			iCandidat.inscription(c1, cv);
			m.put("error", false);
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			m.put("error", true);
			m.put("candidat", e.getMessage());
		}
		return m;
	}

	@RequestMapping(value = "/candidat/profile", method = RequestMethod.POST)

	public Object editCandidat(@RequestBody @Valid CandidatPojo c, BindingResult br) {
		Map<String, Object> m = new HashMap<>();
		if (br.hasErrors()) {
			m.put("error", true);
			for (FieldError fe : br.getFieldErrors()) {
				m.put(fe.getField(), fe.getDefaultMessage());
			}
			return m;
		}

		try {

			iCandidat.editCandidat(c);
			m.put("error", false);
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			m.put("error", true);
			m.put("candidat", e.getMessage());
		}
		return m;
	}

	@JsonView({ View.CandidatView.class })
	@RequestMapping(value = "/candidats/search", method = RequestMethod.POST)
	public Object searchCandidat(@RequestBody Candidat critere,
			@RequestParam(name = "size", defaultValue = "10") int size,
			@RequestParam(name = "page", defaultValue = "0") int page) {
		return iCandidat.searchCandidat(critere, new PageRequest(page, size));
	}

	@JsonView({ View.CandidatProfileView.class })
	@RequestMapping(value = "/candidat/profile")
	public Object getCandidatProfile(Principal p) {
		return iCandidat.getCandidat(p.getName());
	}

	@JsonView({ CandidatCvView.class })
	@RequestMapping(value = "/candidat/cv")
	public Object candidatCv(@RequestParam(name = "username", defaultValue = "") String username) {
		return iCandidat.getCandidat(username);
	}

	@RequestMapping(value = "/candidat/contrats", method = RequestMethod.POST)
	public Object candidatContarts(@RequestBody List<Contrat> cs) {
		Map<String, Object> m = new HashMap<>();
		iCandidat.addContrat(cs);
		m.put("error", false);
		return m;
	}
	
	@JsonView({ CandidatCvView.class })
	@RequestMapping(value = "/candidat/matching", method = RequestMethod.POST)
	public Object candidatContarts(@RequestBody Critere c) {
		Map<String, Object> m = new HashMap<>();
		return iCandidat.matchingCandidat(c).getContent();
	}
	

//	***importante
	@JsonView({ CandidatCvView.class })
	@RequestMapping(value = "/candidats/sortScore", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Candidat> sortCandidats(@RequestBody List<String> candidats) {
		Critere c = new Critere();
		c.setLangages(iLangageProgrammation.findAll());
		c.setContrats(iTypeContrat.getTypeContrat());
		c.setFrameworks(iFramwork.getFramework());
		
		
//		try {
		List<Candidat> candidatFinal = new ArrayList<>();
			System.out.println("/*_*/"+candidats);
			for (String candidat : candidats) {
				System.out.println(candidat);
				candidatFinal.add(iCandidat.getCandidat(candidat));
			}
			System.out.println(candidatFinal);
//		} catch (Exception e) {
//			System.out.println(e);
//		}
			

//			
		System.out.println("/*_*/"+iCandidat.sortScore(c,candidatFinal));
		return iCandidat.sortScore(c,candidatFinal);
//		return null;
	}

	@RequestMapping(value = "/candidat/photo", method = RequestMethod.POST)
	public Object uploadPhoto(@RequestPart(required = false) MultipartFile photo, Principal p) {
		Map<String, Object> m = new HashMap<>();
		m.put("error", false);
		iCandidat.uploadPhoto(p.getName(), photo);
		return m;
	}

	@RequestMapping(value = "/candidat/upload/cv", method = RequestMethod.POST)
	public Object uploadCv(@RequestPart(required = false) MultipartFile cv, Principal p) {
		Map<String, Object> m = new HashMap<>();
		m.put("error", false);
		m.put("cv", iCandidat.uploadCv(p.getName(), cv));
		return m;
	}

	@RequestMapping(value = "/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageAsByteArray(@RequestParam(defaultValue = "") String photo) throws IOException {
		return iCandidat.displayImage(photo);
	}

	@RequestMapping(value = "/candidat/photo", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getCandidatProfileImage(Principal p) throws IOException {
		return iCandidat.displayProfileImage(p.getName());
	}

	@RequestMapping(value = "/candidat/photo", method = RequestMethod.DELETE)
	public Object deletePhoto(Principal p) {
		Map<String, Object> m = new HashMap<>();
		m.put("error", false);
		iCandidat.removePhoto(p.getName());
		return m;
	}

	@RequestMapping(value = "/candidat/download/cv", method = RequestMethod.GET)
	public void downloadCv(Principal p, HttpServletResponse response) {
		iCandidat.downloadCv(p.getName(), response);
	}

	@RequestMapping(value = "/cv", method = RequestMethod.GET)
	public void downloadCv2(@RequestParam(defaultValue = "") String username, HttpServletResponse response) {
		iCandidat.downloadCv(username, response);
	}

	@RequestMapping(value = "/candidat/note", method = RequestMethod.POST)
	public Object downloadCv2(@RequestParam(defaultValue = "") String username,
			@RequestParam(defaultValue = "") String note) {
		Map<String, Object> m = new HashMap<>();
		m.put("error", false);
		iCandidat.setNote(username, note);
		return m;
	}
}
