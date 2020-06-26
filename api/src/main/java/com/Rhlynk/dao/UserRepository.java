package com.Rhlynk.dao;

import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Rhlynk.entities.Role;
import com.Rhlynk.entities.User;

public interface UserRepository  extends JpaRepository<User, String>{
@Query("select u from User u where u.class!='A'")	
Page<User> findAllUser(Pageable p);
@Query("select u from User u inner join u.role r where u.class!='A' and r.role=?1 ")	
Page<User> findAllUserByRole(Pageable p,String role);
public User findByUsername(String username);
public User findByEmail(String email);
public User findByUsernameAndEmail(String username,String email);
public User findByRole(Role r);
@Query("select u from User u where u.class='E'")	
public List<User> getEntreprises();
@Query("select u from User u where u.username=:username and u.class='E'")
public User getEntreprise(@Param("username") String username);
@Query("select u from User u where u.id=:id and u.class='C'") 
public User getCandidatById(Long id);

}
