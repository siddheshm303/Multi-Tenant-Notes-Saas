import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const data = await api('/auth/login', null, 'POST', { email, password });
      // data: { token, user: { id, email, role, tenant, plan } }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (error) {
      setErr(error.message || (error.error || JSON.stringify(error)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Notes SaaS — Login</h1>
      <form onSubmit={submit} className="form">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" required />
        <button className='button-login' type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {err && <p className="err">{err}</p>}
      </form>

      <p style={{marginTop:16}}>
        Test accounts: <br/>
        <code>admin@acme.test / password</code> <br/>
        <code>user@acme.test / password</code> <br/>
        <code>admin@globex.test / password</code> <br/>
        <code>user@globex.test / password</code>
      </p>

    </div>
  );
}
