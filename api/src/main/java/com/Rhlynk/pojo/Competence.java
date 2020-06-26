package com.Rhlynk.pojo;

public class Competence {
	private Long id;
	private String nom;
	private String type;
	private int numeroLangage;
	private String description;
	private String defaultText;
	private String compilerArgs;

	public Competence() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getNumeroLangage() {
		return numeroLangage;
	}

	public void setNumeroLangage(int numeroLangage) {
		this.numeroLangage = numeroLangage;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDefaultText() {
		return defaultText;
	}

	public void setDefaultText(String defaultText) {
		this.defaultText = defaultText;
	}

	public String getCompilerArgs() {
		return compilerArgs;
	}

	public void setCompilerArgs(String compilerArgs) {
		this.compilerArgs = compilerArgs;
	}

}
