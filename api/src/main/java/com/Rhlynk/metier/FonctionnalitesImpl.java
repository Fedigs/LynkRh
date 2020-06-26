package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.FonctionnalitesRep;
import com.Rhlynk.entities.Fonctionnalites;
@Service
public class FonctionnalitesImpl implements IFonctionnalites{
@Autowired
private FonctionnalitesRep fr;
	@Override
	public List<Fonctionnalites> getFonctionnalites() {
		// TODO Auto-generated method stub
		return fr.findAll();
	}

}
