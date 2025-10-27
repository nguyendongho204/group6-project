import React from 'react';
import UserManager from './components/UserManager';


export default function App() {
return (
<div className="container">
<div className="header">
<h1>Group Project - Users (React + Node)</h1>
<small className="small">Backend: http://localhost:3000</small>
</div>
<UserManager />
</div>
);
}