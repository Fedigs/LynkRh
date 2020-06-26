package com.Rhlynk.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Rhlynk.metier.ILieux;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class LieuxRest {
	@Autowired
	private ILieux iLieux;
	@RequestMapping(value="/lieux")
	public Object getLieux(){
		return iLieux.getLieux();
	}
}
