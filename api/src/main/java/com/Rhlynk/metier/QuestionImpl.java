package com.Rhlynk.metier;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.dao.QuestionRepository;
import com.Rhlynk.dao.ReponseRepository;
import com.Rhlynk.dao.SpecificationDao;
import com.Rhlynk.entities.Difficulte;
import com.Rhlynk.entities.Langage;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Reponse;
import com.Rhlynk.entities.Test;
import com.Rhlynk.entities.Theme;
import com.Rhlynk.entities.Type;
import com.Rhlynk.entities.TypeQuestion;
import com.Rhlynk.entities.User;
import com.Rhlynk.pojo.CorrectionReponse;
import com.Rhlynk.pojo.JSon;
import com.Rhlynk.pojo.ToCompile;

@Service
public class QuestionImpl implements IQuestion{
@Autowired
private QuestionRepository questionRepository;
@Autowired
private ReponseRepository reponseRepository;
@Autowired
private ILangage iLangage;
@Autowired
private ITheme iTheme;
@Autowired
private IUser iUser;
	@Override
	@Transactional
	public Question addQuestion(Question q,boolean signalCodeErr)throws SotutechTestException {
		// TODO Auto-generated method stub
		List<Reponse> reponses =q.getReponses();
		if(q.getTypeQuestion().equals(TypeQuestion.QCM)){
			hasQcmReponse(q.getReponses());
		}
		else if(q.getTypeQuestion().equals(TypeQuestion.REPONSELIBRE))
		{
			hasRepLibreReponse(q.getReponses());
		}
		else if(q.getTypeQuestion().equals(TypeQuestion.PROGRAMMATION))
		{
			JSon json=isCodeCorrect(q);
		    q.setCompileResult(json.Result);
		    q.setCompileErrors(json.Errors);
		    q.setCompileWarning(json.Warnings);
		}
		
		q=questionRepository.save(q);
		List<Reponse> reponses1=reponseRepository.findByQuestion(q);
		for(Reponse r1:reponses){
			r1.setQuestion(q);
			r1.setId(null);
		}
		for(Reponse r:reponses1){
				reponseRepository.delete(r.getId());
			
		}
		reponseRepository.save(reponses);
		return q;
	}

