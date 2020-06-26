package com.Rhlynk.metier;

import java.util.List;

import org.springframework.data.domain.Page;

import com.SotutechTestException;
import com.Rhlynk.entities.Test;

public interface ITest {
public List<Test> getTests();
public Page<Test> getTestsWithPage(int size, int page);
public void addTest(Test t) throws SotutechTestException;
public void editTest(Test t) throws SotutechTestException;
public void addQuestion(Long id , Long idQ) throws SotutechTestException;
public void deleteTest(Long id);
public Test getTest(Long id);
}
