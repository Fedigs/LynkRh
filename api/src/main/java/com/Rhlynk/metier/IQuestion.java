package com.Rhlynk.metier;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;

import com.SotutechTestException;
import com.Rhlynk.entities.Difficulte;
import com.Rhlynk.entities.Langage;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Reponse;
import com.Rhlynk.entities.Theme;
import com.Rhlynk.entities.Type;
import com.Rhlynk.entities.TypeQuestion;
import com.Rhlynk.entities.User;
import com.Rhlynk.pojo.CorrectionReponse;
import com.Rhlynk.pojo.JSon;

public interface IQuestion {
public Question addQuestion(Question q,boolean signalCodeErr) throws SotutechTestException;
public Question copyQuestion(Long id,String username);
public void deleteQuestion(Long id,String username) throws SotutechTestException;;
public void ChangeVisibiliteQuestion(Long id,boolean visibilite);
public void addReponse(Long id,List<Reponse> reponses);
public List<Reponse> addReponses(List<Reponse> reponses);
public Question getQuestion(Long id);
public Object correctionQuestion(Question q,List<Reponse> userReponse,String tq);
public void hasQcmReponse(List<Reponse> reponses) throws SotutechTestException;
public void hasRepLibreReponse(List<Reponse> reponses) throws SotutechTestException;
public JSon isCodeCorrect(Question q) throws SotutechTestException;
public Object getQuestionByCriteria(Long idL,Long idTh,Difficulte d,TypeQuestion tq,Type t,String mot,String username,int size,int page);
public List<Question> SotutechQuestions();
public List<Question> UserQuestions(User u);
public Object langagesStats(Type type,User u);
public Object themesStats(Long idL,Type type,String mot,String username);
public Object difficulteStats(Long idL,Type type,String mot,String username);
public List<Reponse> getReponses(Long id);
}
