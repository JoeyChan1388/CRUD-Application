import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import ManualRegistrationsCreate from './components/ManualRegistrationsCreate';
import SelfRegistrationsCreate from './components/SelfRegistrationsCreate';

function App() {
	return (
		<Router>
			<div className="App">
				<switch>
					<Route path="/Home">
						<Home />
					</Route>
					<Route path="/Registrations/Self/Create">
						<SelfRegistrationsCreate />
					</Route>
					<Route path="/Registrations/Manual/Create">
						<ManualRegistrationsCreate />
					</Route>
				</switch>
			</div>
		</Router>
	);
}

export default App;
