package lab4.controllers;

import lab4.entities.Point;
import lab4.entities.User;
import lab4.services.PointsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/areas")
public class PointController {
    final PointsService pointsService;

    public PointController(PointsService pointsService) {
        this.pointsService = pointsService;
    }

    @PostMapping("/points")
    public ResponseEntity<String> addPoint(@AuthenticationPrincipal User user,
                                           @RequestBody @Valid Point point,
                                           BindingResult bindingResult) {
        try {
            log.debug("POST request to add point {}", point);
            if (bindingResult.hasErrors()) {
                log.error("Validation error");
                return new ResponseEntity<>("Ошибка валидации", HttpStatus.BAD_REQUEST);
            }
            point.setUser(user);
            if (pointsService.savePoint(point)) {
                return new ResponseEntity<>("Добавлена в БД", HttpStatus.OK);
            }
            return new ResponseEntity<>("Не удалось сохранить точку в БД", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Unexpected error {}", e.getMessage());
            return new ResponseEntity<>("Invalid data", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/points")
    public ResponseEntity<List<Point>> getPoints(@AuthenticationPrincipal User user) {
        log.debug("POST request to get all user's points");
        List<Point> points = pointsService.findAllPointsByUser(user);
        return new ResponseEntity<>(points, HttpStatus.OK);
    }
}
