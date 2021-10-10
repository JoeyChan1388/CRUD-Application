import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import ParticipantsCreate from './components/ParticipantsCreate';

function App() {
	return (
		<Router>
			<div className="App">
				<switch>
					<Route path="/">
						<Home />
					</Route>
					<Route path="/Participants/Create">
						<ParticipantsCreate />
					</Route>
				</switch>
			</div>
		</Router>
	);
}

export default App;
