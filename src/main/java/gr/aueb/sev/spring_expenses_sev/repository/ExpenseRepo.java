package gr.aueb.sev.spring_expenses_sev.repository;

import gr.aueb.sev.spring_expenses_sev.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Long> {
}