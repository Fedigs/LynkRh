package com.Rhlynk.rest;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Rhlynk.entities.Entreprise;
import com.Rhlynk.entities.User;
import com.Rhlynk.metier.IUser;

@RestController
public class EntrepriseRest {
	
	@Autowired
	private IUser iUser;
	
	@RequestMapping(value="/EntrepriseProfile", method = RequestMethod.GET)
	public User  getEntrepriseInfo(Principal pr) {
		return iUser.getEntreprise(pr.getName());
	}

}
