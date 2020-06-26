package com.Rhlynk.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SotutechTestException;
import com.View;
import com.View.CompetenceView1;
import com.View.initValuesView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Competence;
import com.Rhlynk.metier.ICompetence;


@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class CompetenceRest {
	@Autowired
	private ICompetence iComp;
	@RequestMapping(value="/competence/candidat",method=RequestMethod.POST)
	public Object addCompetences(@RequestBody List<Competence> competences){
		Map<Object, Object> m= new HashMap<>();
		iComp.addCompetences(competences);
		m.put("error",false);
		return m;
	}
	
	@JsonView({View.CompetenceView2.class})
	@RequestMapping(value="/competences")
	public Object getCompetences(){

		return iComp.getCompetences();
	}
	@RequestMapping(value="/competence",method=RequestMethod.DELETE)
	public Object deleteCompetence(@RequestParam(name="id",defaultValue="0")  Long id,String type)  {
		Map<Object, Object> m= new HashMap<>();
		iComp.deleteCompetence(id,type);
		m.put("error", false);
		return m;
	}
	// pour ajouter une compétence coté admin cette compétence peut etre langage ou framework c'est le type qui fait la difference
	// d'ou l'utilisation d'un Pojo compétence
	@RequestMapping(value="/competence",method=RequestMethod.POST)
	public Object addCompetence(@RequestBody com.Rhlynk.pojo.Competence c)  {
		Map<Object, Object> m= new HashMap<>();

		try {
			iComp.addCompetence(c);
			m.put("error", false);
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			m.put("error", true);
			m.put("competence", e.getMessage());
		}
		return m;
	}
	// pour modifier une compétence coté admin cette compétence peut etre langage ou framework c'est le type qui fait la difference
	// d'ou l'utilisation d'un Pojo compétence 
	@RequestMapping(value="/competence",method=RequestMethod.PUT)
	public Object editCompetence(@RequestBody com.Rhlynk.pojo.Competence c)  {
		Map<Object, Object> m= new HashMap<>();

		try {
			iComp.editCompetence(c);
			m.put("error", false);
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			m.put("error", true);
			m.put("competence", e.getMessage());
		}
		return m;
	}
	//c est pour récupere les experiences, niveaux, langages et framework  dans la base de données afin d'afficher dans le profile du candidat
	@JsonView({initValuesView.class})
	@RequestMapping(value="/profile/initValues")
	public Object getInitValues(){
		 return iComp.getInitValues();
	 }
	
}
