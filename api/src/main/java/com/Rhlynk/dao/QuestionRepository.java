package com.Rhlynk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.Rhlynk.entities.Question;
import com.Rhlynk.entities.Test;
import com.Rhlynk.entities.Type;
import com.Rhlynk.entities.User;

public interface QuestionRepository extends JpaRepository<Question, Long>,JpaSpecificationExecutor<Question>{
public List<Question> findByType(Type t);
public List<Question> findByCreateBy(User u);
}
