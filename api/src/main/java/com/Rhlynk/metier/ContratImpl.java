package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.ContratRepository;
import com.Rhlynk.entities.Contrat;

@Service
public class ContratImpl implements IContrat {
	
	@Autowired
	private ContratRepository contratRep; 

	@Override
	public List<Contrat> findAll() {
		// TODO Auto-generated method stub
		return contratRep.findAll();
	}

}
