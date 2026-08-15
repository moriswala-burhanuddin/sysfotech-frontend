import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, BookOpen, CreditCard, Tag, GraduationCap, 
  Receipt, LogOut, Trash2, Search, Plus, X, Menu, Edit, Save, Eye, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://127.0.0.1:8000/api';

const TABS = [
  { id: 'students', label: 'Students', icon: Users, endpoint: 'students', desc: 'Manage your registered students' },
  { id: 'courses', label: 'Courses', icon: BookOpen, endpoint: 'courses', desc: 'Add or update course offerings' },
  { id: 'enrollments', label: 'Enrollments', icon: GraduationCap, endpoint: 'enrollments', desc: 'View student course enrollments' },
  { id: 'transactions', label: 'Transactions', icon: Receipt, endpoint: 'transactions', desc: 'Monitor successful payments' },
  { id: 'checkout-sessions', label: 'Checkouts', icon: CreditCard, endpoint: 'checkout-sessions', desc: 'Track pending and completed checkouts' },
  { id: 'coupons', label: 'Coupons', icon: Tag, endpoint: 'coupons', desc: 'Manage discount codes' },
];

const SCHEMAS: Record<string, any> = {
  students: { name: '', email: '', phone_number: '' },
  courses: { title: '', slug: '', description: '', price: 0, is_active: true },
  'checkout-sessions': { name: '', email: '', course: '', amount: 0, payment_provider: 'stripe', status: 'pending' },
  coupons: { code: '', discount_percentage: 0, max_uses: 100, is_active: true },
  enrollments: { student: '', course: '', amount: 0, status: 'paid', payment_provider: 'stripe' },
  transactions: { student: '', course: '', amount: 0, status: 'succeeded', payment_method: 'card' }
};

