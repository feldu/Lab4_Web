package lab4.controllers;

import lab4.entities.User;
import lab4.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid User user,
                                        BindingResult bindingResult) {
        try {
            log.debug("POST request to login user {}", user);
            if (bindingResult.hasErrors()) {
                log.error("Validation error");
                return new ResponseEntity<>("Ошибка валидации", HttpStatus.BAD_REQUEST);
            }
            String token = userService.getUserToken(user);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            log.error("Invalid user credentials {}", e.getMessage());
            return new ResponseEntity<>("Неверные учетные данные пользователя", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error {}", e.getMessage());
            return new ResponseEntity<>("Непредвиденная ошибка", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid User user,
                                           BindingResult bindingResult) {
        try {
            log.debug("POST request to register user {}", user);
            if (bindingResult.hasErrors()) {
                log.error("Validation error");
                return new ResponseEntity<>("Ошибка валидации", HttpStatus.BAD_REQUEST);
            }
            boolean isSaved = userService.saveUser(user);
            return isSaved ? new ResponseEntity<>("Пользователь зарегистрирован. Войдите :)", HttpStatus.OK) :
                    new ResponseEntity<>("Пользователь с таким именем уже существует", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error {}", e.getMessage());
            return new ResponseEntity<>("Непредвиденная ошибка", HttpStatus.BAD_REQUEST);
        }
    }
}
