import React from "react";

import "./App.css";
import Header from "./header";
import Activity from "./Activity";

function App() {
	return (
		<div>
			<Header />
			<div className='App'>
				<Activity />
			</div>
		</div>
	);
}

export default App;
