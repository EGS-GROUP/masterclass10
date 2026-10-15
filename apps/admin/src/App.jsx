import React, { useState, useEffect } from 'react';

// Default initial burgers for fallback
const FALLBACK_BURGERS = [
  { id: 1, name: 'Rey de las Burgers', category: 'Especiales', price: 14.99, stock: 45, specialty_badge: '👑 Especialidad Suprema', specialty_level: 'Legendaria', calories: 920, prep_time: '8-10 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Burger Real Clásica', category: 'Clásicas', price: 9.99, stock: 65, specialty_badge: '⭐ Clásica de la Casa', specialty_level: 'Signature', calories: 680, prep_time: '6-8 min', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Burger Real Doble', category: 'Dobles', price: 12.99, stock: 50, specialty_badge: '🔥 Doble Carne Smash', specialty_level: 'Doble Smash', calories: 840, prep_time: '7-9 min', image: 'https://images.unsplash.com/photo-1583032015879-c558c42b827e?w=500&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Burger Doble Especial', category: 'Especiales', price: 13.99, stock: 38, specialty_badge: '🥓 Especial Doble Bacon', specialty_level: 'Doble Bacon', calories: 960, prep_time: '8-10 min', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Burger Crispy Chicken Master', category: 'Pollo & Crispy', price: 11.49, stock: 42, specialty_badge: '🍗 Pollo Crujiente Oro', specialty_level: 'Crujiente', calories: 710, prep_time: '7-9 min', image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Burger Rapid BBQ Bacon', category: 'Especiales', price: 11.99, stock: 55, specialty_badge: '🔥 Ahumado Intenso', specialty_level: 'Ahumada BBQ', calories: 820, prep_time: '6-8 min', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Burger Mega Trufada', category: 'Gourmet', price: 15.99, stock: 25, specialty_badge: '💎 Selección Gourmet', specialty_level: 'Gourmet Exclusiva', calories: 880, prep_time: '9-11 min', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Burger Tex-Mex Spicy Fire', category: 'Especiales', price: 12.49, stock: 35, specialty_badge: '🌶️ Nivel Picante Alto', specialty_level: 'Picante Kick', calories: 790, prep_time: '7-9 min', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=80' },
  { id: 9, name: 'Burger Veggie Green Power', category: 'Veggie', price: 10.99, stock: 30, specialty_badge: '🌱 100% Plant-Based', specialty_level: 'Plant-Based', calories: 540, prep_time: '6-8 min', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&auto=format&fit=crop&q=80' },
  { id: 10, name: 'Burger Smash Clásica Simple', category: 'Clásicas', price: 8.99, stock: 70, specialty_badge: '🍔 Clásica Tradicional', specialty_level: 'Tradicional', calories: 590, prep_time: '5-7 min', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=80' }
];

// Default initial consumers for fallback
const FALLBACK_CONSUMERS = [
  { id: 1, name: 'Carlos Mendoza', email: 'carlos.m@gmail.com', phone: '+52 55 1234 5678', ordersCount: 28, totalSpent: 412.50, tier: 'VIP Platinum', favoriteBurger: 'Rey de las Burgers', lastOrderDate: '2026-10-14 19:30', status: 'Activo' },
  { id: 2, name: 'Mariana Silva', email: 'mariana.silva@outlook.com', phone: '+52 55 2345 6789', ordersCount: 21, totalSpent: 298.80, tier: 'VIP Gold', favoriteBurger: 'Burger Doble Especial', lastOrderDate: '2026-10-14 18:15', status: 'Activo' },
  { id: 3, name: 'Rodrigo Gómez', email: 'rodrigo.gz@hotmail.com', phone: '+52 55 3456 7890', ordersCount: 16, totalSpent: 224.50, tier: 'VIP Gold', favoriteBurger: 'Burger Real Doble', lastOrderDate: '2026-10-13 21:00', status: 'Activo' },
  { id: 4, name: 'Valeria Herrera', email: 'valeria.h@yahoo.com', phone: '+52 55 4567 8901', ordersCount: 11, totalSpent: 148.90, tier: 'Recurrente Silver', favoriteBurger: 'Burger Real Clásica', lastOrderDate: '2026-10-13 14:20', status: 'Activo' },
  { id: 5, name: 'Diego Torres', email: 'diego.torres@gmail.com', phone: '+52 55 5678 9012', ordersCount: 8, totalSpent: 109.90, tier: 'Recurrente Silver', favoriteBurger: 'Burger Mega Trufada', lastOrderDate: '2026-10-12 20:45', status: 'Activo' },
  { id: 6, name: 'Sofía Castro', email: 'sofia.castro@gmail.com', phone: '+52 55 6789 0123', ordersCount: 5, totalSpent: 67.50, tier: 'Frecuente Bronze', favoriteBurger: 'Burger Crispy Chicken Master', lastOrderDate: '2026-10-11 13:10', status: 'Inactivo' },
  { id: 7, name: 'Alejandro Morales', email: 'alejandro.m@live.com', phone: '+52 55 7890 1234', ordersCount: 4, totalSpent: 54.00, tier: 'Frecuente Bronze', favoriteBurger: 'Burger Tex-Mex Spicy Fire', lastOrderDate: '2026-10-10 19:50', status: 'Activo' },
  { id: 8, name: 'Camila Peña', email: 'camila.pena@icloud.com', phone: '+52 55 8901 2345', ordersCount: 2, totalSpent: 28.98, tier: 'Nuevo', favoriteBurger: 'Burger Veggie Green Power', lastOrderDate: '2026-10-09 15:30', status: 'Activo' },
  { id: 9, name: 'Esteban Ruiz', email: 'esteban.ruiz@gmail.com', phone: '+52 55 9012 3456', ordersCount: 1, totalSpent: 14.99, tier: 'Nuevo', favoriteBurger: 'Rey de las Burgers', lastOrderDate: '2026-10-08 21:10', status: 'Inactivo' },
  { id: 10, name: 'Lucía Navarro', email: 'lucia.navarro@gmail.com', phone: '+52 55 0123 4567', ordersCount: 1, totalSpent: 8.99, tier: 'Nuevo', favoriteBurger: 'Burger Smash Clásica Simple', lastOrderDate: '2026-10-07 12:40', status: 'Activo' }
];

export default function App() {
  const [serverHealth, setServerHealth] = useState(null);
  const [products, setProducts] = useState(FALLBACK_BURGERS);
  const [consumers, setConsumers] = useState(FALLBACK_CONSUMERS);
  const [consumerMetrics, setConsumerMetrics] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'consumers' | 'database'
  const [consumerFilterTier, setConsumerFilterTier] = useState('Todos');
  const [consumerSearch, setConsumerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Burger form state
  const [newBurger, setNewBurger] = useState({
    name: '',
    category: 'Especiales',
    price: '',
    stock: 50,
    specialty_badge: '👑 Nueva Especialidad',
    specialty_level: 'Gourmet',
    prep_time: '8-10 min',
    calories: 800,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    description: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchAllData = () => {
    // 1. Health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerHealth(data))
      .catch(err => console.warn('Health err:', err.message));

    // 2. Products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(err => console.warn('Products err:', err.message));

    // 3. Consumers
    fetch('/api/consumers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setConsumers(data.data);
        }
      })
      .catch(err => console.warn('Consumers err:', err.message));

    // 4. Metrics
    fetch('/api/metrics/consumers')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setConsumerMetrics(data.data);
        }
      })
      .catch(err => console.warn('Metrics err:', err.message));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Update Stock in-line
  const handleStockChange = async (id, delta) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const newStock = Math.max(0, target.stock + delta);

    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
      });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
      showToast(`Stock actualizado para "${target.name}": ${newStock} un.`);
    } catch {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
    }
  };

  // Add new burger
  const handleCreateBurger = async (e) => {
    e.preventDefault();
    if (!newBurger.name || !newBurger.price) {
      alert('Nombre y precio son requeridos');
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBurger)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setProducts(prev => [data.data, ...prev]);
      } else {
        setProducts(prev => [{ ...newBurger, id: Date.now(), price: parseFloat(newBurger.price) }, ...prev]);
      }
      setIsAddModalOpen(false);
      showToast(`✅ "${newBurger.name}" agregada a la carta.`);
      setNewBurger({
        name: '',
        category: 'Especiales',
        price: '',
        stock: 50,
        specialty_badge: '👑 Nueva Especialidad',
        specialty_level: 'Gourmet',
        prep_time: '8-10 min',
        calories: 800,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
        description: ''
      });
    } catch {
      setProducts(prev => [{ ...newBurger, id: Date.now(), price: parseFloat(newBurger.price) }, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  // Reset initial data
  const handleResetCatalog = async () => {
    if (!window.confirm('¿Restablecer el catálogo a las 10 hamburguesas oficiales?')) return;
    try {
      await fetch('/api/reset', { method: 'POST' });
      fetchAllData();
      showToast('🔄 Catálogo restablecido con éxito.');
    } catch (err) {
      alert('Error restableciendo datos: ' + err.message);
    }
  };

  // Compute metrics if not fetched
  const totalRevenue = consumerMetrics?.totalRevenue || consumers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalConsumers = consumerMetrics?.totalConsumers || consumers.length;
  const totalOrders = consumerMetrics?.totalOrders || consumers.reduce((acc, c) => acc + c.ordersCount, 0);
  const avgTicket = consumerMetrics?.averageTicket || (totalOrders > 0 ? (totalRevenue / totalOrders) : 0);
  const totalStockUnits = products.reduce((acc, p) => acc + (p.stock || 0), 0);

  // Filtered consumers
  const filteredConsumers = consumers.filter(c => {
    const matchesTier = consumerFilterTier === 'Todos' || c.tier.includes(consumerFilterTier);
    const matchesSearch = c.name.toLowerCase().includes(consumerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(consumerSearch.toLowerCase()) ||
      c.favoriteBurger.toLowerCase().includes(consumerSearch.toLowerCase());
    return matchesTier && matchesSearch;
  });

  // Filtered products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(productSearch.toLowerCase())) ||
    (p.specialty_badge && p.specialty_badge.toLowerCase().includes(productSearch.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f19', color: '#f8fafc', padding: '24px 32px' }}>
      
      {/* Top Admin Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        paddingBottom: '20px',
        borderBottom: '1px solid #1e293b',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '2rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(37, 99, 235, 0.2))',
            padding: '8px 12px',
            borderRadius: '12px',
            border: '1px solid #1e293b'
          }}>
            🍔
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0, color: '#ffffff' }}>
              Hamburger Rapid &bull; Panel de Operaciones
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Control de Inventario de Hamburguesas, Métricas de Consumidores y Estado de Base de Datos
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="/"
            style={{
              background: '#131b2e',
              border: '1px solid #1e293b',
              color: '#f8fafc',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '600'
            }}
          >
            🌐 Ver Landing E-commerce
          </a>
          <a
            href="/app"
            style={{
              background: '#131b2e',
              border: '1px solid #1e293b',
              color: '#38bdf8',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '600'
            }}
          >
            📱 Abrir PWA Móvil
          </a>
          <button
            onClick={fetchAllData}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            🔄 Actualizar Datos
          </button>
        </div>
      </header>

      {/* KPI Cards Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* KPI 1 */}
        <div style={{ background: '#131b2e', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Consumo Total Facturado</span>
            <span style={{ fontSize: '1.2rem' }}>💰</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fbbf24' }}>
            ${totalRevenue.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: '600' }}>
            ↑ +18.4% vs mes anterior
          </div>
        </div>

        {/* KPI 2 */}
        <div style={{ background: '#131b2e', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Consumidores Registrados</span>
            <span style={{ fontSize: '1.2rem' }}>👥</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#38bdf8' }}>
            {totalConsumers} Clientes
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            3 VIP Gold / Platinum activos
          </div>
        </div>

        {/* KPI 3 */}
        <div style={{ background: '#131b2e', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Ticket Promedio / Pedido</span>
            <span style={{ fontSize: '1.2rem' }}>🧾</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>
            ${avgTicket.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
            Basado en {totalOrders} compras registradas
          </div>
        </div>

        {/* KPI 4 */}
        <div style={{ background: '#131b2e', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Hamburguesas en Carta</span>
            <span style={{ fontSize: '1.2rem' }}>🍔</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>
            {products.length} Variantes
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '4px' }}>
            {totalStockUnits} unidades totales en stock
          </div>
        </div>
      </div>

      {/* Database Status Banner Component */}
      <div style={{
        background: 'linear-gradient(135deg, #131b2e 0%, #172033 100%)',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            fontSize: '2rem',
            background: serverHealth?.database?.connected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: serverHealth?.database?.connected ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            padding: '10px 14px',
            borderRadius: '12px'
          }}>
            {serverHealth?.database?.mode === 'mysql' ? '🐬' : '⚡'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Infraestructura &bull; Estado de la Base de Datos:
              </span>
              <span style={{
                background: serverHealth?.database?.connected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: serverHealth?.database?.connected ? '#10b981' : '#fbbf24',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: '800'
              }}>
                {serverHealth?.database?.mode === 'mysql' ? 'PRODUCCIÓN MYSQL ACTIVO' : 'MODO IN-MEMORY RESILIENTE'}
              </span>
            </div>

            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
              {serverHealth?.database?.mode === 'mysql'
                ? `MySQL 8.0 Conectado en Host: ${serverHealth?.database?.host}`
                : 'Servidor Operando en Memoria de Alto Rendimiento (Local / Docker CI/CD)'}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
              Base de Datos: <strong>{serverHealth?.database?.database || 'demo'}</strong> &bull; Pool Conexiones: {serverHealth?.database?.activePoolConnections ?? 1} &bull; Uptime: {Math.round(serverHealth?.uptime || 0)}s
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleResetCatalog}
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#e2e8f0',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            🌱 Reset Catálogo Oficial
          </button>
          <a
            href="/api/health"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>🩺 Ver JSON Health</span>
          </a>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            background: activeTab === 'inventory' ? '#2563eb' : '#131b2e',
            color: activeTab === 'inventory' ? '#ffffff' : '#94a3b8',
            border: activeTab === 'inventory' ? '1px solid #3b82f6' : '1px solid #1e293b',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🍔 Hamburguesas Disponibles ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('consumers')}
          style={{
            background: activeTab === 'consumers' ? '#2563eb' : '#131b2e',
            color: activeTab === 'consumers' ? '#ffffff' : '#94a3b8',
            border: activeTab === 'consumers' ? '1px solid #3b82f6' : '1px solid #1e293b',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>📊 Consumidores Según Consumo ({consumers.length})</span>
        </button>
      </div>

      {/* ================= SECTION 1: HAMBURGUESAS DISPONIBLES ================= */}
      {activeTab === 'inventory' && (
        <div className="fade-in">
          {/* Header & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <div style={{ flex: 1, minWidth: '260px', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="🔍 Filtrar por nombre, categoría o badge..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: '#131b2e',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#f8fafc',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)'
              }}
            >
              <span>+ Nueva Hamburguesa</span>
            </button>
          </div>

          {/* Table of Available Burgers */}
          <div style={{
            background: '#131b2e',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#0e1526', borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '14px 18px' }}>Hamburguesa</th>
                    <th style={{ padding: '14px 18px' }}>Categoría</th>
                    <th style={{ padding: '14px 18px' }}>Especialidad / Badge</th>
                    <th style={{ padding: '14px 18px' }}>Precio</th>
                    <th style={{ padding: '14px 18px' }}>Stock Disponible</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Ajuste de Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #1e293b', transition: 'background 0.2s' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #1e293b' }}
                          />
                          <div>
                            <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '0.95rem' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>⏱️ {p.prep_time || '8 min'} &bull; 🔥 {p.calories || 750} kcal</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: 'rgba(56, 189, 248, 0.1)',
                          color: '#38bdf8',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '700'
                        }}>
                          {p.category}
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#fbbf24',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '800'
                        }}>
                          {p.specialty_badge || '🍔 Especial'}
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px', fontWeight: '800', color: '#fbbf24', fontSize: '1.05rem' }}>
                        ${Number(p.price).toFixed(2)}
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: p.stock > 30 ? 'rgba(16, 185, 129, 0.15)' : p.stock > 10 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: p.stock > 30 ? '#10b981' : p.stock > 10 ? '#fbbf24' : '#ef4444',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          display: 'inline-block'
                        }}>
                          {p.stock > 0 ? `🟢 ${p.stock} unidades` : '🔴 Agotado'}
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => handleStockChange(p.id, -5)}
                            style={{
                              background: '#1f2937',
                              border: '1px solid #374151',
                              color: '#f8fafc',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            -5
                          </button>
                          <button
                            onClick={() => handleStockChange(p.id, 5)}
                            style={{
                              background: '#2563eb',
                              border: 'none',
                              color: 'white',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            +5
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: CONSUMIDORES SEGÚN CONSUMO ================= */}
      {activeTab === 'consumers' && (
        <div className="fade-in">
          {/* Tiers Distribution Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {[
              { tier: 'VIP Platinum', min: '>$350', count: consumers.filter(c => c.tier === 'VIP Platinum').length, total: consumers.filter(c => c.tier === 'VIP Platinum').reduce((a,c)=>a+c.totalSpent,0), color: '#a855f7' },
              { tier: 'VIP Gold', min: '$200 - $350', count: consumers.filter(c => c.tier === 'VIP Gold').length, total: consumers.filter(c => c.tier === 'VIP Gold').reduce((a,c)=>a+c.totalSpent,0), color: '#fbbf24' },
              { tier: 'Recurrente Silver', min: '$100 - $200', count: consumers.filter(c => c.tier === 'Recurrente Silver').length, total: consumers.filter(c => c.tier === 'Recurrente Silver').reduce((a,c)=>a+c.totalSpent,0), color: '#94a3b8' },
              { tier: 'Frecuente Bronze', min: '$50 - $100', count: consumers.filter(c => c.tier === 'Frecuente Bronze').length, total: consumers.filter(c => c.tier === 'Frecuente Bronze').reduce((a,c)=>a+c.totalSpent,0), color: '#ea580c' },
              { tier: 'Nuevo', min: '<$50', count: consumers.filter(c => c.tier === 'Nuevo').length, total: consumers.filter(c => c.tier === 'Nuevo').reduce((a,c)=>a+c.totalSpent,0), color: '#38bdf8' }
            ].map(t => (
              <div
                key={t.tier}
                onClick={() => setConsumerFilterTier(t.tier)}
                style={{
                  background: consumerFilterTier === t.tier ? '#17223b' : '#131b2e',
                  border: consumerFilterTier === t.tier ? `1px solid ${t.color}` : '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: t.color, fontWeight: '800', textTransform: 'uppercase' }}>
                  {t.tier}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', margin: '2px 0' }}>
                  {t.count} clientes
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Total: <strong style={{ color: '#e2e8f0' }}>${t.total.toFixed(2)}</strong> ({t.min})
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Todos', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Nuevo'].map(f => (
                <button
                  key={f}
                  onClick={() => setConsumerFilterTier(f)}
                  style={{
                    background: consumerFilterTier === f ? '#2563eb' : '#131b2e',
                    color: consumerFilterTier === f ? 'white' : '#94a3b8',
                    border: '1px solid #1e293b',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div style={{ width: '280px' }}>
              <input
                type="text"
                placeholder="🔍 Buscar cliente por nombre, email o burger..."
                value={consumerSearch}
                onChange={e => setConsumerSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: '#131b2e',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Consumers Table */}
          <div style={{
            background: '#131b2e',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#0e1526', borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '14px 18px' }}>Cliente</th>
                    <th style={{ padding: '14px 18px' }}>Tier / Nivel de Fidelidad</th>
                    <th style={{ padding: '14px 18px' }}>Consumo Total ($)</th>
                    <th style={{ padding: '14px 18px' }}>Órdenes</th>
                    <th style={{ padding: '14px 18px' }}>Hamburguesa Favorita</th>
                    <th style={{ padding: '14px 18px' }}>Último Pedido</th>
                    <th style={{ padding: '14px 18px' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsumers.map(c => {
                    const maxSpend = 450;
                    const percent = Math.min(100, Math.round((c.totalSpent / maxSpend) * 100));

                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: '800', color: '#ffffff' }}>{c.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.email} &bull; {c.phone}</div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: c.tier.includes('Platinum') ? 'rgba(168, 85, 247, 0.15)' :
                                        c.tier.includes('Gold') ? 'rgba(245, 158, 11, 0.15)' :
                                        c.tier.includes('Silver') ? 'rgba(148, 163, 184, 0.15)' :
                                        c.tier.includes('Bronze') ? 'rgba(234, 88, 12, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                            color: c.tier.includes('Platinum') ? '#c084fc' :
                                   c.tier.includes('Gold') ? '#fbbf24' :
                                   c.tier.includes('Silver') ? '#cbd5e1' :
                                   c.tier.includes('Bronze') ? '#fb923c' : '#38bdf8',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '800'
                          }}>
                            {c.tier}
                          </span>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: '800', color: '#fbbf24', fontSize: '1rem', marginBottom: '4px' }}>
                            ${c.totalSpent.toFixed(2)}
                          </div>
                          <div style={{ background: '#090d16', width: '100px', height: '5px', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percent}%`, height: '100%', background: '#f59e0b' }} />
                          </div>
                        </td>

                        <td style={{ padding: '14px 18px', fontWeight: '700', color: '#e2e8f0' }}>
                          {c.ordersCount} compras
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ color: '#38bdf8', fontWeight: '600', fontSize: '0.85rem' }}>
                            🍔 {c.favoriteBurger}
                          </span>
                        </td>

                        <td style={{ padding: '14px 18px', color: '#94a3b8', fontSize: '0.8rem' }}>
                          {c.lastOrderDate}
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: c.status === 'Activo' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                            color: c.status === 'Activo' ? '#10b981' : '#94a3b8',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: '700'
                          }}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Hamburguesa */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '18px',
            maxWidth: '520px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                🍔 Agregar Nueva Hamburguesa
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBurger} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Burger Doble Trufa Negra"
                  value={newBurger.name}
                  onChange={e => setNewBurger({ ...newBurger, name: e.target.value })}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', color: '#ffffff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Categoría</label>
                  <select
                    value={newBurger.category}
                    onChange={e => setNewBurger({ ...newBurger, category: e.target.value })}
                    style={{ width: '100%', background: '#090d16', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', color: '#ffffff' }}
                  >
                    <option value="Especiales">Especiales</option>
                    <option value="Clásicas">Clásicas</option>
                    <option value="Dobles">Dobles</option>
                    <option value="Pollo & Crispy">Pollo & Crispy</option>
                    <option value="Veggie">Veggie</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Precio ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="12.99"
                    value={newBurger.price}
                    onChange={e => setNewBurger({ ...newBurger, price: e.target.value })}
                    style={{ width: '100%', background: '#090d16', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Badge Especialidad</label>
                  <input
                    type="text"
                    value={newBurger.specialty_badge}
                    onChange={e => setNewBurger({ ...newBurger, specialty_badge: e.target.value })}
                    style={{ width: '100%', background: '#090d16', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Stock Inicial</label>
                  <input
                    type="number"
                    value={newBurger.stock}
                    onChange={e => setNewBurger({ ...newBurger, stock: parseInt(e.target.value, 10) || 0 })}
                    style={{ width: '100%', background: '#090d16', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Descripción</label>
                <textarea
                  rows="2"
                  placeholder="Detalle de la hamburguesa..."
                  value={newBurger.description}
                  onChange={e => setNewBurger({ ...newBurger, description: e.target.value })}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', color: '#ffffff', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Guardar Hamburguesa
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    background: '#1e293b',
                    color: '#94a3b8',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid #10b981',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: '700',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          zIndex: 100
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
