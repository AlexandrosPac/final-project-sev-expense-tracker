package gr.aueb.sev.spring_expenses_sev.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description; //Περιγραφή του προϊόντος
    private Double amount;      // Ποσό του προϊόντος
    private String category;    // Σε τι κατηγορία μπορεί να τοποθετηθεί το προϊόν
    private LocalDate date;     // Πότε προστέθηκε το προϊόν
}