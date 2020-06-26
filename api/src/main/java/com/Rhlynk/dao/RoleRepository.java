package com.Rhlynk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Rhlynk.entities.Role;

public interface RoleRepository extends JpaRepository<Role, String> {

}
