package com.sempressa.backend.service;

import com.sempressa.backend.domain.user.UserDTO;
import com.sempressa.backend.domain.user.User;
import com.sempressa.backend.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }

    public UserDTO createUser(UserDTO userDTO) {
        // Codifica a senha
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        userDTO.setPassword(encodedPassword);

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
        }).orElseThrow();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setName(user.getName());
        userDTO.setPassword(user.getPassword());
        userDTO.setEmail(user.getEmail());
        userDTO.setRegistration(user.getRegistration());
        userDTO.setRole(user.getRole());
        if(user.getPhotoUrl() != null) {
            userDTO.setPhotoUrl(user.getPhotoUrl());
        }
        return userDTO;
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setPassword(userDTO.getPassword());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setRegistration(userDTO.getRegistration());
        user.setRole(userDTO.getRole());
        if(userDTO.getPhotoUrl() != null){
            user.setPhotoUrl(userDTO.getPhotoUrl());
        }

        return user;
    }
}
