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

app.post('/EventRevenue/get', (req, res) => {
	const id = req.body.id;
	const sqlGetTransactionAmountForRegistrations = 'SELECT Transaction_Amount from transactions WHERE transaction_id IN (SELECT Registration_Transaction_ID FROM registrations WHERE Registration_Event_ID = ?);'
	const sqlGetTransactionAmountForDonations = 'SELECT Transaction_Amount from transactions WHERE transaction_id IN (SELECT Donation_Transaction_ID FROM donations WHERE Donation_Event_ID = ?);'
	const sqlGetTransactionAmountForSponsorships = 'SELECT Transaction_Amount from transactions WHERE transaction_id IN (SELECT Sponsorship_Transaction_ID FROM sponsorships WHERE sponsorship_Event_ID = ?);'

	dbPool.query(sqlGetTransactionAmountForDonations, [id], (err, result) => {
		if (err) {
			console.log(err)
		} else {
			dbPool.query(sqlGetTransactionAmountForSponsorships, [id], (err2, result2) => {
				if (err2) {
					console.log(err2)
				} else {
					dbPool.query(sqlGetTransactionAmountForRegistrations, [id], (err3, result3) => {
						if (err3) {
							console.log(err3)
						} else {
							const revenueAmounts = {
								registrationsAmount: result3,
								donationsAmount: result,
								sponsorshipsAmount: result2,
							}

							res.send(revenueAmounts)
						}
					})
				}
			})
		}
	})
})

app.post('/EventInfo/get', (req, res) => {
	const id = req.body.id;
	const sqlGetEvent = 'SELECT * FROM events WHERE Event_ID = ?';
	const sqlParticipantCount = 'SELECT COUNT(*) AS participants FROM registrations WHERE registration_event_id = ?;'
	const sqlDonationsCount = 'SELECT COUNT(*) AS donations FROM donations WHERE donation_event_id = ?;'
	const sqlSponsorshipsCount = 'SELECT COUNT(*) AS sponsorships FROM sponsorships WHERE sponsorship_event_id = ?;'

	dbPool.query(sqlGetEvent, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			dbPool.query(sqlParticipantCount, [id], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					dbPool.query(sqlDonationsCount, [id], (err3, result3) => {
						if (err3) {
							console.log(err3)
						} else {
							dbPool.query(sqlSponsorshipsCount, [id], (err4, result4) => {
								if (err4) {
									console.log(err4)
								} else {
									const EventInfo = {
										eventData: result,
										participantCount: result2,
										donationCount: result3,
										sponsorshipCount: result4
									}
									res.send(EventInfo);
								}
							})
						}
					})
				}
			})
		}
	})
})

app.post('/donation/get', (req, res) => {
	const id = req.body.id;
	const sqlGetDonation = 'SELECT * FROM donations WHERE Donation_ID = ?';
	const sqlGetUser = 'SELECT * FROM users WHERE User_ID = ?';
	const sqlGetEvent = 'SELECT * FROM events WHERE Event_ID = ?';
	const sqlGetTransaction = 'SELECT * FROM transactions WHERE Transaction_ID = ?';

	dbPool.query(sqlGetDonation, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			dbPool.query(sqlGetUser, [result[0].Donation_User_ID], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					dbPool.query(sqlGetEvent, [result[0].Donation_Event_ID], (err3, result3) => {
						if (err3) {
							console.log(err3);
						} else {

							dbPool.query(sqlGetTransaction, [result[0].Donation_Transaction_ID], (err4, result4) => {
								if (err4) {
									console.log(err4);
								} else {
									const DonationInfo = {
										transactionData: result4,
										eventData: result3,
										userData: result2,
										donationData: result
									}

									console.log(DonationInfo);
									res.send(DonationInfo);
								}
							})
						}
					})
				}
			})
		}
	})
})

app.post('/user/get', (req, res) => {
	const id = req.body.id;
	const sqlGetUser = 'SELECT * FROM users WHERE User_ID = ?';

	dbPool.query(sqlGetUser, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Found user with ID of " + id)
			res.send(result);
		}
	})
})

app.post('/SponsorshipPackage/get', (req, res) => {
	const id = req.body.id;
	const sqlGetPackage = 'SELECT * FROM sponsorship_packages WHERE Sponsorship_Package_ID = ?';

	dbPool.query(sqlGetPackage, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	})
})

