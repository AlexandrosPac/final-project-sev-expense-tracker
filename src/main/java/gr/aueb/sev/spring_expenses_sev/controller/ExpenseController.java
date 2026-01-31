package gr.aueb.sev.spring_expenses_sev.controller;

import gr.aueb.sev.spring_expenses_sev.entity.Expense;
import gr.aueb.sev.spring_expenses_sev.repository.ExpenseRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseRepo repository;

    public ExpenseController(ExpenseRepo repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return repository.findAll();
    }

    @PostMapping
    public Expense saveExpense(@RequestBody Expense expense) {
        return repository.save(expense);
    }
}