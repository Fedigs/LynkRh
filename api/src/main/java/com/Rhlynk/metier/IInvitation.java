package com.Rhlynk.metier;

import java.util.List;


import com.SotutechTestException;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.entities.InvitationId;
import org.springframework.mail.MailException;

public interface IInvitation {
public void add(List<Invitation> i) throws SotutechTestException ;
public void setInvitation(Invitation i) throws SotutechTestException;
public void deleteInvitation(Long id) throws SotutechTestException;
public List<Invitation> getinvitations(long idC);
public List<Invitation> candidatInvitations(String username);
public Invitation getInvitation(InvitationId id);
public void setStart(boolean start, InvitationId id );
public void sessionTest(InvitationId id,int duree);
public List<Invitation> getOffreInvitation(Long idOffre);
// l'envoi des cv anonymes vers l'entreprise
public void setEmail(List<Invitation> invitation);
void sendEmail(String email,String titreOffre,int n) throws MailException;
public List<Invitation> save(List<Invitation> invitation);
public void RemoveInvitation(InvitationId id);
}
