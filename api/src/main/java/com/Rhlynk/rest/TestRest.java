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
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Test;
import com.Rhlynk.metier.ITest;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class TestRest {
	@Autowired
	private ITest iTest;
	@JsonView({View.TestView.class})
	@RequestMapping(value="/test")
	public List<Test> getTests() {
		return iTest.getTests();
	}
	@JsonView({View.QuestionView.class})
	@RequestMapping(value="/test/questions")
	public List<Question> getQuestionsOfTest(@RequestParam(defaultValue="id") Long id) {
		Test t=iTest.getTest(id);
		return t!=null?t.getQuestions():null;
	}
	@JsonView({View.TestView1.class})
	@RequestMapping(value="/test/get")
	public Test getTest(@RequestParam(name="id",defaultValue="0") Long id) {
		return iTest.getTest(id);
	}
	@RequestMapping(value="/test",method=RequestMethod.POST)
	public Object addTest(@RequestBody @Valid Test t, BindingResult br)  {
		Map<Object,Object> m= new HashMap<>();
		if(br.hasErrors()){
			m.put("titre", "Titre est obligatoire");
			return m;
		}
		try {
			if(t.getId()!=null){
				iTest.editTest(t);
			}
			else
			iTest.addTest(t);
			m.put("error", false);
			return m;
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			m.put("test", e.getMessage());
			return m;
		}
	}
	@RequestMapping(value="/test/question",method=RequestMethod.POST)
	public Object addQuestion(@RequestParam(name="id",defaultValue="0") Long id, @RequestParam(name="idQuestion",defaultValue="0")Long idQ)  {
		Map<Object, Object> m= new HashMap<>();
		try {
			iTest.addQuestion(id, idQ);
			m.put("error",false);
			return m;
		} catch (SotutechTestException e) {
			// TODO Auto-generated catch block
			
			m.put("question", e.getMessage());
			return m;
		}
	}
	@JsonView({View.TestView.class})
	@RequestMapping(value="/test/page")
	public Page<Test> getTestsWithPage(@RequestParam(name="size",defaultValue="10") int size, @RequestParam(name="page",defaultValue="0") int page) {
		return iTest.getTestsWithPage(size, page);
	}
	@RequestMapping(value="/test",method=RequestMethod.DELETE)
	public Object deleteTest(@RequestParam(name="id",defaultValue="0")  Long id) {
		iTest.deleteTest(id);
		Map<Object, Object> m= new HashMap<>();
		m.put("error", false);
		return m;
	}
	
	
}
