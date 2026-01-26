package com.brajesh.usermgmt.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

//    Constructor for creating new users
    public UserEntity(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public UserEntity() {
    }

//    Hibernate doesn't use your parametrized constructor when reading from the DB.
//    When it executes: SELECT * FROM users
//    Hibernate:
//      Allocates an empty object
//      Uses reflection
//      Sets fields directly
//    For this, it must be able to do: new UserEntity();
//    If it can't -> crash.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String email;

//    Intent-based update
    public void updateProfile(String firstName, String lastName, String email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}
