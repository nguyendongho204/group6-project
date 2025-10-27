import React, { useState } from 'react';


export default function EditUserForm({ user, onCancel, onSave }) {
const [name, setName] = useState(user.name || '');
const [email, setEmail] = useState(user.email || '');
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
// use user.id or user._id
const id = user.id || user._id;
await onSave(id, { name: name.trim(), email: email.trim() });
};


return (
<div style={{marginTop:16, padding:12, border:'1px solid #eee', borderRadius:8}}>
<h3>Chỉnh sửa user</h3>
<form onSubmit={handleSubmit} className="form-row">
<input value={name} onChange={e => setName(e.target.value)} />
<input value={email} onChange={e => setEmail(e.target.value)} />
<button className="btn save" type="submit">Lưu</button>
<button type="button" className="btn cancel" onClick={onCancel} style={{marginLeft:8}}>Hủy</button>
</form>
{error && <div className="error">{error}</div>}
</div>
);
}