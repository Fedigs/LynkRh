package com.Rhlynk.rest;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SotutechTestException;
import com.View;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Difficulte;
import com.Rhlynk.entities.Langage;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Reponse;
import com.Rhlynk.entities.Theme;
import com.Rhlynk.entities.Type;
import com.Rhlynk.entities.TypeQuestion;
import com.Rhlynk.entities.User;
import com.Rhlynk.metier.ILangage;
import com.Rhlynk.metier.IQuestion;
import com.Rhlynk.metier.ITheme;
import com.Rhlynk.metier.IUser;
import com.Rhlynk.pojo.CorrectionReponse;
import com.Rhlynk.pojo.JSon;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class QuestionRest {
@Autowired
private ILangage iLangage;
@Autowired
private ITheme iTheme;
@Autowired
private IQuestion iQuestion;
@Autowired
private IUser iUser;
@JsonView({View.LangageAndThemeView.class})
@RequestMapping(value="/question/init_params")
public Object intiParams(){
	Map<String,Object> init= new HashMap<>();
	init.put("langages", iLangage.getLangages());
	init.put("themes", iTheme.getThemes());
	init.put("difficulte", Difficulte.values());
	init.put("typeQuestion", TypeQuestion.values());
	return init;
}
@RequestMapping(value="/question/add",method=RequestMethod.POST)
public Object addQuestion(@RequestParam(defaultValue="false") boolean signalCodeErr,@RequestBody @Valid Question q,BindingResult br,Principal p) {
	Map<String,Object> err= new HashMap<>();
	if(br.hasErrors()){
		err.put("error", true);
		for(FieldError fe:br.getFieldErrors()){
			err.put(fe.getField(),fe.getDefaultMessage());
		}
		return err;
	}
	User u= iUser.getUser(p.getName());
	if(u.getRole().getRole().equalsIgnoreCase("ADMIN")||u.getRole().getRole().equalsIgnoreCase("GESTIONNAIRE"))
	{
		q.setType(Type.STANDARD);
	}
	else{
		q.setType(Type.PERSO);
	}
	q.setCreateBy(u);
	try {
		 iQuestion.addQuestion(q,signalCodeErr);
		 err.put("error", false);
		 return err;
	} catch (SotutechTestException e) {
		// TODO Auto-generated catch block
		err.put("error", true);
		err.put(e.getField(),e.getMessage());
		return err;
	}
}
@JsonView({View.QuestionView.class})
@RequestMapping(value="/question/get")
public Question getQuestion(@RequestParam(defaultValue="0") Long id) {
	return iQuestion.getQuestion(id);
}

@JsonView({View.ReponseView.class})
@RequestMapping(value="/question/reponses")
public Question getQuestionWthRep(@RequestParam(defaultValue="0") Long id) {
	return iQuestion.getQuestion(id);
}
@RequestMapping(value="/question/correction",method=RequestMethod.POST)
public Object correctionQuestion(HttpServletRequest request, @RequestBody List<Reponse> userReponse,String tq) {
	Question q =(Question) request.getSession().getAttribute("question");
	Object reponses=iQuestion.correctionQuestion(q, userReponse, tq);
	return reponses;
}
@RequestMapping(value="/question/tmpStore",method=RequestMethod.POST)
public Object storeTmpStore(@RequestBody @Valid Question q,BindingResult br,HttpServletRequest request){
	Map<String,Object> err= new HashMap<>();
	if(br.hasErrors()){
		err.put("error", true);
		for(FieldError fe:br.getFieldErrors()){
			err.put(fe.getField(),fe.getDefaultMessage());
		}
		return err;
	}
	try {
	if(q.getTypeQuestion().equals(TypeQuestion.QCM)){
			iQuestion.hasQcmReponse(q.getReponses());
		
	}
	else if(q.getTypeQuestion().equals(TypeQuestion.REPONSELIBRE))
	{
		iQuestion.hasRepLibreReponse(q.getReponses());
	}
	else if(q.getTypeQuestion().equals(TypeQuestion.PROGRAMMATION))
	{
		JSon json=iQuestion.isCodeCorrect(q);	
		q.setCompileErrors(json.Errors);
		q.setCompileResult(json.Result);
		q.setCompileWarning(json.Warnings);
	}
	}
	catch (SotutechTestException e) {
		// TODO Auto-generated catch block
		err.put("error", true);
		err.put(e.getField(),e.getMessage());
		return err;
	}
	request.getSession().setAttribute("question",q);
	err.put("error", false);
	return err;
}
@JsonView({View.QuestionWithStatsView.class})
@RequestMapping(value="/question/langagesStats")
public Object getLangagesStats(@RequestParam(name="t",defaultValue="")Type t,Principal p){
	User u= iUser.getUser(p.getName());
	return iQuestion.langagesStats(t, u);
}
@JsonView({View.QuestionWithStatsView.class})
@RequestMapping(value="/question/by/criteria")
public Object getQuestionByCriteria(
		@RequestParam(name="l",defaultValue="0") Long l,
		@RequestParam(name="th",defaultValue="0")Long th,
		@RequestParam(name="tq",defaultValue="")TypeQuestion tq,
		@RequestParam(name="d",defaultValue="")Difficulte d,
		@RequestParam(name="search",defaultValue="")String mot,
		@RequestParam(name="page",defaultValue="0")int page,
		@RequestParam(name="size",defaultValue="5")int size,
		@RequestParam(name="t",defaultValue="")Type t,Principal p
		) {
	return iQuestion.getQuestionByCriteria(l, th, d, tq, t, mot,p.getName(),size,page);
}
@JsonView({View.QuestionWithStatsView.class})
@RequestMapping(value="/question/themeAndDifficulteStats")
public Object getThemeAndDifficulteStats(
		@RequestParam(name="l",defaultValue="0") Long l,
		@RequestParam(name="search",defaultValue="")String mot,
		@RequestParam(name="t",defaultValue="")Type t,Principal p
		) {
	Map<String,Object> m= new HashMap<>();
	m.put("themes", iQuestion.themesStats(l, t, mot, p.getName()));
	m.put("difficultes", iQuestion.difficulteStats(l, t, mot, p.getName()));
	return m;
}
@JsonView({View.QuestionView.class})
@RequestMapping(value="/question/copy")
public Object copyQuestion(@RequestParam(name="q",defaultValue="0") Long q,Principal p){
	return iQuestion.copyQuestion(q,p.getName());
}
@RequestMapping(value="/question/delete")
public Object deleteQuestion(@RequestParam(name="q",defaultValue="0") Long q,Principal p){
	try {
		iQuestion.deleteQuestion(q, p.getName());
		return true;
	} catch (SotutechTestException e) {
		// TODO Auto-generated catch block
		Map<String,Object> errors = new HashMap<>();
		errors.put(e.getField(), e.getMessage());
		return errors;
	}
}


}
