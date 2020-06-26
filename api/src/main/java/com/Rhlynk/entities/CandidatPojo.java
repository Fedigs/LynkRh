package com.Rhlynk.entities;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Role;

public class CandidatPojo extends Candidat {
	private MultipartFile cvFile;

	public MultipartFile getCvFile() {
		return cvFile;
	}

	public void setCvFile(MultipartFile cvFile) {
		this.cvFile = cvFile;
	}

	public CandidatPojo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CandidatPojo(String username, String password, boolean actived, String nom, String email, String tel,
			String adresse, Role role, String prenom, Date dateNaissance) {
		super(username, password, actived, nom, email, tel, adresse, role, prenom, dateNaissance);
		// TODO Auto-generated constructor stub
	}

}
