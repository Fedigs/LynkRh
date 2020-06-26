package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.dao.LangageRepository;
import com.Rhlynk.entities.Langage;
import com.Rhlynk.entities.Question;
import com.Rhlynk.pojo.JSon;
import com.Rhlynk.pojo.ToCompile;
@Service
public class LangageImpl implements ILangage {
@Autowired
private LangageRepository langageRepository;
@Autowired
private IQuestion iQuestion;
	@Override
	public List<Langage> getLangages() {
		// TODO Auto-generated method stub
		return langageRepository.findAll();
	}
	@Override
	public List<Langage> NumberOfQuestionForLangageOfSotutech() {
		// TODO Auto-generated method stub
		List<Question> questions=iQuestion.SotutechQuestions();
		List<Langage> langages=langageRepository.findAll();
		for(Langage l:langages){
			for(Question q : questions){
				if(l.getId()==q.getLangage().getId()){
					l.setNumbreOfQuestion(l.getNumbreOfQuestion()+1);
				}
			}
		}
		return langages;
	}
	@Override
	public Langage getLangage(Long id) {
		// TODO Auto-generated method stub
		return langageRepository.findOne(id);
	}
	@Override
	public void addLangage(Langage l) throws SotutechTestException {
		// TODO Auto-generated method stub
		List<Langage> ls= langageRepository.findAll();
		for(Langage l1:ls){
			if(l1.getNom().equalsIgnoreCase(l.getNom())) throw new SotutechTestException("","Le langage existe déjà");
		}
		langageRepository.save(l);
		
	}
	@Override
	public void editLangage(Langage l) throws SotutechTestException {
		if(l.getDescription().isEmpty()){
			throw new SotutechTestException("","Veuillez descrire le langage ");
		}
		if(l.getDefaultText().isEmpty()){
			throw new SotutechTestException("","Le code par default est obligatoire le bon fonctionnement des tests");
		}
		if(l.getNumeroLangage()<0){
			throw new SotutechTestException("","Le numéro du langage est obligatoire et doit être supérieur à 0");
		}
		List<Langage> ls= langageRepository.findAll();
		for(Langage l1:ls){
			if(l1.getNom().equalsIgnoreCase(l.getNom())&&l.getId()!=l1.getId()) throw new SotutechTestException("","Le nom du langage existe déjà");
		}
		ToCompile compile= new ToCompile(new String(""+l.getNumeroLangage()), l.getDefaultText());
		compile.CompilerArgs=l.getCompilerArgs();
		JSon json=compile.compile();
		if(json.Errors!=null){
			throw new SotutechTestException("","Le code contient des erreurs \n "+json.Errors);
		}
		langageRepository.save(l);
		
		
	}

}
