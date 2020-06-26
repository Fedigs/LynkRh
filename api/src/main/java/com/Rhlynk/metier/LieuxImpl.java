package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.ILieuxRep;
import com.Rhlynk.entities.Lieux;

@Service
public class LieuxImpl implements ILieux {
	@Autowired
	private ILieuxRep iLieuxRep;

	@Override
	public List<Lieux> getLieux() {
		// TODO Auto-generated method stub
		return iLieuxRep.findAll();
	}
	
	@Override
	public Lieux getLieuxById(Long id) {
		return iLieuxRep.findOne(id);
	}

}
