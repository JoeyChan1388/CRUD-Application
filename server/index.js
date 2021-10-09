const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const dbConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'timmycat1388',
	database: 'crud_db'
});

const dbPool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'timmycat1388',
	database: 'crud_db'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/insert', (req, res) => {
	console.log('Submitted!');

	// Get values from the front end
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	// Create insert into statement with placeholders
	const sqlInsert = 'INSERT INTO tbl_Participants(participant_first_name, participant_last_name) VALUES(?,?);';

	// execute statement with values in list filling the placeholders
	dbPool.query(sqlInsert, [ firstName, lastName ], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	});
});

app.listen(3001, () => {
	console.log('running on port 3001');

	//Database connect + check
	dbConnection.connect(dbConnection, (err) => {
		if (!err) {
			console.log('Connected to Database!');
		} else {
			console.log(err);
		}
	});
});
