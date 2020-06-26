package com.Rhlynk.metier;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.dao.TestRepository;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Test;
@Service
public class TestImpl implements ITest {
@Autowired
private TestRepository testRepository;
	@Override
	public List<Test> getTests() {
		// TODO Auto-generated method stub
		return testRepository.findAll();
	}
	@Override
	public void addTest(Test t) throws SotutechTestException {
		// TODO Auto-generated method stub
		List<Test> tests=getTests();
		if(tests!=null){
			for(Test t1:tests){
				if(t1.getTitre().equalsIgnoreCase(t.getTitre())) throw new SotutechTestException("test", "Le test avec le méme nom existe déja");
			}
		}
		testRepository.save(t);
		
	}
	@Override
	public void addQuestion(Long id, Long idQ) throws SotutechTestException{
		// TODO Auto-generated method stub
		Test t=testRepository.findOne(id);
		if(t!=null){
			for(Question q:t.getQuestions()){
				if(q.getId()==idQ) throw new SotutechTestException("question","La question existe déjà dans le test");
			}
		}
		Question q1= new Question();
		q1.setId(idQ);
		if(t.getQuestions()==null){
			t.setQuestions(new ArrayList<>());
		}
		t.getQuestions().add(q1);
		testRepository.save(t);
	}
	@Override
	public Page<Test> getTestsWithPage(int size,int page) {
		// TODO Auto-generated method stub
		return testRepository.findAll(new PageRequest(page,size));
	}
	@Override
	public void deleteTest(Long id) {
		testRepository.delete(id);
		
	}
	@Override
	public Test getTest(Long id) {
		// TODO Auto-generated method stub
		Test t= testRepository.findOne(id);
		/*if(t!=null)
		if(t.getAffichage()!=null)
		if(t.getAffichage().equals("p")){
			Collections.sort(t.getQuestions(), new Comparator<TestQuestions>() {

				@Override
				public int compare(TestQuestions o1, TestQuestions o2) {
					// TODO Auto-generated method stub
					return o1.getPriorite()-o2.getPriorite();
				}
			});
		}*/
		return t;
	}
	@Override
	public void editTest(Test t) throws SotutechTestException {
		// TODO Auto-generated method stub
		List<Test> tests=getTests();
		if(tests!=null){
			for(Test t1:tests){
				if(t1.getTitre().equalsIgnoreCase(t.getTitre())&&t1.getId()!=t.getId()) throw new SotutechTestException("test", "Le test avec le méme nom existe déja");
			}
		}

		testRepository.save(t);
		
	}

}
