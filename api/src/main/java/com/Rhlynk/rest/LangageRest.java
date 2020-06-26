package com.Rhlynk.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.View;
import com.View.LangageView;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Langage;
import com.Rhlynk.metier.ILangage;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class LangageRest {
	@Autowired
	private ILangage iLangage;

	@JsonView({View.LangageAndThemeView.class})
	@RequestMapping(value="/langages")
	public List<Langage> getLangages(){
		return iLangage.getLangages();
	}
	@JsonView({LangageView.class})
	@RequestMapping(value="/langages/get")
	public List<Langage> getLangagesforProfile(){
		return iLangage.getLangages();
	}
}
