import React, { useState } from 'react';


export default function AddUserForm({ onAdd }) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState('');


const validate = () => {
if (!name.trim()) return 'Name không được để trống';
if (!/\S+@\S+\.\S+/.test(email)) return 'Email không hợp lệ';
return '';
};


const handleSubmit = async (e) => {
e.preventDefault();
setError('');
const v = validate();
if (v) { setError(v); return; }
await onAdd({ name: name.trim(), email: email.trim() });
setName(''); setEmail('');
};


return (
<form onSubmit={handleSubmit} style={{marginBottom:12}}>
<div className="form-row">
<input value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
<input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
<button className="btn save" type="submit">Thêm</button>
</div>
{error && <div className="error">{error}</div>}
</form>
);
}