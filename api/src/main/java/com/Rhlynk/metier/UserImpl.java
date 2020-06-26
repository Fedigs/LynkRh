package com.Rhlynk.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.SotutechTestException;
import com.Rhlynk.dao.UserRepository;
import com.Rhlynk.entities.Admin;
import com.Rhlynk.entities.Entreprise;
import com.Rhlynk.entities.Gestionnaire;
import com.Rhlynk.entities.Role;
import com.Rhlynk.entities.User;
@Service
public class UserImpl implements IUser {
    @Autowired
    private UserRepository userRepository;
	@Override
	public User addUser(User u) throws SotutechTestException{
		// TODO Auto-generated method stub
		
		if(userRepository.findByUsername(u.getUsername())!=null) throw new SotutechTestException("username","Le username existe déjà");
		if(userRepository.findByEmail(u.getEmail())!=null) throw new SotutechTestException("email","L'email existe déjà");
		return userRepository.save(u);
	}

	@Override
	public void deleteUser(String username) {
		// TODO Auto-generated method stub
      userRepository.delete(username);
	}

	@Override
	public Page<User> allUsers(Pageable p,String role) {
		// TODO Auto-generated method stub
		if(role.equalsIgnoreCase("Entreprise")||role.equalsIgnoreCase("Candidat")||role.equalsIgnoreCase("Gestionnaire"))
		return userRepository.findAllUserByRole(p,role);
		else
			return userRepository.findAllUser(p);
	}

	@Override
	public User updateUser(User u) throws SotutechTestException {
		// TODO Auto-generated method stub
		User u1=userRepository.findByEmail(u.getEmail());
//		if(u1!=null){
//			if(!u1.getUsername().equals(u.getUsername())) throw new SotutechTestException("email","L'email existe déjà"); 
//		}
		System.out.println("user front end "+u);
		System.out.println("user back end"+u1);
		
		u1.setNom(u.getNom());
		u1.setEmail(u.getEmail());
		u1.setPassword(u.getPassword());
		u1.setTel(u.getTel());
		u1.setAdresse(u.getAdresse());
		u1.setRole(u.getRole());
		return userRepository.save(u1);
//		return userRepository.save(u1);
	}

	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
	}

	@Override
	public void activerUser(String username, boolean activ) {
		// TODO Auto-generated method stub
		User u= userRepository.findOne(username);
		u.setActived(activ);
		userRepository.save(u);
		
	}

	@Override
	public List<User> getEntreprises() {
		return userRepository.getEntreprises();
		
	}

	@Override
	public User getUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
	}

	@Override
	public User getEntreprise(String username) {
		// TODO Auto-generated method stub
		return userRepository.getEntreprise(username);
	}
	
	

}
