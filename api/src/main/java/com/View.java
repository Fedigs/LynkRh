package com;

public interface View {

// cette vue est utilisée pour filter les attributs au moment du listing des statuts des candidats
public interface Statut{}	
// cette vue est utilisée pour filter les attributs au moment de l'initialisation des lieux
public interface Lieux{}	
// cette vue est utilisée pour filter les attributs au moment du listing d'un candidat inviter pour un entretien definitif
public interface CandidatInviter{}	
// cette vue est utilisée pour filter les attributs au moment du listing des Invitations		
public interface CvAnonyme{}	
// cette vue est utilisée pour filter les attributs au moment du listing des Candidats	
public interface CandidatMatching{}	
// cette vue est utilisée pour filter les attributs au moment du listing des Offres
public interface AllOffers{}
// cette vue est utilisée pour filter les attributs au moment du listing des entretiens
public interface EntretienView{}	
// cette vue est utilisée pour filter les attributs au moment du listing des users
public interface UserView{}
//cette vue est utilisée pour afficher les données concernant la langage et theme au moment de la création d'une question
public interface LangageAndThemeView{}
//cette vue est utilisée pour afficher les données lorsqu'on veut modifier une question 
public interface QuestionView{}
//cette vue est utilisée pour afficher les données lorsque le candidat commence le test
public interface QuestionOfTestView{}
//cette vue est utilisée pour afficher les données concernant les statistiques sur le nbre de question pour un langage 
public interface QuestionWithStatsView{}
// pour afficher la liste des campagnes
public interface CampagneView{};
//pour afficher une campagne pour la modifcation par exemple
public interface CampagneView1 extends CampagneView{};
//pour afficher une campagne pour la modifcation par exemple
public interface InvitationView{};
//pour afficher une les compétences au moment de l'inscription du candidat
public interface CompetenceView{};
//pour afficher  candidat pour la recherche 
public interface CandidatView{};
//pour afficher  test dans la liste des questions
public interface TestView {}
//pour afficher les info du test
public interface TestView1 {}
//pour afficher les réponses d'une question
public interface ReponseView {}
//pour afficher une les compétences pour la modification du framework
public interface CompetenceView1{};
//pour afficher une les compétences pour la modification du framework
public interface CandidatCvView{};
public interface BlocNoteView{};
public interface CandidatInvitationView{};
//pour afficher une les compétences coté backend pour la gestion
public interface CompetenceView2{};
//pour afficher les droit d'un user
public interface DroitView{};
//pour afficher les details d'un user loggé
public interface LoginView{};
//pour afficher le profile du candidat
public interface CandidatProfileView{};
//pour afficher le profile du candidat
public interface LangageView{};
//pour afficher le profile du candidat
public interface initValuesView{};
//offres coté backend
public interface offresView{}
//offres coté backend
public interface offreView{}
//offres coté backend
public interface offreInfoView{}
//invitations coté backend pour les resultats des test
public interface invitationTestView{}
// reponse du candidat pour afficher les resultats
public interface CandidatRepView{}
}
