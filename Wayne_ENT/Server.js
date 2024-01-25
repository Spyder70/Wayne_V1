import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors()); // CORS to enable run our backend in other ports also

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wayne_ent'
});

// To check the database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database!');
  }
});

app.use(express.json());
app.post('/wayne_ent', (req, res) => {
  const formData = req.body.formData;

  const sql = 'INSERT INTO clubs (form_data) VALUES (?)';

  connection.query(sql, [JSON.stringify(formData)], (err, result) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    } else {
      console.log('Form data saved successfully');
      res.status(200).json({ success: true });
    }
  });
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});