const READ_ONLY_FIELDS = ['id', 'created_at', 'updated_at', 'magic_link_token', 'uses_count'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
  const [currentRecord, setCurrentRecord] = useState<any>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = localStorage.getItem('adminToken');
  const adminUsername = localStorage.getItem('adminUsername');

  useEffect(() => {
    if (!token) { navigate('/admin-portal/login'); return; }
    fetchData();
    setSearchTerm('');
    setModalMode(null);
    setSidebarOpen(false);
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${activeTab.endpoint}/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (res.status === 401 || res.status === 403) { handleLogout(); return; }
      const result = await res.json();
      setData(result.results || result || []);
    } catch { toast({ title: 'Error fetching data', variant: 'destructive' }); }
    finally { setIsLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isCreate = modalMode === 'create';
    const url = isCreate 
      ? `${API_BASE}/${activeTab.endpoint}/`
      : `${API_BASE}/${activeTab.endpoint}/${currentRecord.id}/`;
    const payload = { ...currentRecord };
    READ_ONLY_FIELDS.forEach(f => delete payload[f]);

    try {
      const res = await fetch(url, {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await res.json();
      if (res.ok) {
        toast({ title: `Record ${isCreate ? 'created' : 'updated'} successfully!` });
        setModalMode(null);
        fetchData();
      } else {
        const msg = Object.values(resData).flat().join(', ');
        toast({ title: 'Validation Error', description: msg, variant: 'destructive' });
      }
    } catch { toast({ title: 'Error saving', variant: 'destructive' }); }
  };

  const handleDelete = async (id: number | string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!window.confirm('Delete this record permanently?')) return;
    try {
      const res = await fetch(`${API_BASE}/${activeTab.endpoint}/${id}/`, {
        method: 'DELETE', headers: { 'Authorization': `Token ${token}` }
      });
      if (res.ok || res.status === 204) {
        toast({ title: 'Record deleted' });
        setModalMode(null);
        fetchData();
      }
    } catch { toast({ title: 'Error deleting', variant: 'destructive' }); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin-portal/login');
  };

  const formatDate = (v: string) => {
    if (!v) return '-';
    const d = new Date(v);
    if (isNaN(d.getTime())) return v;
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(d);
  };

  const statusBadge = (val: any) => {
    const s = String(val).toLowerCase();
    const cls = ['paid','completed','active','success','true','succeeded'].includes(s)
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : ['pending','processing'].includes(s)
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : ['failed','cancelled','inactive','false'].includes(s)
      ? 'bg-red-50 text-red-700 border-red-200'
      : 'bg-slate-50 text-slate-600 border-slate-200';
    const label = typeof val === 'boolean' ? (val ? 'Active' : 'Inactive') : val;
    return <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold border ${cls}`}>{label}</span>;
  };

  const filtered = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const getHeaders = () => {
    if (data.length === 0) return [];
    const exclude = ['id', 'magic_link_token', 'password'];
    const keys = Object.keys(data[0]);
    // If readable name fields exist, hide the raw FK ID columns
    if (keys.includes('student_name')) exclude.push('student');
    if (keys.includes('course_title')) exclude.push('course');
    if (keys.includes('enrolled_courses')) exclude.push('enrolled_courses'); // show in detail modal only

    let h = keys.filter(k => !exclude.includes(k));
    const pri = ['name', 'student_name', 'title', 'code', 'email', 'student_email', 'course_title', 'amount', 'status', 'created_at'];
    h.sort((a, b) => {
      const ia = pri.indexOf(a), ib = pri.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return 0;
    });
    return h;
  };

  const formatCell = (header: string, value: any) => {
    if (header === 'status' || header === 'is_active') return statusBadge(value);
    if (header.includes('at') || header.includes('date')) return formatDate(value);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (header === 'amount' || header === 'price') return typeof value === 'number' ? `₹${value.toFixed(2)}` : value;
    if (value === null || value === undefined) return '-';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'None';
      return value.map((item: any) => typeof item === 'object' ? (item.course_title || JSON.stringify(item)) : item).join(', ');
    }
    if (typeof value === 'object') return JSON.stringify(value);
    const s = String(value);
    return s.length > 40 ? s.substring(0, 40) + '…' : s;
  };

  // Render enrolled_courses nicely in detail modal
  const renderEnrolledCourses = (courses: any[]) => {
    if (!courses || courses.length === 0) {
      return <span style={{ color: '#94a3b8' }}>No courses enrolled yet</span>;
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {courses.map((c: any, i: number) => (
          <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{c.course_title || '-'}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#64748b' }}>
              <span>Amount: <strong style={{ color: '#334155' }}>₹{c.amount}</strong></span>
              <span>Provider: <strong style={{ color: '#334155' }}>{c.payment_provider}</strong></span>
              <span>Status: {statusBadge(c.status)}</span>
              <span>Date: <strong style={{ color: '#334155' }}>{formatDate(c.enrolled_at)}</strong></span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ====== GLOBAL STYLES INLINE ====== */}
      <style>{`
        .admin-root { display: flex; height: 100vh; overflow: hidden; background: #f8fafc; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .admin-sidebar { width: 260px; min-width: 260px; background: #0f172a; color: #94a3b8; display: flex; flex-direction: column; overflow-y: auto; z-index: 40; }
        .admin-main { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: hidden; }
        @media (max-width: 768px) {
          .admin-sidebar { position: fixed; inset: 0; width: 280px; transform: translateX(-100%); transition: transform 0.3s ease; }
          .admin-sidebar.open { transform: translateX(0); }
        }
      `}</style>

      <div className="admin-root">
        {/* Mobile Overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* ====== SIDEBAR ====== */}
        <nav className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div style={{ padding: '28px 24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="white" />
                </div>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Admin Panel</span>
              </div>
              <button className="md:hidden" onClick={() => setSidebarOpen(false)} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>
          </div>

          <div style={{ padding: '0 16px', flex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 12px', marginBottom: 8 }}>Menu</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {TABS.map(tab => {
                const active = activeTab.id === tab.id;
                return (
                  <li key={tab.id} style={{ marginBottom: 4 }}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: active ? 600 : 500, transition: 'all 0.2s',
                        background: active ? '#6366f1' : 'transparent',
                        color: active ? 'white' : '#94a3b8',
                      }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#1e293b'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <tab.icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div style={{ padding: '20px 16px' }}>
            <div style={{ background: '#1e293b', borderRadius: 14, padding: '14px 16px', marginBottom: 12, border: '1px solid #334155' }}>
              <p style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>Logged in as</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{adminUsername}</p>
            </div>
            <button 
              onClick={handleLogout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px 16px', borderRadius: 12, border: '1px solid #334155',
                background: '#1e293b', color: 'white', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </nav>

        {/* ====== MAIN CONTENT ====== */}
        <div className="admin-main">
          {/* Header Bar */}
          <header style={{
            height: 70, background: 'white', borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button className="md:hidden" onClick={() => setSidebarOpen(true)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer' }}>
                <Menu size={20} color="#334155" />
              </button>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>{activeTab.label}</h2>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }} className="hidden md:block">{activeTab.desc}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative' }} className="hidden md:block">
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" placeholder="Search..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    paddingLeft: 38, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
                    background: '#f1f5f9', border: '1px solid transparent', borderRadius: 12,
                    fontSize: 14, width: 220, outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.border = '1px solid #6366f1'; e.target.style.background = 'white'; }}
                  onBlur={(e) => { e.target.style.border = '1px solid transparent'; e.target.style.background = '#f1f5f9'; }}
                />
              </div>
              <button 
                onClick={() => { setCurrentRecord(SCHEMAS[activeTab.endpoint] || {}); setModalMode('create'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                  background: '#6366f1', color: 'white', border: 'none', borderRadius: 12,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4f46e5'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#6366f1'}
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add New</span>
              </button>
            </div>
          </header>

          {/* Mobile Search */}
          <div className="md:hidden" style={{ padding: '12px 16px 0', background: '#f8fafc' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" placeholder={`Search ${activeTab.label}...`} value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none' }}
              />
            </div>
          </div>

          {/* Scrollable Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
              <div style={{ background: 'white', padding: '20px 24px', borderRadius: 16, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, margin: '0 0 4px' }}>Total {activeTab.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>{data.length}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <activeTab.icon size={22} color="#6366f1" />
                </div>
              </div>
            </div>

            {/* Table */}
            {isLoading && data.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
                <p style={{ color: '#64748b', fontWeight: 500 }}>Loading data…</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : data.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '80px 20px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <activeTab.icon size={28} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>No records yet</h3>
                <p style={{ color: '#64748b', maxWidth: 320, margin: '0 auto 20px' }}>Create a new record to start managing your data.</p>
                <button 
                  onClick={() => { setCurrentRecord(SCHEMAS[activeTab.endpoint] || {}); setModalMode('create'); }}
                  style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Add New Record
                </button>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, whiteSpace: 'nowrap' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        {getHeaders().map(h => (
                          <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {h.replace(/_/g, ' ')}
                          </th>
                        ))}
                        <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((row, idx) => (
                        <tr 
                          key={row.id || idx}
                          onClick={() => { setCurrentRecord({ ...row }); setModalMode('view'); }}
                          style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          {getHeaders().map(h => (
                            <td key={`${row.id}-${h}`} style={{ padding: '14px 20px', color: '#334155', fontWeight: 500 }}>
                              {formatCell(h, row[h])}
                            </td>
                          ))}
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setCurrentRecord({ ...row }); setModalMode('edit'); }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: '#6366f1', transition: 'background 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#eef2ff'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={(e) => handleDelete(row.id, e)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: '#94a3b8', transition: 'all 0.15s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={getHeaders().length + 1} style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8' }}>
                            No results matching "{searchTerm}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ====== MODAL ====== */}
        <AnimatePresence>
          {modalMode && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'white', borderRadius: 20, width: '100%', maxWidth: 560,
                  maxHeight: '85vh', display: 'flex', flexDirection: 'column',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden',
                }}
              >
                {/* Modal Header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                    {modalMode === 'view' ? <Eye size={20} color="#6366f1" /> : modalMode === 'create' ? <Plus size={20} color="#6366f1" /> : <Edit size={20} color="#6366f1" />}
                    {modalMode === 'create' ? `New ${activeTab.label.slice(0,-1)}` : modalMode === 'view' ? 'Record Details' : 'Edit Record'}
                  </h3>
                  <button onClick={() => setModalMode(null)} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
                  <form id="crud-form" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {Object.keys(currentRecord).map(key => {
                      const isRO = READ_ONLY_FIELDS.includes(key);
                      if (modalMode === 'create' && isRO) return null;
                      
                      // Hide raw FK ID fields when readable versions exist
                      const recordKeys = Object.keys(currentRecord);
                      if (key === 'student' && recordKeys.includes('student_name')) return null;
                      if (key === 'course' && recordKeys.includes('course_title')) return null;
                      // Hide read-only derived fields in edit mode
                      if (modalMode === 'edit' && ['student_name', 'student_email', 'student_phone', 'course_title', 'enrolled_courses'].includes(key)) return null;
                      if (modalMode === 'create' && ['student_name', 'student_email', 'student_phone', 'course_title', 'enrolled_courses'].includes(key)) return null;

                      const value = currentRecord[key];
                      const isView = modalMode === 'view';

                      // Special render for enrolled_courses array
                      if (key === 'enrolled_courses' && isView) {
                        return (
                          <div key={key} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 16 }}>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                              Enrolled Courses
                            </label>
                            {renderEnrolledCourses(value)}
                          </div>
                        );
                      }

                      return (
                        <div key={key} style={{ borderBottom: isView ? '1px solid #f1f5f9' : 'none', paddingBottom: isView ? 16 : 0 }}>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                            {key.replace(/_/g, ' ')}
                          </label>
                          
                          {isView || isRO || ['student_name', 'student_email', 'student_phone', 'course_title'].includes(key) ? (
                            <div style={{ fontSize: 15, color: '#0f172a', fontWeight: 500 }}>
                              {typeof value === 'boolean' ? statusBadge(value) :
                               (key.includes('at') || key.includes('date')) ? formatDate(value) :
                               (key === 'status' || key === 'is_active') ? statusBadge(value) :
                               Array.isArray(value) ? (value.length === 0 ? 'None' : value.map((v: any) => typeof v === 'object' ? (v.course_title || JSON.stringify(v)) : v).join(', ')) :
                               value?.toString() || '-'}
                            </div>
                          ) : typeof value === 'boolean' ? (
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                              <input 
                                type="checkbox" checked={value}
                                onChange={(e) => setCurrentRecord({...currentRecord, [key]: e.target.checked})}
                                style={{ width: 20, height: 20, accentColor: '#6366f1', cursor: 'pointer' }}
                              />
                              <span style={{ fontSize: 14, color: '#334155' }}>{value ? 'Active' : 'Inactive'}</span>
                            </label>
                          ) : typeof value === 'number' ? (
                            <input 
                              type="number" value={value || ''}
                              onChange={(e) => setCurrentRecord({...currentRecord, [key]: Number(e.target.value)})}
                              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 10, fontSize: 14, outline: 'none', transition: 'border 0.2s' }}
                              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          ) : (key === 'description') ? (
                            <textarea
                              value={value || ''} rows={3}
                              onChange={(e) => setCurrentRecord({...currentRecord, [key]: e.target.value})}
                              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border 0.2s' }}
                              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          ) : (
                            <input 
                              type="text" value={value || ''}
                              onChange={(e) => setCurrentRecord({...currentRecord, [key]: e.target.value})}
                              style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 10, fontSize: 14, outline: 'none', transition: 'border 0.2s' }}
                              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                          )}
                        </div>
                      );
                    })}
                  </form>
                </div>

                {/* Modal Footer */}
                <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  {modalMode === 'view' ? (
                    <>
                      <button onClick={() => handleDelete(currentRecord.id)} style={{ padding: '10px 20px', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                        Delete
                      </button>
                      <button onClick={() => setModalMode('edit')} style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Edit size={16} /> Edit Record
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setModalMode(currentRecord.id ? 'view' : null)} type="button" style={{ padding: '10px 20px', background: 'white', color: '#475569', border: '1px solid #d1d5db', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                        Cancel
                      </button>
                      <button type="submit" form="crud-form" style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Save size={16} /> Save
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminDashboard;
