package com.Rhlynk.entities;

import java.util.ArrayList;
import java.util.List;


public class Lists {





public static List <String> getNiveaux() {
	List <String>Niveaux=new ArrayList<>();
	Niveaux.add(new String("Débutant"));
	Niveaux.add(new String("Intermédiaire"));
	Niveaux.add(new String("Bon"));
	Niveaux.add(new String("Trés bon"));
	Niveaux.add(new String("Expert"));
	return Niveaux;
}

public static List <String> getExperiences() {
	List <String> Experiences=new ArrayList<>();
	Experiences.add(new String("Moins d'un an"));
	Experiences.add(new String("1 an"));
	Experiences.add(new String("2 ans"));
	Experiences.add(new String("3 ans"));
	Experiences.add(new String("4 ans"));
	Experiences.add( new String("5 ans"));
	Experiences.add( new String("+ de 5 ans"));
	return Experiences;
}
public static List <String> getTypeContrat() {
	List <String> typeContrat=new ArrayList<>();
	typeContrat.add(new String("Freelance"));
	typeContrat.add(new String("CDD"));
	typeContrat.add(new String("CDI"));
	typeContrat.add(new String("SVIP 1"));
	typeContrat.add(new String("SVIP 2"));
	return typeContrat;
}

public static List <String> getTypeFreelance() {
	List <String> typeFreelance=new ArrayList<>();
	typeFreelance.add(new String("plein temps"));
	typeFreelance.add(new String("Mi-temps"));
	return typeFreelance;
}
public static List <String> getLieux() {
	List <String> lieux=new ArrayList<>();
	lieux.add(new String("Tunis"));
	lieux.add(new String("Manouba"));
	lieux.add(new String("Ariana"));
	lieux.add(new String("Monastir"));
	lieux.add(new String("Sfax"));
	lieux.add(new String("Gabès"));
	lieux.add(new String("Nabeul"));
	return lieux;
}
public static List<String> getLieuxTravail(){
	List <String> lieuxTravail=new ArrayList<>();
	lieuxTravail.add(new String("Bureau"));
	lieuxTravail.add(new String("Télétravail"));
	lieuxTravail.add(new String("Les deux"));
	return lieuxTravail;
}
}
