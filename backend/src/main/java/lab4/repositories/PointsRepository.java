package lab4.repositories;

import lab4.entities.Point;
import lab4.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PointsRepository extends CrudRepository<Point, Long> {
    List<Point> findAllByUser(User user);

}
