package com.Rhlynk.rest;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SotutechTestException;
import com.View;
import com.fasterxml.jackson.annotation.JsonView;
import com.Rhlynk.entities.Gestionnaire;
import com.Rhlynk.entities.User;
import com.Rhlynk.metier.IUser;
import com.Rhlynk.pojo.Users;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "true")
public class UserRest {
@Autowired
private IUser iUser;
@RequestMapping(value="/user")
public Object getCurrentUser(Principal p){

	User u= iUser.getUser(p.getName());
	Users user= new Users(u);
	if(u instanceof Gestionnaire){
		user.setFonctions(((Gestionnaire)u).getFonctions());
	}
	return user;
}
@RequestMapping(value="/user",method=RequestMethod.POST)
public Object addUser(@RequestBody @Valid User u, BindingResult bg)  {
	Map<String,Object> err= new HashMap<>();
	if(bg.hasErrors()){
		err.put("error", true);
		for(FieldError fe:bg.getFieldErrors()){
			err.put(fe.getField(), fe.getDefaultMessage());
		}
		return err;
	}
	try {
		 iUser.addUser(u);
		err.put("error", false);
		return err;
	} catch (SotutechTestException e) {
		// TODO Auto-generated catch block
		err.put("error", true);
		err.put(e.getField(), e.getMessage());
		return err;
	}
}
@RequestMapping(value="/updateUser",method=RequestMethod.POST)
public Object updateUser(@RequestBody @Valid User u,BindingResult bg) throws SotutechTestException {
	Map<String,Object> err= new HashMap<>();
	if(bg.hasErrors()){
		err.put("error", true);
		for(FieldError fe:bg.getFieldErrors()){
			err.put(fe.getField(), fe.getDefaultMessage());
		}
		return err;
	}
	try {
		return iUser.updateUser(u);
	} catch (SotutechTestException e) {
		// TODO Auto-generated catch block
		err.put("error", true);
		err.put(e.getField(), e.getMessage());
		return err;
	}
}
@RequestMapping(value="/user/activation",method=RequestMethod.PUT)
public Object activeUser(@RequestParam String username,@RequestParam boolean a) {
	iUser.activerUser(username,a);
	Map<String,Object> err= new HashMap<>();
	err.put("error", false);
	return err;
}
@RequestMapping(value="/user",method=RequestMethod.DELETE)
public Object deleteUser(@RequestParam String username) {
	Map<String,Object> err= new HashMap<>();
	
	iUser.deleteUser(username);
	err.put("error", false);
	return err;
}
@JsonView({View.UserView.class})
@RequestMapping("/users")
public Page<User> allUsers(@RequestParam int page,@RequestParam int size,@RequestParam(defaultValue="") String role) {
	return iUser.allUsers(new PageRequest(page, size),role);
}
@JsonView({View.UserView.class})
@RequestMapping("/entreprises")
public List<User> allEntreprises() {
	System.out.println(iUser.getEntreprises().size());
	return iUser.getEntreprises();
}

//
//@JsonView()
//@RequestMapping()
//public 

}