	@Override
	public Question copyQuestion(Long id,String username) {
		// TODO Auto-generated method stub
		Question q=questionRepository.findOne(id);
		User u= iUser.getUser(username);
		if(q!=null){
			try {
				Question q1=(Question) q.clone();
				q1.setCreateBy(u);
				q1.setTitre(q1.getTitre()+"-copy");
				q1.setId(null);
				q1.setVisibilite(true);
				if(u.getRole().getRole().equalsIgnoreCase("ADMIN")||u.getRole().getRole().equalsIgnoreCase("GESTIONNAIRE"))
				{
					q1.setType(Type.STANDARD);
				}
				else{
					q1.setType(Type.PERSO);
				}
				List<Reponse> reponses=new ArrayList<>();
				for(Reponse r:reponses){
					Reponse r2=(Reponse) r.clone();
					r2.setId(null);
					reponses.add(r2);
				}
				q1.setReponses(reponses);
				reponses=addReponses(reponses);
				reponses=reponseRepository.save(reponses);
				q1.setReponses(reponses);
				return questionRepository.save(q1);
			} catch (CloneNotSupportedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		return null;
	}

	@Override
	public void deleteQuestion(Long id,String username) throws SotutechTestException {
		// TODO Auto-generated method stub
		User u=iUser.getUser(username);
		Question q=questionRepository.findOne(id);
		if(q!=null){
			if(u.getRole().getRole().equalsIgnoreCase("ADMIN")||u.getRole().getRole().equalsIgnoreCase("GESTIONNAIRE"))
			{
				questionRepository.delete(id);
			}
			else{
				if(q.getCreateBy().getUsername().equals(username))
				{
					questionRepository.delete(id);
				}
				else{
					throw new SotutechTestException("error","Vous ne possedez pas de droit sur la ressource en question");
				}
				//utiliser le field error car coté font c'est ce qui est utilisé pour le cas des question utiliser.
			}
		}
		
	}

	@Override
	public void ChangeVisibiliteQuestion(Long id, boolean visibilite) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addReponse(Long id, List<Reponse> reponses) {
		// TODO Auto-generated method stub
		
	}
@Override	
public void hasQcmReponse(List<Reponse> reponses) throws SotutechTestException{
	if(reponses.size()<=1) 
		throw new SotutechTestException("reponses","La question doit avoir au moins 2 réponses");
	else{
		boolean find1=false,find2=false;
		for(Reponse r:reponses){
			if(r.isReponseBol())
				find1=true;
			if(r.getTitre().isEmpty()){
				find2=true;
			}
		}
		if(find2) throw new SotutechTestException("reponses","Une réponse doit avoir un énoncé");
		if(!find1) throw new SotutechTestException("reponses","La question doit avoir au moins une réponse vraie");
	}
}
public void hasRepLibreReponse(List<Reponse> reponses) throws SotutechTestException{
	

		for(int i=0;i<reponses.size();i++){
			System.out.println("text"+reponses.get(i).getReponseText());
			if(reponses.get(i).getReponseText()==null)
			{
				reponses.remove(i);
			}
			else if(reponses.get(i).getReponseText().isEmpty())
			{
				reponses.remove(i);
			}
		}
		if(reponses.size()<1) 
			throw new SotutechTestException("reponses","La question doit avoir au moins une réponse");
	
}
public JSon isCodeCorrect(Question q) throws SotutechTestException {
	List<Reponse> reponses=q.getReponses();
	if(reponses.get(0)!=null){
		if(reponses.get(0).getReponseText().isEmpty())
				throw new SotutechTestException("reponses","La code de la réponse ne doit pas etre vide");
		else{
			ToCompile tc= new ToCompile(q.getLangage().getNumeroLangage()+"",q.getReponses().get(0).getReponseText(), q.getLangage().getCompilerArgs());
			JSon json=tc.compile();
			if(json.Errors!=null)throw new SotutechTestException("reponses",json.Errors);	
			return json;
		}
	}
	else throw new SotutechTestException("reponses","La réponse est vide");
}

@Override
public Question getQuestion(Long id) {
	// TODO Auto-generated method stub
	return questionRepository.findOne(id);
}

@Override
public Object correctionQuestion(Question q, List<Reponse> userReponse,String tq) {
	// TODO Auto-generated method stub
	List<Reponse> vraiReponse=q.getReponses();
	if(tq.equals(TypeQuestion.QCM.toString())){
		return correctionReponseQcm(vraiReponse, userReponse);
	}
	else if(tq.equals(TypeQuestion.REPONSELIBRE.toString()))
	{
		return correctionQuestionReponseLibre(vraiReponse,userReponse);
	}
	else if(tq.equals(TypeQuestion.PROGRAMMATION.toString())){
		return correctionQuestionProg(q, userReponse.get(0));
	}
	return null;
		}
private List<CorrectionReponse> correctionReponseQcm(List<Reponse> vraiReponse, List<Reponse> userReponse){
    List<CorrectionReponse> correctionReponses= new ArrayList<>();
    for(Reponse r1:vraiReponse){
    	boolean find=false;
    	for(Reponse r2:userReponse){
    		if(r1.getId()==r2.getId()){
    			if(r1.isReponseBol()==r2.isReponseBol()){
    			correctionReponses.add(new CorrectionReponse(r2, true));
    			find=true;
    			break;
    			}
    		}
    	}
    	if(!find){
    		correctionReponses.add(new CorrectionReponse(r1, false));
    	}
    }
	
	return correctionReponses;
}
private List<CorrectionReponse> correctionQuestionReponseLibre(List<Reponse> vraiReponse, List<Reponse> userReponse){
	List<CorrectionReponse> correctionReponses= new ArrayList<>();
    outer:for(Reponse r1:userReponse){
    	for(Reponse r2:vraiReponse){
    			if(r1.getReponseText().equals(r2.getReponseText())){
    			correctionReponses.add(new CorrectionReponse(r1, true));
    			break outer;
    			}
    		
    	}
    	
    }
	if(correctionReponses.size()==0){
		correctionReponses.add(new CorrectionReponse(userReponse.get(0), false));
	}
	
	return correctionReponses;
}
private Object correctionQuestionProg(Question q, Reponse userReponse){
	Map<String,Object> map= new HashMap<>();
	Question q1= new Question();
	q1.setLangage(q.getLangage());
	List<Reponse> reponses= new ArrayList<>();
	reponses.add(userReponse);
	JSon json=new JSon();
	q1.setReponses(reponses);
	try {
		json=isCodeCorrect(q1);
	} catch (SotutechTestException e) {
		// TODO Auto-generated catch block
		json.Errors=e.getMessage();
		System.out.println("ICI1"+e.getMessage());
	}
	JSon json1= new JSon();
	json1.Errors=q.getCompileErrors();
	json1.Warnings=q.getCompileWarning();
	json1.Result=q.getCompileResult();
	map.put("vraiReponse", json1);
	map.put("userReponse", json);
	return map;
}

@Override
public Object getQuestionByCriteria(Long l, Long th, Difficulte d, TypeQuestion tq, Type t, String mot,String username,int size,int page) {
	// TODO Auto-generated method stub
	Map<String,Object> m= new HashMap<>();
	Page<Question> questions=questionRepository.findAll(Specifications.where(SpecificationDao.avecDifficulte(d))
			.and(SpecificationDao.avecLangage(l))
			.and(SpecificationDao.avecTheme(th))
			.and(SpecificationDao.avecTypeQuestion(tq))
			.and(SpecificationDao.avecTitre("%"+mot+"%"))
			.and(SpecificationDao.sotutechOrUserQuestion(t,username))
			,new PageRequest(page, size));
	m.put("listQuestions", questions);
	return m;
}
private Object numberOfQuestionByLangage(List<Question> questions){
	List<Langage> langages=iLangage.getLangages();
	int nb=0;
	for(Langage l:langages){
		for(Question q:questions){
			if(q.getLangage().getId()==l.getId()){
				l.setNumbreOfQuestion(l.getNumbreOfQuestion()+1);
				nb++;
			}
		}
	}
	Map<String,Object> m= new HashMap<>();
	m.put("totalLangages", nb);
	m.put("langages", langages);
	return m;
}
private Object numberOfQuestionByTheme(List<Question> questions){
	List<Theme> themes=iTheme.getThemes();
	int nb=0;
	for(Theme t:themes){
		for(Question q:questions){
			if(q.getTheme().getId()==t.getId()){
				t.setNumbreOfQuestion(t.getNumbreOfQuestion()+1);
				nb++;
			}
		}
	}
	Map<String,Object> m= new HashMap<>();
	m.put("totalThemes", nb);
	m.put("themes", themes);
	return m;
}
private Map<String,Object> numberOfQuestionByDifficulte(List<Question> questions){
	Map<String,Object> m= new HashMap<>();
	int total=0;
	for(Difficulte d:Difficulte.values()){
		int nb=0;
		for(Question q:questions){
			if(q.getDifficulte().equals(d)){
				nb++;
				total++;
			}
		}
		m.put(d.toString(), nb);
		
	}
	m.put("totalDifficulte", total);
	return m;
}
@Override
public List<Question> SotutechQuestions() {
	// TODO Auto-generated method stub
	return questionRepository.findByType(Type.STANDARD);
}

@Override
public List<Question> UserQuestions(User u) {
	// TODO Auto-generated method stub
	return questionRepository.findByCreateBy(u);
}

@Override
public Object langagesStats(Type type,User u) {
	// TODO Auto-generated method stub
	List<Question> question=null;
	if(type==null){
		question=SotutechQuestions();
	}
	else if(type.equals(Type.STANDARD)){
		question=SotutechQuestions();
	}
	else{
		question=UserQuestions(u);
	}
	
	return numberOfQuestionByLangage(question);
}

@Override
public Object themesStats(Long idL,Type type,String mot,String username) {
	// TODO Auto-generated method stub
	List<Question> questions=questionRepository.findAll(Specifications.where(SpecificationDao.avecLangage(idL))
			.and(SpecificationDao.avecTitre("%"+mot+"%"))
			.and(SpecificationDao.sotutechOrUserQuestion(type,username)));
	return numberOfQuestionByTheme(questions);

}

@Override
public Object difficulteStats(Long idL, Type type, String mot, String username) {
	// TODO Auto-generated method stub
	List<Question> questions=questionRepository.findAll(Specifications.where(SpecificationDao.avecLangage(idL))
			.and(SpecificationDao.avecTitre("%"+mot+"%"))
			.and(SpecificationDao.sotutechOrUserQuestion(type,username)));
	return numberOfQuestionByDifficulte(questions);
}

@Override
public List<Reponse> addReponses(List<Reponse> reponses) {
	// TODO Auto-generated method stub
	return reponseRepository.save(reponses);
	
}

@Override
public List<Reponse> getReponses(Long id) {
	// TODO Auto-generated method stub
	Question q= questionRepository.findOne(id);
	return q.getReponses() ;
}

}
