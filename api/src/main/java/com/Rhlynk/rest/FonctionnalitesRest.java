package com.Rhlynk.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Rhlynk.metier.IFonctionnalites;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class FonctionnalitesRest {
@Autowired
private IFonctionnalites ifonct;
@RequestMapping(value="/fonctionnalites")
public Object getfonctionnalites(){
	return ifonct.getFonctionnalites();
}
}
