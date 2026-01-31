import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]); //Δηλώνω μεταβλητές

  const [form, setForm] = useState({   //Δημιουργία μια φόρμας που τα πεδία τα τοποθετεί ο κάθε χρήστης
      description: '',
      amount: '',
      category: 'Φαγητό',
      date: new Date().toISOString().split('T')[0]
    });


  const handleDelete = (id) => {
   //Προσθέτω και ένα delete button στα έξοδα
   fetch(`http://localhost:8080/expenses/${id}`, {
   method: 'DELETE'
   })
   .then(() => {
   setExpenses(expenses.filter(exp => exp.id !== id));
   });
  };

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  //Φτιάχνω το στυλ που μου αρέσει για την σελίδα
  const StyleAlex = {
    padding: "20px",
    backgroundColor: "#86B47B", // Το χρώμα του pastel red. Το red έβγαινε πολύ κόκκινο και δεν μου ήταν καλό έτσι όπως το έβλεπα στην σελίδα.
    fontFamily: "Arial, sans-serif"
  };

  useEffect(() => {
    fetch('http://localhost:8080/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data));
  }, []);

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      fetch('http://localhost:8080/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      .then(res => res.json())
      .then(newExpense => {
        setExpenses([...expenses, newExpense]);
        setForm({ ...form, description: '', amount: '' });
      });
  };


  return (

    <div style={StyleAlex}>

      <h1>Tracker for Expenses</h1>


        <div style={{ background: "#FBF4D9", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
            <h3>Προσθέστε το έξοδο σας!</h3>
                <form onSubmit={handleSubmit}>

           <input
             type="text"
             name="description"
             placeholder="Περιγραφή (π.χ. Ψώνια)"
             value={form.description}
             onChange={handleChange}
             required
             style={{ marginRight: "10px" }}
           />

           <input
             type="number"
             name="amount"
             placeholder="Ποσό (€)"
             value={form.amount}
             onChange={handleChange}
             required
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
           </div>


            <ul>
              {expenses.map(exp => (
              <li key={exp.id || Math.random()}
                style={{
                marginBottom: "10px",
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
                  <div style={{ marginTop: "20px", fontSize: "1.5em", fontWeight: "bold", color: "black" }}>
                    Συνολικό Ποσό Εξόδων: {totalAmount.toFixed(2)}€
                  </div>

        </div>
        );
      }

export default App;