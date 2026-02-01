import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [expenses, setExpenses] = useState([]); //Δηλώνω μεταβλητές
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [form, setForm] = useState({   //Δημιουργία μια φόρμας που τα πεδία τα τοποθετεί ο κάθε χρήστης
        description: '',
        amount: '',
        category: 'Φαγητό',
        date: new Date().toISOString().split('T')[0]
    });


    useEffect(() => {
        fetch('http://localhost:8080/expenses')
        .then(response => response.json())
        .then(data => setExpenses(data));
    }, []);

    const handleChange = (e) => {
        setErrorMessage('');
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
            e.preventDefault();
            if (!form.description.trim() || !form.amount || Number(form.amount) <= 0) {
                  setErrorMessage("Παρακαλώ συμπληρώστε σωστά την περιγραφή και το ποσό!");
                  return;
            }

            setErrorMessage('');

            fetch('http://localhost:8080/expenses', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(form)
            })
            .then(res => {
                if (!res.ok) {
                        throw new Error("Κάτι πήγε λάθος με την αποθήκευση");
                        }
                        return res.json();
                })
                .then(newExpense => {
                    setExpenses([...expenses, newExpense]);
                    setForm({ ...form, description: '', amount: '' , category: 'Φαγητό'});
                })
                .catch(error => {
                    console.error("Error:", error);
                    setErrorMessage("Υπάρχει πρόβλημα σύνδεσης με τον Server!");
                });

    };
    const handleDelete = (id) => {
        // Εμφανίζει ένα παράθυρο διαλόγου Ναι/Όχι
        if (window.confirm("Είστε σίγουρος για την διαγραφή του εξόδου σας;")) {

          fetch(`http://localhost:8080/expenses/${id}`, {
            method: 'DELETE'
          })
          .then(() => {
            setExpenses(expenses.filter(exp => exp.id !== id));
          });
        }
      };

    const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

    const getCategoryColor = (category) => {
        switch(category) {
          case 'Φαγητό': return '#ffadad';              // Απαλό Κόκκινο
          case 'Μεταφορά': return '#ffd6a5';            // Απαλό Πορτοκαλί
          case 'Διασκέδαση': return '#fdffb6';          // Απαλό Κίτρινο
          case 'Καθημερινά': return '#9bf6ff';          // Απαλό Γαλάζιο
          case 'Άλλο': return '#bdb2ff';                // Απαλό Μωβ
          default: return '#e0e0e0';                    // Γκρι (Ασφάλεια)
        }
      };

return (
     <div className="app-container">

       <h1 className="app-title">Tracker for Expenses</h1>

         <div className="form-container">
             <h3>Προσθέστε το έξοδο σας!</h3>

             <form onSubmit={handleSubmit} className="form-layout">

                <input
                  type="text"
                  name="description"
                  placeholder="Περιγραφή (π.χ. Ψώνια)"
                  className="form-input"
                  value={form.description}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Ποσό (€)"
                  className="form-input input-amount"
                  value={form.amount}
                  onChange={handleChange}
                />

                <div className="dropdown-container">

                <div
                    className="dropdown-header"
                    onClick={() => setIsOpen(!isOpen)} // Όταν πατάς, ανοίγει/κλείνει
                  >
                    {form.category} {/* Δείχνει την τρέχουσα επιλογή */}
                    <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
                </div>

                {isOpen && (
                    <ul className="dropdown-list">
                      {["Φαγητό", "Μεταφορά", "Διασκέδαση", "Καθημερινά", "Άλλο"].map((option) => (
                        <li
                          key={option}
                          className="dropdown-item"
                          onClick={() => {
                            setForm({ ...form, category: option });
                            setIsOpen(false);
                          }}
                        >{option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={form.date}
                  onChange={handleChange}
                />

                <button type="submit" className="add-button">Προσθήκη</button>
             </form>

            {errorMessage && (
                 <div className="error-message">
                     {errorMessage}
                 </div>
            )}
            </div>

             <ul className="expense-list">
               {expenses.map(exp => (
               <li key={exp.id || Math.random()}
                   className="expense-item"
                   style={{ backgroundColor: getCategoryColor(exp.category) }}
               >
                 <button
                   onClick={() => handleDelete(exp.id)}
                   className="delete-btn"
                 >x
                 </button>
                    <span>
                     <strong>{exp.category}</strong>: {exp.description} - {exp.amount}€ <small>({exp.date})</small>
                    </span>
               </li>
              ))}
             </ul>

             <div className="total-amount">
                 Συνολικό Ποσό Εξόδων: {totalAmount.toFixed(2)}€
             </div>

     </div>
   );
 }

 export default App;