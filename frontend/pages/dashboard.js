import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';
import NoteItem from '../components/NoteItem';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null); // {id,email,role,tenant,plan}
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const [tenantPlan, setTenantPlan] = useState('free');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (!t || !u) return router.push('/');
    setToken(t);
    try { setUser(JSON.parse(u)); setTenantPlan(JSON.parse(u).plan || 'free'); } catch(e){ router.push('/'); }
  }, []);

  useEffect(() => {
    if (token) loadAll();
  }, [token]);

  async function loadAll() {
    setLoading(true);
    try {
      const n = await api('/notes', token);
      setNotes(n);

      // fetch latest tenant plan to reflect upgrades immediately
      const tenant = await api(`/tenants/${user.tenant}`, token);
      setTenantPlan(tenant.plan);

    } catch (err) {
      if (err.message === 'Not authorized, token failed' || err.message === 'No token, authorization denied') {
        logout();
      } else {
        console.error(err);
        setMsg(err.message || JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function createNote() {
    setMsg('');
    try {
      const created = await api('/notes', token, 'POST', { title, content });
      setNotes(prev => [created, ...prev]);
      setTitle(''); setContent('');
    } catch (err) {
      setMsg(err.message || (err.error || JSON.stringify(err)));
    }
  }

  async function deleteNote(id) {
    if (!confirm('Delete note?')) return;
    try {
      await api(`/notes/${id}`, token, 'DELETE');
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      setMsg(err.message || JSON.stringify(err));
    }
  }

  async function upgrade() {
    setMsg('');
    try {
      await api(`/tenants/${user.tenant}/upgrade`, token, 'POST');
      setTenantPlan('pro');
      // update user stored plan
      const u = { ...user, plan: 'pro' };
      localStorage.setItem('user', JSON.stringify(u));
      setUser(u);
      setMsg('Upgraded to Pro — you can now create unlimited notes.');
    } catch (err) {
      setMsg(err.message || JSON.stringify(err));
    }
  }

  function logout() {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    router.push('/');
  }

  const freeReached = tenantPlan === 'free' && notes.length >= 3;

  return (
    <div className="wrap">
      <header>
        <div>
          <h2>Notes — Tenant: {user?.tenant} ({tenantPlan})</h2>
          <div>Logged in as: <strong>{user?.email}</strong> ({user?.role})</div>
        </div>
        <div>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </header>

      <main>
        {msg && <div className="msg">{msg}</div>}

        <section className="create">
          <input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea placeholder="content" value={content} onChange={e=>setContent(e.target.value)} />
          <button className='create-note-button' onClick={createNote} disabled={freeReached && user?.role !== 'admin'}>Create note</button>
        </section>

        {freeReached && (
          <div className="upgrade">
            <strong>Free plan limit reached (3 notes).</strong>
            {user?.role === 'admin' ? (
              <button onClick={upgrade} className="btn-primary">Upgrade to Pro (Admin)</button>
            ) : (
              <div>Ask your tenant admin to upgrade to Pro.</div>
            )}
          </div>
        )}

        <section className="list">
          {loading ? <p>Loading...</p> : (notes.length === 0 ? <p>No notes yet</p> :
            notes.map(n => <NoteItem key={n._id} note={n} onDelete={deleteNote} />)
          )}
        </section>
      </main>

      
    </div>
  );
}
