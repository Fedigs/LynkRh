package com.Rhlynk.entities;

import com.View;
import com.View.CandidatRepView;
import com.fasterxml.jackson.annotation.JsonView;

public enum Difficulte {
@JsonView({View.LangageAndThemeView.class,CandidatRepView.class})
FACILE,MOYEN,DIFFICILE
}
