package com.Rhlynk.pojo;

import org.springframework.web.client.RestTemplate;

public class ToCompile {
	public String LanguageChoice;
	public String Program;
	public String CompilerArgs;

	public ToCompile(String languageChoice, String program, String compilerArgs) {
		super();
		LanguageChoice = languageChoice;
		Program = program;
		CompilerArgs = compilerArgs;
	}

	public ToCompile(String languageChoice, String program) {
		super();
		LanguageChoice = languageChoice;
		Program = program;
	}

	public JSon compile() {
		final String uri = "http://rextester.com/rundotnet/api";
		RestTemplate restTemplate = new RestTemplate();
		JSon json = restTemplate.postForObject(uri, ToCompile.this, JSon.class);
		System.out.println(json);
		return json;
	}

}
