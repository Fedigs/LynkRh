package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.LangageProgRep;
import com.Rhlynk.entities.LangageProgrammation;

@Service
public class LangageProgrammationImpl implements ILangageProgrammation {

	@Autowired
	private LangageProgRep langageRep;
	
	@Override
	public List<LangageProgrammation> findAll() {
		// TODO Auto-generated method stub
		return langageRep.findAll();
	}

}
