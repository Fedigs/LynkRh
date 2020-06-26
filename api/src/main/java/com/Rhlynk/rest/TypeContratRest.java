package com.Rhlynk.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Rhlynk.metier.ITypeContrat;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class TypeContratRest {
	@Autowired
	private ITypeContrat itc;
	@RequestMapping(value="/typeContrat")
	public Object getTypeContrat(){
		return itc.getTypeContrat();
	}
}
