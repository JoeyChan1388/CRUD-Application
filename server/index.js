const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

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
// When someone submits a registration form
app.post('/registrations/insert', (req, res) => {
	// Get values from the front end request
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const shirtSize = req.body.shirtSize;
	const clubName = req.body.clubName;
	const vehicleMake = req.body.vehicleMake;
	const vehicleModel = req.body.vehicleModel;
	const vehicleYear = req.body.vehicleYear;

	// Create insert into statement with placeholders
	const sqlInsertParticipant =
		'INSERT INTO tbl_Participants(participant_first_name, participant_last_name) VALUES(?,?);';
	const sqlInsertVehicle = 'INSERT INTO tbl_vehicles(vehicle_make, vehicle_model, vehicle_year) VALUES(?,?,?);';
	const sqlInsertRegistration =
		'INSERT INTO tbl_registrations(registration_shirt_size, registration_club_name, registration_participant_id, registration_vehicle_id) VALUES(?,?,?,?);';

	// execute statements with values in list filling the placeholders
	dbPool.query(sqlInsertParticipant, [ firstName, lastName ], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			//Vehicle Insert
			dbPool.query(sqlInsertVehicle, [ vehicleMake, vehicleModel, vehicleYear ], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					// Registration Insert
					dbPool.query(
						sqlInsertRegistration,
						[ shirtSize, clubName, result.insertId, result2.insertId ],
						(err3, result3) => {
							if (err3) {
								console.log(err3);
							} else {
								console.log(result3);
							}
						}
					);
				}
			});
		}
	});
});

// When server begins this will run
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