app.post('/Event/get', (req, res) => {
	const id = req.body.id;
	const sqlGetEvent = 'SELECT * FROM events WHERE Event_ID = ?';

	dbPool.query(sqlGetEvent, [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	})
})

app.get('/Charities/get', (req, res) => {
	const sqlGetCharities = 'SELECT * FROM charities'

	dbPool.query(sqlGetCharities, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

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
	const registrationPrice = req.body.price

	const userid = req.body.userid;
	const eventid = req.body.eventid;

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
			// Transaction Insert
			dbPool.query(sqlInsertTransaction, [registrationPrice, 'CASH'], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					// Registration Insert
					dbPool.query(
						sqlInsertRegistration,
						[shirtSize, clubName, eventid, userid, result.insertId, result2.insertId],
						(err3, result3) => {
							if (err3) {
								console.log(err3);
							} else {
								console.log(result3);
							}
						}
					);
				}
			})
		}
	});
});

// Insert A User + Registration info
app.post('/manualregistrations/insert', (req, res) => {
	const userid = req.body.userid;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phoneNumber = req.body.phoneNumber;
	const address = req.body.address;
	const shirtSize = req.body.shirtSize;
	const clubName = req.body.clubName;
	const vehicleMake = req.body.vehicleMake;
	const vehicleModel = req.body.vehicleModel;
	const vehicleYear = req.body.vehicleYear;
	const eventid = req.body.eventid;
	const registrationPrice = 50;

	const sqlInsertUser =
		'INSERT INTO users(user_id, user_first_name, user_last_name, user_email_address, user_phone_number, user_address) VALUES(?,?,?,?,?,?);';
	const sqlInsertVehicle = 'INSERT INTO vehicles(vehicle_make, vehicle_model, vehicle_year) VALUES(?,?,?);';
	const sqlInsertRegistration =
		'INSERT INTO registrations(registration_shirt_size, registration_club_name, registration_event_id, registration_user_id, registration_vehicle_id, registration_transaction_id) VALUES(?,?,?,?,?,?);';

	// execute statements with values in list filling the placeholders
	dbPool.query(sqlInsertUser, [userid, firstName, lastName, email, phoneNumber, address], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Added User!');
			dbPool.query(sqlInsertVehicle, [vehicleMake, vehicleModel, vehicleYear], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					// Transaction Insert
					dbPool.query(sqlInsertTransaction, [registrationPrice, 'CASH'], (err3, result3) => {
						if (err3) {
							console.log(err3);
						} else {
							// Registration Insert
							dbPool.query(
								sqlInsertRegistration,
								[shirtSize, clubName, eventid, userid, result2.insertId, result3.insertId],
								(err4, result4) => {
									if (err4) {
										console.log(err4);
									} else {
										console.log(result4);
									}
								}
							);
						}
					})

				}
			});
		}
	});
});

// When someone submits a donation form
app.post('/Donations/insert', (req, res) => {
	const eventid = req.body.eventid;
	const donorid = req.body.userid;
	const donationAmount = req.body.amount;
	const charityid = req.body.charityid;

	const sqlInsertDonation =
		'INSERT INTO donations(donation_transaction_id, donation_user_id, donation_event_id, donation_charity_id) VALUES(?,?,?,?);';

	dbPool.query(sqlInsertTransaction, [donationAmount, 'ONLINE'], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			dbPool.query(sqlInsertDonation, [result.insertId, donorid, eventid, charityid], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					console.log('Success!');
					res.send(result2);
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
	const paymentAmount = req.body.price;

	const sqlInsertSponsorship =
		'INSERT INTO sponsorships(sponsorship_organization, sponsorship_event_id, sponsorship_sponsor_id, sponsorship_package_id, sponsorship_transaction_id) VALUES(?,?,?,?,?);';

	dbPool.query(sqlInsertTransaction, [paymentAmount, 'ONLINE'], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			dbPool.query(sqlInsertSponsorship, [organization, eventid, sponsorid, sponsorshipPackageID, result.insertId], (err2, result2) => {
				if (err2) {
					console.log(err2);
				} else {
					console.log('Success!');
				}
			})
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
