package com.Rhlynk.security;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Rhlynk.dao.UserRepository;
import com.Rhlynk.entities.Gestionnaire;
import com.Rhlynk.entities.User;
import com.Rhlynk.pojo.Users;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Authenticate a user from the database.
 */
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailsService.class);

    
     
    @Autowired
    private UserRepository userRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login)  {
    	User user=userRepo.findByUsername(login);
        if (user == null) {
            throw new UsernameNotFoundException("User " + login + " was not found in the database");
        } else if (!user.isActived()) {
            throw new UserNotEnabledException("User " + login + " was not enabled");
        }
        
        // create the spring security user       
        Users u= new Users(user.getUsername(), user.getNom(), user.getRole().getRole(),true);
 	    if(user instanceof Gestionnaire){
 			u.setFonctions(((Gestionnaire)user).getFonctions());
 		}
        return  u;
    }
}
