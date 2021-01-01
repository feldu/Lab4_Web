package lab4.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
    @GetMapping("/auth")
    public String auth() {
        return "forward:/index.html";
    }

    @GetMapping("/areas")
    public String areas() {
        return "forward:/index.html";
    }
}
