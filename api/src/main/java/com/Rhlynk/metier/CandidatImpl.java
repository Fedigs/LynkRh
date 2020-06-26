package com.Rhlynk.metier;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.codehaus.groovy.runtime.dgmimpl.arrays.IntegerArrayGetAtMetaMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.SotutechTestException;
import com.StringSimularity;
import com.Rhlynk.entities.Competence;
import com.Rhlynk.entities.Contrat;
import com.Rhlynk.entities.Framework;
import com.Rhlynk.entities.LangageProgrammation;
import com.Rhlynk.entities.TypeContrat;
import com.Rhlynk.entities.User;
import com.Rhlynk.dao.CandidatRepository;
import com.Rhlynk.dao.UserRepository;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Langage;
import com.Rhlynk.entities.Role;
import com.Rhlynk.pojo.CandidatPojo;
import com.Rhlynk.pojo.Critere;
import com.Rhlynk.pojo.Utilis;

@Service
public class CandidatImpl implements ICandidat {
	public static double POINT_CONTRAT = 50;
	public static double POINT_FRAMEWORK = 60;
	public static double POINT_LANGAGE = 40;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CandidatRepository rep;

	@Override
	public void addCandidat(Candidat c) throws SotutechTestException {
		// TODO Auto-generated method stub

	}

	@Override
	public Page<Candidat> searchCandidat(Candidat critere, Pageable p) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Candidat getCandidat(String username) {
		// TODO Auto-generated method stub
		return rep.findOne(username);
	}

	@Override
	public void inscription(Candidat c, MultipartFile cv) throws SotutechTestException {
		// TODO Auto-generated method stub
		if (c != null) {
			Candidat c1 = rep.findByEmail(c.getEmail());
			if (c1 != null) {
				throw new SotutechTestException("email", "L'email existe déjà");
			}
			c1 = rep.findOne(c.getUsername());
			if (c1 != null)
				throw new SotutechTestException("username", "Le nom d'utilisateur existe déjà");
			c.setRole(new Role("CANDIDAT"));
			try {
				if (cv == null)
					throw new SotutechTestException("cv", "Le cv est obligatoire");
				String cvName = Utilis.uploadCv(null, c.getUsername(), cv);
				if (cvName != null) {
					c.setCvUrl(cvName);
				}
				rep.save(c);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new SotutechTestException("username", "Une erreur est survenue sur l'upload du cv");
			}
		}

	}

	@Override
	public void editCandidat(CandidatPojo c) throws SotutechTestException {
		// TODO Auto-generated method stub
		if (c != null) {
			Candidat c1 = rep.findByEmail(c.getEmail());
			if (c1 != null) {
				if (!c1.getUsername().equals(c.getUsername()))
					throw new SotutechTestException("email", "L'email existe déjà");
			}
			c1 = rep.findOne(c.getUsername());
			c1.setModifyAt(new Date());
			c1.setCandidat(c);
			rep.save(c1);
		}
	}

	@Override
	public void addContrat(List<Contrat> contart) {
		// TODO Auto-generated method stub
		if (contart != null) {
			Candidat c = rep.findOne(contart.get(0).getCandidat().getUsername());
			c.setContrats(contart);
			rep.save(c);
		}
	}
	
	@Override
	public List<Candidat> sortScore(Critere c, List<Candidat> candidats) {
		List<Candidat> finalCandidats = new ArrayList<>();
		for (Candidat cand : candidats) {
			computeFinalScore(c, cand);
			if (cand.getScore() > 0) {
				finalCandidats.add(cand);
			}
		}
		
		Collections.sort(finalCandidats, new Comparator<Candidat>() {
			@Override
			public int compare(Candidat o1, Candidat o2) {
				// TODO Auto-generated method stub
				return (int) (o2.getScore() - o1.getScore());
			}
		});
		
		return finalCandidats;
	}

	@Override
	public Page<Candidat> matchingCandidat(Critere c) {
		// TODO Auto-generated method stub
		List<Candidat> candidats = null;
		List<Candidat> finalCandidats = new ArrayList<>();
		candidats = rep.findAll();
		for (Candidat cand : candidats) {
			computeFinalScore(c, cand);
			if (cand.getScore() > 0) {
				finalCandidats.add(cand);
			}
		}
		Collections.sort(finalCandidats, new Comparator<Candidat>() {

			@Override
			public int compare(Candidat o1, Candidat o2) {
				// TODO Auto-generated method stub
				return (int) (o2.getScore() - o1.getScore());
			}
		});
		
		PageRequest pageable = new PageRequest(0, 5);
		System.out.println(c.getSize());
		int max = (c.getSize()) > finalCandidats.size() ? finalCandidats.size() : c.getSize();
		Page<Candidat> page = new PageImpl<Candidat>(finalCandidats.subList(0, max), pageable,
				finalCandidats != null ? finalCandidats.size() : 0);
		System.out.println(page.getContent().size());
		return page;

	}

	private List<Candidat> calculContratPoint(List<TypeContrat> tc, List<Candidat> cs) {
		if (tc != null) {
			if (tc.size() > 0) {
				for (TypeContrat t : tc) {
					for (Candidat c : cs) {
						for (Contrat ct : c.getContrats()) {
							if (ct.getTypeContrat().getId() == t.getId()) {
								c.setScore(c.getScore() + POINT_CONTRAT);
							}
						}
					}
				}
			}
		}
		return cs;
	}

