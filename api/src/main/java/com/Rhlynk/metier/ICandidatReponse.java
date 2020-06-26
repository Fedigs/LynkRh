package com.Rhlynk.metier;

import java.util.List;

import com.Rhlynk.entities.CandidatReponse;
import com.Rhlynk.entities.Invitation;
import com.Rhlynk.pojo.QuestionCandReponse;

public interface ICandidatReponse {
public void addReponse(List<CandidatReponse> reponses);
public List<QuestionCandReponse> getCandidatreponse(Invitation invitation);
public void correction(Long id, boolean correcte, double score);
}
