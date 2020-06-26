package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.dao.FrameworkRep;
import com.Rhlynk.entities.Framework;

@Service
public class FrameworkImpl implements IFramework {
	@Autowired
	private FrameworkRep rep;

	@Override
	public void addFramework(Framework f) throws SotutechTestException {
		// TODO Auto-generated method stub
		List<Framework> frameworks = rep.findAll();
		for (Framework f1 : frameworks) {
			if (f1.getNom().equalsIgnoreCase(f.getNom()))
				throw new SotutechTestException("", "Le framework existe déjà");
		}
		rep.save(f);
	}

	@Override
	public void deleteFramework(Long id) {
		// TODO Auto-generated method stub
		rep.delete(id);
	}

	@Override
	public Framework getFramework(Long id) {
		// TODO Auto-generated method stub
		return rep.findOne(id);
	}

	@Override
	public List<Framework> getFramework() {
		// TODO Auto-generated method stub
		return rep.findAll();
	}

	@Override
	public void editFramework(Framework f) throws SotutechTestException {
		// TODO Auto-generated method stub
		if (f.getDescription().isEmpty()) {
			throw new SotutechTestException("", "Veuillez descrire le framework");
		}
		List<Framework> frameworks = rep.findAll();
		for (Framework f1 : frameworks) {
			if (f1.getNom().equalsIgnoreCase(f.getNom()) && f1.getId() != f.getId())
				throw new SotutechTestException("", "Le nom du framework existe déjà");
		}
		rep.save(f);
	}

}
