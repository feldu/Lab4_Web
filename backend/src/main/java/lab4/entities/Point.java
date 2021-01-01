package lab4.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "points")
public class Point {
    @Column(nullable = false)
    String result;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    @NotNull
    private Double x;
    @Column(nullable = false)
    @NotNull
    private Double y;
    @Column(nullable = false)
    @NotNull
    private Double r;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
