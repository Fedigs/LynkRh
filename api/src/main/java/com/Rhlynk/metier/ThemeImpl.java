package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Rhlynk.dao.ThemeRepository;
import com.Rhlynk.entities.Theme;
@Service
public class ThemeImpl implements ITheme {
	@Autowired
	private ThemeRepository themeRepository;
	@Override
	public List<Theme> getThemes() {
		// TODO Auto-generated method stub
		return themeRepository.findAll();
	}

}
