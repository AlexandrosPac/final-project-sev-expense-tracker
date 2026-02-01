import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [expenses, setExpenses] = useState([]); //Δηλώνω μεταβλητές
    const [errorMessage, setErrorMessage] = useState('');

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
        // Εμφανίζει παράθυρο διαλόγου Ναι/Όχι
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

    //Φτιάχνω το στυλ που μου αρέσει για την σελίδα
    const StyleAlex = {
        padding: "20px",
        backgroundColor: "#585123",                     // Το χρώμα του pastel red. Το red έβγαινε πολύ κόκκινο και δεν μου ήταν καλό έτσι όπως το έβλεπα στην σελίδα.
        fontFamily: "Arial, sans-serif"
    };



  return (

    <div style={StyleAlex}>

      <h1 style={{ textAlign: "center", color: "white" }} >Tracker for Expenses</h1>


        <div style={{ background: "#a9b3ce", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
            <h3>Προσθέστε το έξοδο σας!</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

           <input
             type="text"
             name="description"
             placeholder="Περιγραφή (π.χ. Ψώνια)"
             value={form.description}
             onChange={handleChange}
             style={{ marginRight: "10px" }}
           />

           <input
             type="number"
             name="amount"
             placeholder="Ποσό (€)"
             value={form.amount}
             onChange={handleChange}
             style={{ marginRight: "10px", width: "80px" }}
           />


           <select name="category" value={form.category} onChange={handleChange} style={{ marginRight: "10px" }}>
             <option value="Φαγητό">Φαγητό</option>
             <option value="Μεταφορά">Μεταφορά</option>
             <option value="Διασκέδαση">Διασκέδαση</option>
             <option value="Καθημερινά">Καθημερινά</option>
             <option value="Άλλο">Άλλο</option>
           </select>

           <input
             type="date"
             name="date"
             value={form.date}
             onChange={handleChange}
             style={{ marginRight: "10px" }}
           />

               <button type="submit">Προσθήκη</button>
             </form>

           {errorMessage && (
                <div style={{
                    color: "white",
                    marginTop: "10px",
                    fontWeight: "bold",
                    backgroundColor: "#880d1e",
                    padding: "10px",
                    borderRadius: "4px",
                    textAlign: "center" }}>
                {errorMessage}
                </div>
           )}
           </div>


            <ul style={{ listStyle: "none", padding: 0 }}>
              {expenses.map(exp => (
              <li key={exp.id || Math.random()}
                style={{
                backgroundColor: getCategoryColor(exp.category),
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center"
                }}>


                <button
                  onClick={() => handleDelete(exp.id)}
                  style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  marginRight: "10px",
                  fontWeight: "bold"
                  }}>X
                </button>
                   <span>
                    <strong>{exp.category}</strong>: {exp.description} - {exp.amount}€ <small>({exp.date})</small>
                   </span>
              </li>
             ))}
            </ul>

            <hr />
                  <div style={{ marginTop: "20px", fontSize: "1.5em", fontWeight: "bold", color: "white" }}>
                    Συνολικό Ποσό Εξόδων: {totalAmount.toFixed(2)}€
                  </div>

        </div>
        );
      }

export default App;