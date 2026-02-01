# Εφαρμογή Διαχείρισης Εξόδων (Expense Tracker)

Μια Full Stack διαδικτυακή εφαρμογή για την καταγραφή και διαχείριση των προσωπικών μας εξόδων. 
Ο κώδικας υλοποιήθηκε με βάση την **Αρχιτεκτονική Επιπέδων (Layered Architecture)**, 
χρησιμοποιώντας **Spring Boot** για το Backend και **React** για το Frontend.

## 🚀 Λειτουργικότητα

* **Προβολή Εξόδων:** Λίστα με όλα τα καταχωρημένα έξοδα που εμείς προσθέτουμε.
* **Προσθήκη:** Φόρμα εισαγωγής νέου εξόδου με επιλογή κατηγορίας (Φαγητό, Μεταφορά, Διασκέδαση, Καθημερινά, Άλλο).
* **Διαγραφή:** Δυνατότητα διαγραφής εξόδου από τη λίστα και τη βάση δεδομένων.
* **Μονιμότητα:** Αποθήκευση δεδομένων σε σχεσιακή βάση (H2 Database).

---

## 🛠 Τεχνολογίες & Αρχιτεκτονική

### Backend
* **Γλώσσα:** Java (JDK 21)
* **Framework:** Spring Boot 3.x
* **Data Access:** Spring Data JPA (Hibernate)
* **Database:** H2 (In-Memory SQL Database)
* **Δομή:**
    * `Controller`: Διαχειρίζεται τα HTTP Requests (GET, POST, DELETE).
    * `Entity`: Αντιστοιχίζει τις κλάσεις Java σε πίνακες της βάσης.
    * `Repository`: Εκτελεί τις εντολές SQL αυτόματα.

### Frontend
* **Library:** React.js
* **Στυλ γραφής:** Functional Components & Hooks (`useState`, `useEffect`).
* **Επικοινωνία:** Fetch API για κλήσεις προς τον Server.
* **Styling:** CSS.

---

## ⚙️ Οδηγίες Εκτέλεσης

## 1. Εκκίνηση Backend

### Ο server τρέχει στη θύρα **8080**.

1. Ανοίξτε τον φάκελο του project στο IntelliJ IDEA.
2. Εντοπίστε την κλάση `SpringExpensesSevApplication.java`.
3. Κάντε δεξί κλικ -> **Run**.
4. Βεβαιωθείτε ότι στην κονσόλα εμφανίζεται το μήνυμα
`Started SpringExpensesSevApplication`.
---

## 2. Start the Frontend (React)
### Ο client τρέχει στη θύρα **3000**.
1. Ανοίξτε τερματικό (Terminal).
2. Μεταβείτε στον φάκελο του frontend:
   `cd frontend`

3. (Μόνο για την πρώτη φορά) Εγκαταστήστε τις βιβλιοθήκες:
   `npm install`

4. Ξεκινήστε την εφαρμογή:
   `npm start`

5. Η σελίδα θα ανοίξει αυτόματα στο: `http://localhost:3000`

## 🔌 API Endpoints
Η επικοινωνία Frontend-Backend βασίζεται στα εξής REST endpoints:

| Μέθοδος | Διαδρομή (URI) | Περιγραφή |
| :--- | :--- | :--- |
| **GET** | `/expenses` | Επιστροφή όλων των εξόδων (JSON) |
| **POST** | `/expenses` | Δημιουργία νέου εξόδου |
| **DELETE** | `/expenses/{id}` | Διαγραφή εξόδου με βάση το ID |

---
## 📝 Σημαντικές Σημειώσεις Υλοποίησης
1. **Model-First Approach:** Η δομή της βάσης δεδομένων παράγεται αυτόματα από τον κώδικα Java (`@Entity`), 
χωρίς να χρειάζεται χειροκίνητη SQL.
2. **Enums:** Χρήση του `Category` Enum για την διασφάλιση της εγκυρότητας των δεδομένων (Data Integrity).
3. **CORS:** Έχει ρυθμιστεί το Cross-Origin Resource Sharing (`@CrossOrigin`) 
ώστε να επιτρέπεται η επικοινωνία μεταξύ των δύο διαφορετικών servers (Localhost 3000 & 8080).
