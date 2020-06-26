package com.Rhlynk.metier;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.SotutechTestException;
import com.Rhlynk.entities.User;

public interface IUser {
public User addUser(User u) throws SotutechTestException ;
public void deleteUser(String username);
public Page<User> allUsers(Pageable p,String role);
public User updateUser(User u) throws SotutechTestException ;
public User getUser(String username);
public User getUserByUsername(String username);
public void activerUser(String u,boolean activ);
public List<User> getEntreprises();
public User getEntreprise(String username);
}
