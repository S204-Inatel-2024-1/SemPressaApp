package com.sempressa.backend.service;

import com.sempressa.backend.domain.user.dto.UserDTO;
import com.sempressa.backend.infra.security.ResourceNotFoundException;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        return convertToDTO(userRepository.save(user));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setRegistration(userDTO.getRegistration());
            user.setRole(userDTO.getRole());
            user.setPhotoUrl(userDTO.getPhotoUrl());
            return convertToDTO(userRepository.save(user));
        }).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRegistration(user.getRegistration());
        userDTO.setRole(user.getRole());
        userDTO.setPhotoUrl(user.getPhotoUrl());
        return userDTO;
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setRegistration(userDTO.getRegistration());
        user.setRole(userDTO.getRole());
        user.setPhotoUrl(userDTO.getPhotoUrl());
        return user;
    }
}
