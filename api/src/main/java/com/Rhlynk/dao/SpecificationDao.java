package com.Rhlynk.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import org.springframework.data.jpa.domain.Specification;
import com.Rhlynk.entities.Lists;
import com.Rhlynk.entities.Offre;
import com.Rhlynk.entities.Candidat;
import com.Rhlynk.entities.Difficulte;
import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Type;
import com.Rhlynk.entities.TypeQuestion;


public class SpecificationDao {
	public static Specification<Question> avecDifficulte(Difficulte difficulte){
		 return new Specification<Question>(){

			@Override
			public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(difficulte!=null){
					return cb.equal(root.get("difficulte"), difficulte);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Question> avecLangage(Long lang){
		 return new Specification<Question>(){

			@Override
			public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(lang!=0){
					return cb.equal(root.get("langage").get("id"), lang);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Question> avecTheme(Long theme){
		 return new Specification<Question>(){

			@Override
			public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(theme!=0){
					return cb.equal(root.get("theme").get("id"), theme);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Question> sotutechOrUserQuestion(Type type,String username){
		 return new Specification<Question>(){

			@Override
			public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				    if(type==null)
					return cb.equal(root.get("type"), Type.STANDARD);
				    else if(type.equals(Type.STANDARD)){
				    	return cb.equal(root.get("type"), Type.STANDARD);
				    }
				    else{
				    	return cb.equal(root.get("createBy").get("username"), username);
				    }
			}
			 
		 };
	 }
	 public static Specification<Question> avecTypeQuestion(TypeQuestion typeQuestion){
		 return new Specification<Question>(){

			@Override
			public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(typeQuestion!=null){
					return cb.equal(root.get("typeQuestion"), typeQuestion);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Question> avecTitre(String titre){
		 return new Specification<Question>(){

			@Override
			public Predicate toPredicate(Root<Question> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(!titre.isEmpty()){
					return cb.like(root.get("titre"),titre);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Candidat> selonTypeContrat(String typecontrat){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(!typecontrat.isEmpty()&&!typecontrat.equalsIgnoreCase("Indifférent")){
					return cb.like(root.join("contrat").get("nom"),typecontrat);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Offre> selonStatus(int status){
		 return new Specification<Offre>(){

			@Override
			public Predicate toPredicate(Root<Offre> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(status>0){
					return cb.equal(root.get("status"),status);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Offre> selonUsername(String username){
		 return new Specification<Offre>(){

			@Override
			public Predicate toPredicate(Root<Offre> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(username==null){
					return null;
				}
				else if(!username.isEmpty()){
					return cb.equal(root.join("proprietaire").get("username"),username);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Offre> selonDateCreation(Date date){
		 return new Specification<Offre>(){

			@Override
			public Predicate toPredicate(Root<Offre> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(date==null){
					return null;
				}
				else{
					return cb.equal(root.get("createAt"),date);
				}
			}
			 
		 };
	 }
	 public static Specification<Offre> selonTitreOffre(String titre){
		 return new Specification<Offre>(){

			@Override
			public Predicate toPredicate(Root<Offre> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(titre==null){
					return null;
				}
				if(!titre.isEmpty()){
					return cb.like(root.get("titre"),"%"+titre+"%");
				}
				return null;
			}
			 
		 };
	 }
/*	 public static Specification<Candidat> selonTypeFreelance(String type){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(!type.isEmpty()&&!type.equalsIgnoreCase("Indifférent")){
					Path<Contrat> contratPath = root.join("contrat");
					Subquery<FreelanceContrat> subquery = query.subquery(FreelanceContrat.class);
		            Root autreContratRoot = subquery.from(FreelanceContrat.class);
		            subquery.select(autreContratRoot);
		            subquery.where(cb.equal(autreContratRoot.get("type"), type));
						return cb.in(contratPath).value(subquery);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Candidat> selonLieuTravail(String lieu){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(!lieu.isEmpty()&&!lieu.equalsIgnoreCase("Indifférent")){
					Path<Contrat> contratPath = root.join("contrat");
					Subquery<FreelanceContrat> subquery = query.subquery(FreelanceContrat.class);
		            Root autreContratRoot = subquery.from(FreelanceContrat.class);
		            subquery.select(autreContratRoot);
		            subquery.where(cb.equal(autreContratRoot.get("lieu"), lieu));
						return cb.in(contratPath).value(subquery);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Candidat> selonSalaireJournalier(Float salaire){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(salaire>0)
				{
				Path<Contrat> contratPath = root.join("contrat");
				Subquery<FreelanceContrat> subquery = query.subquery(FreelanceContrat.class);
	            Root autreContratRoot = subquery.from(FreelanceContrat.class);
	            subquery.select(autreContratRoot);
	            subquery.where(cb.ge(autreContratRoot.get("salaireJournalier"), salaire));
					return cb.in(contratPath).value(subquery);
				}
				return null;
			}
			 
		 };
	 }
	 public static Specification<Candidat> selonSalaireMensuel(Float salaire){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(salaire>0)
				{
				Path<Contrat> contratPath = root.join("contrat");
				Subquery<AutreContrat> subquery = query.subquery(AutreContrat.class);
	            Root autreContratRoot = subquery.from(AutreContrat.class);
	            subquery.select(autreContratRoot);
	            subquery.where(cb.ge(autreContratRoot.get("salaireMensuel"), salaire));
					return cb.in(contratPath).value(subquery);
				}
				return null;
			}
			 
		 };
	 }*/
	 public static Specification<Candidat> selonLocalite(String localite){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> arg1, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				if(!localite.isEmpty()&&!localite.equalsIgnoreCase("Indifférent")){
					return cb.equal(root.get("adresse"),localite);
				}
				return null;
			}
			 
		 };
	 }
/*	 public static Specification<Candidat> selonCompetences(CompetenceCandidat competence){
		 return new Specification<Candidat>(){

			@Override
			public Predicate toPredicate(Root<Candidat> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				// TODO Auto-generated method stub
				Predicate []predicates=new Predicate[3];
				query.distinct(true);
				if(competence==null)
					return null;
				else{
					if(!competence.getExperience().equalsIgnoreCase("Indifférent")){

						predicates[0]=cb.and(cb.equal(root.join("competences").get("experience"), competence.getExperience()));
						
					}
					else{
						predicates[0]= cb.and(cb.isNotNull(root.join("competences").get("experience")));
					}
					if(!competence.getNiveau().equalsIgnoreCase("Indifférent")){

						predicates[1]=cb.and(cb.equal(root.join("competences").get("niveau"), competence.getNiveau()));
						
					}
					else{
						predicates[1]=cb.and(cb.isNotNull(root.join("competences").get("niveau")));;
					}
					predicates[2]= cb.and(cb.equal(root.join("competences").get("competence").get("id"),competence.getCompetence().getId()));
					 return cb.and(predicates);
				}
				if(competences.size()>0){
					predicates= new Predicate[competences.size()*3];// 3 experience, niveau, indeffe, predicates[i] ligne 264
					System.out.println("size"+competences.size());
					int i=-1;
					for(CompetenceCandidat c:competences){
						System.out.println("comp "+i);
						i++;
						if(c.getExperience()!=null)
						{
						if(!c.getExperience().equalsIgnoreCase("Indifférent")){

							predicates[i]=cb.and(cb.equal(root.get("competences").get("experience"), c.getExperience()));
							
						}
						else{
							predicates[i]= cb.and(cb.isNotNull(root.get("competences").get("experience")));
						}
						i++;
						}
						if(c.getNiveau()!=null)
						{
						if(!c.getNiveau().equalsIgnoreCase("Indifférent")){

							predicates[i]=cb.and(cb.equal(root.get("competences").get("niveau"), c.getNiveau()));
							
						}
						else{
							predicates[i]=cb.and(cb.isNotNull(root.get("competences").get("niveau")));;
						}
						i++;
						}
						predicates[i]= cb.and(cb.equal(root.get("competences").get("competence").get("id"),c.getCompetence().getId()));
						//i++;
					}
			     return cb.and(predicates);
					
				}
			}
			 
		 };
	 }*/
	 
}
