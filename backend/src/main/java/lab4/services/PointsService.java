package lab4.services;

import lab4.entities.Point;
import lab4.entities.User;
import lab4.repositories.PointsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class PointsService {
    final PointsRepository pointsRepository;

    public PointsService(PointsRepository pointsRepository) {
        this.pointsRepository = pointsRepository;
    }

    public boolean savePoint(Point point) {
        try {
            String result = checkArea(point) ? "Попала" : "Не попала";
            point.setResult(result);
            pointsRepository.save(point);
            log.debug("Point {} saved in DB", point);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            log.debug("Can't save point in DB: {}", e.getMessage());
            return false;
        }
    }

    public List<Point> findAllPointsByUser(User user) {
        return pointsRepository.findAllByUser(user);
    }

    private Boolean checkArea(Point point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        if ((y == 0) && (x >= -r) && (x <= r)) return true;
        if (y > 0)
            return (x >= 0) && (y <= r - x); //triangle
        if (y < 0)
            return ((x >= 0) && (x * x + y * y <= r * r / 4d) //round
                    || (x <= 0) && (x >= -r) && (y >= -r)); //rectangle
        return false;
    }

}