	private List<Candidat> filterAndComputerCompetence(List<Framework> frameworks, List<LangageProgrammation> langages,
			List<Candidat> cs) {
		List<Candidat> filterCand = new ArrayList<>();
		for (Candidat c : cs) {
			boolean find = false;
			for (Competence comp : c.getCompetences()) {
				if (frameworks.contains(comp.getFramework())) {
					c.setScore(c.getScore() + (POINT_FRAMEWORK
							* (comp.getExperience().getExperience() + comp.getNiveau().getNiveau())));
					find = true;
				} else if (langages.contains(comp.getLangage())) {
					c.setScore(c.getScore()
							+ (POINT_LANGAGE * (comp.getExperience().getExperience() + comp.getNiveau().getNiveau())));
					find = true;
				}
			}
			if (find) {
				filterCand.add(c);
			}
		}
		return filterCand;
	}

	@Override
	public void uploadPhoto(String username, MultipartFile photo) {
		// TODO Auto-generated method stub
		Candidat c = rep.findOne(username);
		if (c != null) {
			String ph;
			try {
				ph = Utilis.upload(c.getPhotoUrl(), photo);
				if (ph != null) {
					c.setPhotoUrl(ph);
					rep.save(c);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

	@Override
	public String uploadCv(String username, MultipartFile cv) {
		// TODO Auto-generated method stub
		Candidat c = rep.findOne(username);
		if (c != null) {
			String ph;
			try {
				ph = Utilis.uploadCv(c.getCvUrl(), c.getUsername(), cv);
				if (ph != null) {
					c.setCvUrl(ph);
					rep.save(c);
					return ph;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		return null;

	}

	@Override
	public byte[] displayImage(String photoUrl) {
		// TODO Auto-generated method stub
		return Utilis.displayImage(photoUrl);
	}

	@Override
	public byte[] displayProfileImage(String username) {
		// TODO Auto-generated method stub
		Candidat c = rep.findOne(username);
		if (c != null) {
			if (c.getPhotoUrl() != null) {
				return Utilis.displayImage(c.getPhotoUrl());
			}
		}
		return null;
	}

	@Override
	public void removePhoto(String username) {
		// TODO Auto-generated method stub
		Candidat c = rep.findOne(username);
		if (c != null) {
			if (c.getPhotoUrl() != null) {
				try {
					Utilis.deletePhoto(c.getPhotoUrl());
					c.setPhotoUrl("");
					rep.save(c);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}

	}

	@Override
	public void downloadCv(String username, HttpServletResponse response) {
		// TODO Auto-generated method stub
		Candidat c = rep.findOne(username);
		Utilis.downloadCv(c, response);
	}

	@Override
	public Candidat computerScore(Critere crit, Candidat c) {
		// TODO Auto-generated method stub

		return c;
	}

	private void computeContratScore(List<TypeContrat> contrats, Candidat c) {
		if (contrats != null && c.getContrats() != null) {
			if (contrats.size() > 0) {
				for (TypeContrat c1 : contrats) {
					double pourcSup = 0;
					for (Contrat c2 : c.getContrats()) {
						double pourc = StringSimularity.similarity(c1.getNom(), c2.getTypeContrat().getNom());
						pourcSup = pourc > pourcSup ? pourc : pourcSup;
					}
					if (pourcSup >= 0.9) {
						double score = pourcSup * POINT_CONTRAT;
						score = Math.round(score * 100) / 100;
						c.setScore(c.getScore() + score);
					}
				}
			}
		}
	}

	private void computeCompetencesScore(List<Competence> competences, Candidat c) {
		if (competences != null && c.getCompetences() != null) {
			if (competences.size() > 0) {
				for (Competence c1 : competences) {
					double pourcSup = 0;
					double expNiveScore = 0;
					for (Competence c2 : c.getCompetences()) {
						if ((c1.getFramework() != null && c2.getFramework() != null)) {
							double pourc = StringSimularity.similarity(c1.getFramework().getNom(),
									c2.getFramework().getNom());
							if (pourc > pourcSup) {
								pourcSup = pourc;
								expNiveScore = (c2.getExperience().getExperience() + c2.getNiveau().getNiveau())
										* POINT_FRAMEWORK;
							}
						} else if (c1.getLangage() != null && c2.getLangage() != null) {
							double pourc = StringSimularity.similarity(c1.getLangage().getNom(),
									c2.getLangage().getNom());
							if (pourc > pourcSup) {
								pourcSup = pourc;
								expNiveScore = (c2.getExperience().getExperience() + c2.getNiveau().getNiveau())
										* POINT_LANGAGE;
							}
						}
					}
					if (pourcSup >= 0.9) {
						double score = pourcSup * expNiveScore;
						score = Math.round(score * 100) / 100;
						c.setScore(c.getScore() + score);
					}
				}
			}
		}
	}

	private void computeFinalScore(Critere crit, Candidat c) {
		List<Competence> competences = new ArrayList<>();
		for (Framework f : crit.getFrameworks()) {
			Competence cp = new Competence(null, f, null, null);
			competences.add(cp);
		}
		for (LangageProgrammation l : crit.getLangages()) {
			Competence cp = new Competence(l, null, null, null);
			competences.add(cp);
		}
		computeCompetencesScore(competences, c);
		// si le candidat ne posséde pas de point sur les compétences c'est pas la peine
		// de calculer les points pour le contrat
		if (c.getScore() > 0) {
			computeContratScore(crit.getContrats(), c);
		}
	}

	@Override
	public void setNote(String username, String note) {
		// TODO Auto-generated method stub
		Candidat c = rep.findOne(username);
		c.setNote(note);
		rep.save(c);
	}

	@Override
	public Candidat saveCandidat(Candidat candidat) {
		// TODO Auto-generated method stub
		return rep.save(candidat);
	}

	@Override
	public User getCandidatById(Long id) {
		// TODO Auto-generated method stub
		return userRepository.getCandidatById(id);
	}

	@Override
	public Candidat findCandidatById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
}
