package com.Rhlynk.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.View.CandidatRepView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.CandidatReponse;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.InvitationId;
import com.Rhlynk.metier.ICandidatReponse;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class CandidatReponseRest {
	@Autowired
	private ICandidatReponse rep;
	@RequestMapping(value="/candidatReponse",method=RequestMethod.POST)
	public Object addReponse(@RequestBody List<CandidatReponse> reponses){
		Map<String,Object> m= new HashMap<>();
		rep.addReponse(reponses);
		m.put("error", false);
		return m;
	}
	@JsonView({CandidatRepView.class})	
	@RequestMapping(value="/candidatReponse")
	public Object getCandReponses(@RequestParam(defaultValue="") Long idOffre,@RequestParam(defaultValue="") String username){
	Invitation i= new Invitation();
	i.setId(new InvitationId());
	i.getId().setOffre(new Offre());
	i.getId().setCandidat(new Candidat());
	i.getId().getOffre().setId(idOffre);
	i.getId().getCandidat().setUsername(username);
	Object ob=rep.getCandidatreponse(i);
		return ob!=null?ob:new ArrayList();
	}
	@RequestMapping(value="/correction")
	public Object correction(@RequestParam(defaultValue="") Long id,@RequestParam(defaultValue="") boolean correcte,double score){
		Map m= new HashMap<>();
		rep.correction(id, correcte, score);
		m.put("error", false);
		return m;
	}
}
