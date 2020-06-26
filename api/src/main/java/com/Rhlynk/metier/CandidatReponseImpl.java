package com.Rhlynk.metier;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.entities.Offre;
import com.Rhlynk.metier.IOffre;
import com.Rhlynk.dao.CandidatReponseRepository;
import com.Rhlynk.entities.CandidatReponse;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Test;
import com.Rhlynk.pojo.CandReponseItem;
import com.Rhlynk.pojo.CandReponseProjection;
import com.Rhlynk.pojo.QuestionCandReponse;

@Service
public class CandidatReponseImpl implements ICandidatReponse {
@Autowired
private CandidatReponseRepository rep;
@Autowired private IOffre ioffre;
	@Override
	public void addReponse(List<CandidatReponse> reponses) {
		// TODO Auto-generated method stub
		rep.save(reponses);
	}
	@Override
	public List<QuestionCandReponse> getCandidatreponse(Invitation invitation) {
		Offre o = ioffre.getOffre(invitation.getId().getOffre().getId());
		if(o!=null){
			return setReponse(o.getTest(), rep.findByInvitation(invitation));
		}
		return null;
	}
private List<QuestionCandReponse> setReponse(Test t,List<CandidatReponse> candRep){
	List<QuestionCandReponse> questionsRep= new ArrayList<>();
	if(t==null||candRep.size()==0){
		return null;
	}
	for(Question q:t.getQuestions()){
		String duree="";
		List<CandReponseProjection> crProjections= new ArrayList<>();
		for(CandidatReponse cr:candRep){
			
			if(q.getId()==cr.getQuestion().getId()){
				if(!cr.getDuree().isEmpty()){
					duree=cr.getDuree();
				}
				CandReponseItem crItem= new CandReponseItem(cr.getId(), cr.getErrors(), cr.getWarnings(),
						cr.isReponseBol(), cr.getReponseText(),cr.isCorrecte(),cr.getScore());
				CandReponseProjection crProjection= new CandReponseProjection(crItem, cr.getReponse());
				crProjections.add(crProjection);
			}
		}
		QuestionCandReponse qRep= new QuestionCandReponse(q, duree,q.getTypeQuestion().name(), crProjections, 0);
		questionsRep.add(qRep);
	}
	return questionsRep;
}
@Override
public void correction(Long id, boolean correcte, double score) {
	CandidatReponse cr=rep.findOne(id);
	if(cr!=null){
		cr.setCorrecte(correcte);
		cr.setScore(score);
		rep.save(cr);
	}
}
}
