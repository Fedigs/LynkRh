package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.Rhlynk.entities.Entretien;

public interface IEntretienRepository extends JpaRepository<Entretien, Long> {
}
