package com.brajesh.usermgmt.repository;

import com.brajesh.usermgmt.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
