import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header';
import Home from './components/Home';
import Login from './components/Login';
import UsersCreate from './components/UsersCreate';
import ManualRegistrationsCreate from './components/ManualRegistrationsCreate';
import SelfRegistrationsCreate from './components/SelfRegistrationsCreate';
import { AuthProvider } from './contexts/AuthContext';

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
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
