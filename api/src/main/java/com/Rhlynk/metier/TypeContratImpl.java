package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.TypeContratRepository;
import com.Rhlynk.entities.TypeContrat;
@Service
public class TypeContratImpl implements ITypeContrat {
@Autowired
private TypeContratRepository tcRep;
	@Override
	public List<TypeContrat> getTypeContrat() {
		// TODO Auto-generated method stub
		return tcRep.findAll();
	}

}
