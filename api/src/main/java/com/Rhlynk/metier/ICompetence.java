package com.Rhlynk.metier;

import java.util.List;

import com.SotutechTestException;
import com.Rhlynk.entities.Competence;

public interface ICompetence {
public Object getCompetences(); 
public void addCompetence(com.Rhlynk.pojo.Competence c) throws SotutechTestException;
public void addCompetences(List<Competence> competences);
public void deleteCompetence(Long id,String type);
public void editCompetence(com.Rhlynk.pojo.Competence c) throws SotutechTestException;
public Object getInitValues();
}
