import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header';
import Home from './components/Home';
import Login from './components/Login';
import UsersCreate from './components/UsersCreate';
import ManualRegistrationsCreate from './components/ManualRegistrationsCreate';
import SelfRegistrationsCreate from './components/SelfRegistrationsCreate';
import Donate from './components/Donate';
import SponsorshipCreate from './components/SponsorshipCreate';
import EventsRead from './components/EventsRead'
import { AuthProvider } from './contexts/AuthContext';
import EventsCreate from './components/EventsCreate';
import DonationsReciept from './components/DonationsReciept';
import EventsSummary from './components/EventsSummary';
import EventView from './components/EventView';

function App() {
	return (
		// Wrap in authprovider to give access to authenication services found in contexts/AuthContext
		<AuthProvider>
			<Router>
				<Header />
				<div className="App">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={UsersCreate} />
						<Route path="/Registrations/Manual" component={ManualRegistrationsCreate} />
						<Route path="/Registrations/Self" component={SelfRegistrationsCreate} />
						<Route path="/Donations/Create" component={Donate} />
						<Route path="/Donations/Reciept/:id" children={<DonationsReciept />} />
						<Route path="/Events/:id" children={<EventView />} />
						<Route exact path="/Sponsorships/Create" component={SponsorshipCreate} />
						<Route exact path="/Events" component={EventsRead} />
						<Route exact path="/Events/Create" component={EventsCreate} />
						<Route exact path="/Summary/Events" component={EventsSummary} />
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
