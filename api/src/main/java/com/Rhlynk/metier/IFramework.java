package com.Rhlynk.metier;

import java.util.List;

import com.SotutechTestException;
import com.Rhlynk.entities.Framework;

public interface IFramework {
public void addFramework(Framework f) throws SotutechTestException;
public void deleteFramework(Long id);
public Framework getFramework(Long id);
public List<Framework> getFramework(); 
public void editFramework(Framework f) throws SotutechTestException;
}
