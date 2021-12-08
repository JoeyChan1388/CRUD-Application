const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const sqlInsertTransaction = 'INSERT INTO transactions(transaction_amount, transaction_type, transaction_date) VALUES (?, ?, now());'

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

app.post('/Sponsorshipprice/get', (req, res) => {
	const id = req.body.id;
	const sqlGetPrice = 'SELECT Sponsorship_Package_Price FROM sponsorship_packages WHERE Sponsorship_Package_ID = ?';

	dbPool.query(sqlGetPrice, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Found Package with ID of " + id)
			res.send(result);
		}
	})
})

app.get('/Events/get', (req, res) => {
	const sqlGetEvents = 'SELECT * FROM events'

	dbPool.query(sqlGetEvents, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success!');
			res.send(result);
		}
	});
});

app.post('/events/insert', (req, res) => {
	const eventAddress = req.body.eventAddress;
	const eventDate = req.body.eventDate;
	const eventName = req.body.eventName;
	const organizerFirstName = req.body.organizerFirstName;
	const organizerLastName = req.body.organizerLastName;

	const sqlInsertEvent = 'INSERT INTO events(Event_Address, Event_Date, Event_Name, Event_Organizer_First_Name, Event_Organizer_Last_Name) VALUES(?,?,?,?,?);';

	dbPool.query(sqlInsertEvent, [eventAddress, eventDate, eventName, organizerFirstName, organizerLastName], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success!');
		}
	});
});

app.get('/packages/get', (req, res) => {
	const sqlGetPackages = 'SELECT * FROM sponsorship_packages'

	dbPool.query(sqlGetPackages, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success!');
			res.send(result);
		}
	});
});

// Insert A User
app.post('/users/insert', (req, res) => {
	const userid = req.body.userid;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;
	const address = req.body.address;

	const sqlInsertUser =
		'INSERT INTO users(user_id, user_first_name, user_last_name, user_email_address, user_phone_number, user_address) VALUES(?,?,?,?,?,?);';

	// execute statements with values in list filling the placeholders
	dbPool.query(sqlInsertUser, [userid, firstName, lastName, email, phoneNumber, address], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success!');
		}
	});
});

// Routes
// When someone submits a registration form
app.post('/registrations/insert', (req, res) => {
	// Get values from the front end request
	const shirtSize = req.body.shirtSize;
	const clubName = req.body.clubName;
	const vehicleMake = req.body.vehicleMake;
	const vehicleModel = req.body.vehicleModel;
	const vehicleYear = req.body.vehicleYear;

	const userid = req.body.userid;
	const eventid = req.body.eventid;
	const transactionid = 0;

	// Create insert into statement with placeholders
	const sqlInsertVehicle = 'INSERT INTO vehicles(vehicle_make, vehicle_model, vehicle_year) VALUES(?,?,?);';
	const sqlInsertRegistration =
		'INSERT INTO registrations(registration_shirt_size, registration_club_name, registration_event_id, registration_user_id, registration_vehicle_id, registration_transaction_id) VALUES(?,?,?,?,?,?);';

	// execute statements with values in list filling the placeholders
	// Vehicle Insert (Needs rollback in case registration isnt made along with it)
	dbPool.query(sqlInsertVehicle, [vehicleMake, vehicleModel, vehicleYear], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			// Registration Insert
			dbPool.query(
				sqlInsertRegistration,
				[shirtSize, clubName, eventid, userid, result.insertId, transactionid],
				(err2, result2) => {
					if (err2) {
						console.log(err2);
					} else {
						console.log(result2);
					}
				}
			);
		}
	});
});

// When someone submits a donation form
app.post('/Donations/insert', (req, res) => {
	const eventid = req.body.eventid;
	const donorid = req.body.userid;
	const donationAmount = req.body.amount;
	//const charityid = req.body.charityid;

	const sqlInsertDonation =
		'INSERT INTO donations(donation_transaction_id, donation_user_id, donation_event_id) VALUES(?,?,?);';

	dbPool.query(sqlInsertTransaction, [donationAmount, 'ONLINE'], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			dbPool.query(sqlInsertDonation, [result.insertId, donorid, eventid], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					console.log('Success!');
				}
			})
		}
	})
})

// When someone submits a sponsorship form
app.post('/Sponsorships/insert', (req, res) => {
	const organization = req.body.organization;
	const eventid = req.body.eventid;
	const sponsorid = req.body.userid;
	const sponsorshipPackageID = req.body.packageid;

	const sqlInsertSponsorship =
		'INSERT INTO sponsorships(sponsorship_organization, sponsorship_event_id, sponsorship_sponsor_id, sponsorship_package_id) VALUES(?,?,?,?);';

	dbPool.query(sqlInsertSponsorship, [organization, eventid, sponsorid, sponsorshipPackageID], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success!');
		}
	})
})

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
