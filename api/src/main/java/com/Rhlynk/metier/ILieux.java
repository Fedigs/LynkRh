package com.Rhlynk.metier;

import java.util.List;

import com.Rhlynk.entities.Lieux;

public interface ILieux {
	public List<Lieux> getLieux();
	public Lieux getLieuxById(Long id);
}
