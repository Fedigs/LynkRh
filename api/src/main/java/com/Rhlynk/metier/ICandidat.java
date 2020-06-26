package com.Rhlynk.metier;

import java.io.FileInputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.SotutechTestException;
import com.Rhlynk.entities.Contrat;
import com.Rhlynk.entities.User;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.pojo.CandidatPojo;
import com.Rhlynk.pojo.Critere;

public interface ICandidat {
public Candidat saveCandidat(Candidat candidat);	
public void addCandidat(Candidat c) throws SotutechTestException;
public Page<Candidat> searchCandidat(Candidat critere,Pageable p);
public Candidat getCandidat(String username);
public User getCandidatById(Long id);
public void editCandidat(CandidatPojo c) throws SotutechTestException;
public void inscription(Candidat c,MultipartFile cv) throws SotutechTestException;
public void addContrat(List<Contrat> contart);
public List<Candidat> sortScore(Critere c, List<Candidat> candidats);
public Page<Candidat> matchingCandidat(Critere c);
public void uploadPhoto(String username, MultipartFile photo);
public String uploadCv(String username, MultipartFile cv);
public byte[] displayImage(String photoUrl);
public byte[] displayProfileImage(String username);
public void removePhoto(String username);
public void downloadCv(String username,HttpServletResponse response);
public Candidat computerScore(Critere crit,Candidat c );
public void setNote(String username,String note);
public Candidat findCandidatById(Long id);
}
