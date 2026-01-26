package com.brajesh.usermgmt.service.impl;

import com.brajesh.usermgmt.entity.UserEntity;
import com.brajesh.usermgmt.model.User;
import com.brajesh.usermgmt.repository.UserRepository;
import com.brajesh.usermgmt.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    One constructor -> Spring uses it (even without @Autowired)
//    Multiple Constructors -> Spring may choose the no-arg constructor
    //    leaving the userRepository to be null causing NPE

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
        UserEntity saved = userRepository.save(userEntity);

        return new User(
                saved.getId(),
                saved.getFirstName(),
                saved.getLastName(),
                saved.getEmail()
        );
    }

    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();

        return userEntities.stream()
                .map(userEntity -> new User(
                        userEntity.getId(),
                        userEntity.getFirstName(),
                        userEntity.getLastName(),
                        userEntity.getEmail()
                ))
                .toList();
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("User not found!"));

//        findById(id) will give the Optional of User by we want to get a particular user of it hence using get()
        return new User(
                userEntity.getId(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getEmail()
        );
    }

    @Transactional
    @Override
    public Boolean deleteUser(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("User not found!"));
        userRepository.delete(user);
        return true;
    }

    @Transactional
    @Override
    public User updateUser(Long id, User updateUser) {
        UserEntity userEntity = userRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("User not found!"));

//        Entity controls mutation
        userEntity.updateProfile(
                updateUser.getFirstName(),
                updateUser.getLastName(),
                updateUser.getEmail()
        );

//        Hibernate will auto-update on transaction commit
//        No save() required, but safe if you prefer
//        userRepository.save(userEntity);

//        Convert back to model
        return new User(
                userEntity.getId(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getEmail()
        );
    }
}
