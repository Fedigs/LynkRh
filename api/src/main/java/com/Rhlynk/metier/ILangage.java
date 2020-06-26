package com.Rhlynk.metier;

import java.util.List;

import com.SotutechTestException;
import com.Rhlynk.entities.Langage;

public interface ILangage {
public List<Langage> getLangages();
public List<Langage> NumberOfQuestionForLangageOfSotutech();
public Langage getLangage(Long id);
public void addLangage(Langage l) throws SotutechTestException;
public void editLangage(Langage l) throws SotutechTestException;
}
