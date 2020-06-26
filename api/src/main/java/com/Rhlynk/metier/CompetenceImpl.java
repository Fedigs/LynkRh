package com.Rhlynk.metier;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SotutechTestException;
import com.Rhlynk.dao.CompetenceRepository;
import com.Rhlynk.dao.ExperienceRepository;
import com.Rhlynk.dao.FrameworkRep;
import com.Rhlynk.dao.LangageProgRep;
import com.Rhlynk.dao.NiveauRepository;
import com.Rhlynk.dao.TypeContratRepository;
import com.Rhlynk.entities.Competence;
import com.Rhlynk.entities.Experience;
import com.Rhlynk.entities.Framework;
import com.Rhlynk.entities.LangageProgrammation;
import com.Rhlynk.entities.Niveau;
import com.Rhlynk.dao.CandidatRepository;
import com.Rhlynk.entities.Candidat;


@Service
public class CompetenceImpl implements ICompetence{
@Autowired
private CompetenceRepository rep;
@Autowired
private LangageProgRep langRep;
@Autowired
private FrameworkRep fRep;
@Autowired
private NiveauRepository nRep;
@Autowired
private ExperienceRepository ERep;
@Autowired
private CandidatRepository cRep;
@Autowired
private TypeContratRepository tcRep;
@Override
//pour ajouter une compétence a partir de l'admin
public void addCompetence(com.Rhlynk.pojo.Competence c) throws SotutechTestException{
	// TODO Auto-generated method stub
	if(c!=null){
		if(c.getType().equalsIgnoreCase("Framework")){
			List<Framework> frameworks= fRep.findAll();
			for(Framework f: frameworks){
				if(f.getNom().equalsIgnoreCase(c.getNom())){
					throw new SotutechTestException("competence", "Le framework existe déjà");
				}
			}
			Framework fw= new Framework();
			fw.setNom(c.getNom());
			fRep.save(fw);
		}
		else{
			List<LangageProgrammation> langages= langRep.findAll();
			for(LangageProgrammation l: langages){
				if(l.getNom().equalsIgnoreCase(c.getNom())){
					throw new SotutechTestException("competence", "Le langage existe déjà");
				}
			}
			LangageProgrammation l= new LangageProgrammation();
			l.setNom(c.getNom());
			langRep.save(l);
		}
	}
}
// pour ajouter des compétences au niveau de l'interface du candidat
@Override
public void addCompetences(List<Competence> competences) {
	// TODO Auto-generated method stub
	if(competences!=null)
	{
	  Candidat c= cRep.findOne(competences.get(0).getCandidat().getUsername());
	  c.setCompetences(competences);
	  cRep.save(c);
	}

	
}

@Override
public void deleteCompetence(Long id,String type) {
	// TODO Auto-generated method stub
	if(type.equalsIgnoreCase("Framework")){
		fRep.delete(id);
	}
	else{
		langRep.delete(id);
	}
}

@Override
public Object getCompetences() {
	// TODO Auto-generated method stub
	Map<String,Object> m= new HashMap<>();
	List<LangageProgrammation> langages=langRep.findAll();
	List<Framework> frameworks =fRep.findAll();
	m.put("langages", langages);
	m.put("frameworks", frameworks);
	return m;
}
// editer une competence a partir de l'admin
@Override
public void editCompetence(com.Rhlynk.pojo.Competence c) throws SotutechTestException {
	// TODO Auto-generated method stub
	if(c!=null){
		if(c.getDescription().isEmpty()){
			throw new SotutechTestException("competence", "Le description est obligatoire");
		}
		if(c.getType().equalsIgnoreCase("Framework")){
			List<Framework> frameworks= fRep.findAll();
			for(Framework f: frameworks){
				if(f.getNom().equalsIgnoreCase(c.getNom())&&f.getId()!=c.getId()){
					throw new SotutechTestException("competence", "Le nom du framework existe déjà");
				}
			}
			
			Framework fw= new Framework();
			fw.setId(c.getId());
			fw.setNom(c.getNom());
			fRep.save(fw);
		}
		else{
			List<LangageProgrammation> langages= langRep.findAll();
			for(LangageProgrammation l: langages){
				
				if(l.getNom().equalsIgnoreCase(c.getNom())&&l.getId()!=c.getId()){
					System.out.println("langage "+l.getId()+ "nom "+l.getNom());
					throw new SotutechTestException("competence", "Le langage existe déjà");
				}
			}
			LangageProgrammation l= new LangageProgrammation();
			l.setId(c.getId());
			l.setNom(c.getNom());
			l.setDescription(c.getDescription());
			langRep.save(l);
		}
	}
}
// utilisé pour récuperer les elements necessaires pour que le candidat puisse mettre à jour ses compétences.
@Override
public Object getInitValues() {
	Map<String,Object> m= new HashMap<>();
	List<Niveau> niveaux= nRep.findAll();
	List<Experience> experiences=ERep.findAll();
	List<LangageProgrammation> langages= langRep.findAll();
	List<Framework> frameworks=fRep.findAll();
	m.put("niveaux", niveaux);
	m.put("experiences", experiences);
	m.put("langages", langages);
	m.put("frameworks", frameworks);
	m.put("typeContrat", tcRep.findAll());
	return m;
}

}
