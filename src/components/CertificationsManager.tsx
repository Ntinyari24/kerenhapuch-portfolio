import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CertificationsManager: React.FC = () => {
  const [certs, setCerts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [credentialUrl, setCredentialUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCerts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/certifications`);
      if (res.ok) {
        const data = await res.json();
        setCerts(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  // update preview when a file is selected
  useEffect(() => {
    if (!file) { setPreviewSrc(null); return; }
    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(String(reader.result));
    reader.readAsDataURL(file);
    return () => { /* noop */ };
  }, [file]);

  const handleAdd = async () => {
    if (!title || !issuer || !date) return alert('title, issuer and date required');
    setLoading(true);
    try {
      let imageUrl = null;
      if (file) {
        const form = new FormData();
        form.append('file', file as any);
        const up = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/upload`, { method: 'POST', body: form });
        if (!up.ok) {
          const errBody = await up.json().catch(() => ({}));
          alert(errBody.error || 'Image upload failed');
          setLoading(false);
          return;
        }
        const j = await up.json();
        imageUrl = j.url;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/certifications`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, issuer, date, description, imageUrl, credentialUrl })
      });

      if (res.ok) {
        setTitle(''); setIssuer(''); setDate(''); setDescription(''); setFile(null); setCredentialUrl(''); setPreviewSrc(null);
        fetchCerts();
        // notify other windows/tabs/frontend to refresh certifications
        try { localStorage.setItem('portfolio_certs', Date.now().toString()); } catch (e) {}
        alert('Certification added');
      } else {
        const body = await res.json().catch(() => ({}));
        alert(body.error || 'Failed to add certification');
      }
    } catch (err) { console.error(err); alert('Error adding certification'); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/certifications/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCerts();
      else alert('Delete failed');
    } catch (err) { console.error(err); }
  };

  // when deleting notify other windows
  const handleDeleteWithNotify = async (id: string) => {
    await handleDelete(id);
    try { localStorage.setItem('portfolio_certs', Date.now().toString()); } catch (e) {}
  };

  return (
    <div>
      <div className="mb-6 grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-6 rounded-lg border border-gray-700">
          <h4 className="font-semibold mb-3">Add Certification</h4>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 rounded bg-slate-900 text-white placeholder-gray-400" />
          <input value={issuer} onChange={e => setIssuer(e.target.value)} placeholder="Issuer" className="w-full mb-2 p-2 rounded bg-slate-900 text-white placeholder-gray-400" />
          <input value={date} onChange={e => setDate(e.target.value)} placeholder="Date" className="w-full mb-2 p-2 rounded bg-slate-900 text-white placeholder-gray-400" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full mb-2 p-2 rounded bg-slate-900 text-white placeholder-gray-400" />
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
          {previewSrc && (
            <div className="mt-2">
              <img src={previewSrc} alt="preview" className="w-32 h-20 object-contain rounded-md border" />
            </div>
          )}
          <input value={credentialUrl} onChange={e => setCredentialUrl(e.target.value)} placeholder="Credential URL (link to digital certificate)" className="w-full mt-2 mb-2 p-2 rounded bg-slate-900 text-white placeholder-gray-400" />
          <div className="mt-3">
            <Button onClick={handleAdd} className="bg-green-600">{loading ? 'Adding...' : 'Add Certification'}</Button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Existing Certifications</h4>
          <div className="space-y-3">
            {certs.map(c => (
              <div key={c.id} className="bg-slate-800 p-4 rounded border border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-slate-900 rounded overflow-hidden flex items-center justify-center">
                    {c.imageUrl ? (
                      <img
                        src={c.imageUrl.startsWith('http') ? c.imageUrl : `${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}${c.imageUrl.startsWith('/') ? '' : '/'}${c.imageUrl}`}
                        alt={c.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-sm text-white">No image</div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-white">{c.issuer} — {c.date}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => window.open(c.credentialUrl, '_blank')} disabled={!c.credentialUrl}>View</Button>
                  <Button onClick={() => handleDeleteWithNotify(c.id)} variant="destructive">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsManager;
