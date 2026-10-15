import React, { useState, useEffect } from 'react';

// Default 10 Burgers matching the backend catalog
const INITIAL_MENU = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especiales',
    price: 14.99,
    specialty_badge: '👑 Especialidad Suprema',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    description: 'Doble Angus 300g a la parrilla de roble, queso cheddar fundido al soplete, tocineta ahumada crujiente y salsa secreta King.',
    prepTime: '8-10 min',
    calories: '920 kcal'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    price: 9.99,
    specialty_badge: '⭐ Clásica de la Casa',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80',
    description: '180g de carne de res premium, lechuga hidropónica, tomates de huerto madurados, pepinillos dill y salsa de la casa.',
    prepTime: '6-8 min',
    calories: '680 kcal'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Dobles',
    price: 12.99,
    specialty_badge: '🔥 Doble Carne Smash',
    image: 'https://images.unsplash.com/photo-1583032015879-c558c42b827e?w=500&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash crujiente (2x110g), cuatro capas de queso americano fundido, cebolla confitada y aderezo especial.',
    prepTime: '7-9 min',
    calories: '840 kcal'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especiales',
    price: 13.99,
    specialty_badge: '🥓 Especial Doble Bacon',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80',
    description: 'Dos medallones gruesos a la brasa, triple porción de tocineta glaseada en maple, doble provolone fundido y salsa BBQ ahumada.',
    prepTime: '8-10 min',
    calories: '960 kcal'
  },
  {
    id: 5,
    name: 'Burger Crispy Chicken Master',
    category: 'Pollo & Crispy',
    price: 11.49,
    specialty_badge: '🍗 Pollo Crujiente Oro',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk y 11 especias, rebozado extra crocante, ensalada coleslaw y emulsión honey mustard.',
    prepTime: '7-9 min',
    calories: '710 kcal'
  },
  {
    id: 6,
    name: 'Burger Rapid BBQ Bacon',
    category: 'Especiales',
    price: 11.99,
    specialty_badge: '🔥 Ahumado Intenso',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=80',
    description: 'Carne a la parrilla, queso gouda ahumado derretido, aros de cebolla crocantes rebozados y abundante barbacoa bourbon dulce.',
    prepTime: '6-8 min',
    calories: '820 kcal'
  },
  {
    id: 7,
    name: 'Burger Mega Trufada',
    category: 'Gourmet',
    price: 15.99,
    specialty_badge: '💎 Selección Gourmet',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=80',
    description: 'Blend Angus y picaña, mayonesa de trufa negra silvestre, champiñones portobello salteados y queso emmental suizo.',
    prepTime: '9-11 min',
    calories: '880 kcal'
  },
  {
    id: 8,
    name: 'Burger Tex-Mex Spicy Fire',
    category: 'Especiales',
    price: 12.49,
    specialty_badge: '🌶️ Nivel Picante Alto',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=80',
    description: 'Carne con especias tex-mex, queso pepper jack fundido, jalapeños encurtidos, guacamole fresco y crujientes nachos.',
    prepTime: '7-9 min',
    calories: '790 kcal'
  },
  {
    id: 9,
    name: 'Burger Veggie Green Power',
    category: 'Veggie',
    price: 10.99,
    specialty_badge: '🌱 100% Plant-Based',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón artesanal de quinoa y lentejas, cheddar vegano derretido, rúcula fresca, aguacate hass y alioli de ajo negro.',
    prepTime: '6-8 min',
    calories: '540 kcal'
  },
  {
    id: 10,
    name: 'Burger Smash Clásica Simple',
    category: 'Clásicas',
    price: 8.99,
    specialty_badge: '🍔 Clásica Tradicional',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón smash fino con costra dorada, cebolla caramelizada en la plancha, doble queso cheddar americano y pepinillos.',
    prepTime: '5-7 min',
    calories: '590 kcal'
  }
];

// Available discount coupons
const AVAILABLE_OFFERS = [
  {
    code: 'RAPID25',
    title: '25% OFF en tu primer pedido',
    description: 'Aplica en todas las hamburguesas especiales de autor.',
    discountPercent: 25,
    tag: 'EXCLUSIVO APP'
  },
  {
    code: 'REYFREE',
    title: 'Descuento $5.00 en Rey de las Burgers',
    description: 'Válido para la hamburguesa insignia de la casa.',
    fixedDiscount: 5.00,
    tag: 'PREMIUM'
  },
  {
    code: 'ENVIOGRATIS',
    title: 'Envío Express 100% Gratis',
    description: 'Ahorra el costo de delivery en cualquier compra.',
    freeDelivery: true,
    tag: 'FLASH'
  },
  {
    code: 'COMBOSMASH',
    title: 'Papas & Bebida por $3.00 OFF',
    description: 'En compras mayores a $20.00 en toda la carta.',
    fixedDiscount: 3.00,
    tag: 'COMBO'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta Online');
  const [deliveryAddress, setDeliveryAddress] = useState('Av. Insurgentes Sur #450, Piso 8, CDMX');
  const [orderNotes, setOrderNotes] = useState('');
  const [orders, setOrders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Load backend products and initial orders
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setMenuItems(data.data);
        }
      })
      .catch(err => console.warn('Usando catálogo local:', err.message));

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        }
      })
      .catch(err => console.warn('Usando órdenes locales:', err.message));

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstall);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`🍔 Agregada "${product.name}" al pedido`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Calculations with coupon
  let deliveryFee = 2.50;
  let discountAmount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.freeDelivery) {
      deliveryFee = 0;
    }
    if (appliedCoupon.discountPercent) {
      discountAmount += (cartSubtotal * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.fixedDiscount) {
      discountAmount += Math.min(appliedCoupon.fixedDiscount, cartSubtotal);
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? deliveryFee : 0));

  // Simulate Order Submission
  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const newOrderPayload = {
      customerName: 'Carlos Mendoza (PWA User)',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: parseFloat(finalTotal.toFixed(2)),
      paymentMethod,
      deliveryAddress,
      notes: orderNotes
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrderPayload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrders(prev => [data.data, ...prev]);
      } else {
        // Fallback local
        const localOrder = {
          id: 'HR-' + Math.floor(1000 + Math.random() * 9000),
          customerName: newOrderPayload.customerName,
          items: newOrderPayload.items,
          total: newOrderPayload.total,
          status: 'En la plancha 🔥',
          paymentMethod,
          deliveryAddress,
          createdAt: new Date().toISOString()
        };
        setOrders(prev => [localOrder, ...prev]);
      }
    } catch (err) {
      const localOrder = {
        id: 'HR-' + Math.floor(1000 + Math.random() * 9000),
        customerName: newOrderPayload.customerName,
        items: newOrderPayload.items,
        total: newOrderPayload.total,
        status: 'En la plancha 🔥',
        paymentMethod,
        deliveryAddress,
        createdAt: new Date().toISOString()
      };
      setOrders(prev => [localOrder, ...prev]);
    }

    setIsSubmitting(false);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('ordenes');
    showToast('🎉 ¡Orden enviada a la plancha! Siguiendo en tiempo real.');
  };

  // Simulate Order status step advancement
  const handleAdvanceOrderStatus = (orderId) => {
    const statuses = ['Recibido 📝', 'En la plancha 🔥', 'En camino 🛵', 'Entregado ✅'];
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const currentIndex = statuses.indexOf(o.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        showToast(`Actualizado ${orderId} a: ${nextStatus}`);
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    showToast(`🎟️ Cupón "${coupon.code}" aplicado correctamente.`);
    setIsCartOpen(true);
  };

  // Filtered menu
  const filteredBurgers = menuItems.filter(b => {
    const matchesCategory = categoryFilter === 'Todas' || 
      (categoryFilter === 'Especiales' && b.category === 'Especiales') ||
      (categoryFilter === 'Clásicas' && b.category === 'Clásicas') ||
      (categoryFilter === 'Dobles' && b.category === 'Dobles') ||
      (categoryFilter === 'Pollo & Veggie' && (b.category === 'Pollo & Crispy' || b.category === 'Veggie'));
    
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#090d16', color: '#f8fafc', overflow: 'hidden' }}>
      
      {/* Top Mobile Header */}
      <header style={{
        background: '#0d1322',
        borderBottom: '1px solid #1e293b',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🍔</span>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>Hamburger Rapid</div>
            <div style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '600', textTransform: 'uppercase' }}>App Móvil &bull; Delivery Express</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontWeight: '700',
            background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: isOnline ? '#10b981' : '#ef4444',
            border: isOnline ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {isOnline ? '🟢 En línea' : '🔴 Offline'}
          </span>

          {deferredPrompt && (
            <button
              onClick={() => deferredPrompt.prompt()}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              📲 Instalar
            </button>
          )}
        </div>
      </header>

      {/* Main Tab Views Scrollable Container */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: '90px' }}>
        
        {/* ================= PESTAÑA 1: MENÚ ================= */}
        {activeTab === 'menu' && (
          <div className="fade-in">
            {/* Promo banner strip */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '14px',
              padding: '12px 14px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase' }}>🔥 Combo de Bienvenida</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff' }}>25% OFF con cupón RAPID25</div>
              </div>
              <button
                onClick={() => handleApplyCoupon(AVAILABLE_OFFERS[0])}
                style={{
                  background: '#f59e0b',
                  color: '#090d16',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Aplicar
              </button>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="🔍 Buscar hamburguesa o ingrediente..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#131b2e',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
              {['Todas', 'Especiales', 'Clásicas', 'Dobles', 'Pollo & Veggie'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    background: categoryFilter === cat ? '#2563eb' : '#131b2e',
                    color: categoryFilter === cat ? '#ffffff' : '#94a3b8',
                    border: categoryFilter === cat ? '1px solid #3b82f6' : '1px solid #1e293b',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Burger Cards Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredBurgers.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: '#131b2e',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', height: '140px', background: '#0b0f19' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(9, 13, 22, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#fbbf24',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      border: '1px solid rgba(251, 191, 36, 0.3)'
                    }}>
                      {item.specialty_badge || '🍔 Especialidad'}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#e2e8f0',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.68rem'
                    }}>
                      ⏱️ {item.prepTime || '8 min'}
                    </div>
                  </div>

                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                        {item.name}
                      </h3>
                      <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fbbf24' }}>
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.4', marginBottom: '12px' }}>
                      {item.description}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '9px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
                      }}
                    >
                      <span>+ Agregar al Pedido</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA 2: OFERTAS ================= */}
        {activeTab === 'ofertas' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                🎟️ Ofertas & Cupones
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Aplica descuentos instantáneos en la simulación de tu compra.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {AVAILABLE_OFFERS.map(offer => {
                const isSelected = appliedCoupon?.code === offer.code;
                return (
                  <div
                    key={offer.code}
                    style={{
                      background: '#131b2e',
                      border: isSelected ? '1px solid #f59e0b' : '1px solid #1e293b',
                      borderRadius: '14px',
                      padding: '16px',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.1)',
                      color: isSelected ? '#fbbf24' : '#38bdf8',
                      border: isSelected ? '1px solid #f59e0b' : '1px solid rgba(56, 189, 248, 0.3)',
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '9999px'
                    }}>
                      {offer.tag}
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                      {offer.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>
                      {offer.description}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <code style={{
                        background: '#090d16',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        color: '#fbbf24',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        letterSpacing: '0.05em'
                      }}>
                        {offer.code}
                      </code>

                      <button
                        onClick={() => handleApplyCoupon(offer)}
                        style={{
                          background: isSelected ? '#10b981' : '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {isSelected ? '✓ Aplicado' : 'Canjear en Carrito'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA 3: ORDENES ================= */}
        {activeTab === 'ordenes' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                  📦 Mis Órdenes
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  Seguimiento de preparación y entrega en tiempo real.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#131b2e', borderRadius: '16px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍔</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>No tienes órdenes activas</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '18px' }}>Explora el menú y simula tu primer pedido express.</div>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Ir al Menú
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {orders.map((order, idx) => (
                  <div
                    key={order.id || idx}
                    style={{
                      background: '#131b2e',
                      border: '1px solid #1e293b',
                      borderRadius: '16px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: '800', color: '#38bdf8', fontSize: '0.9rem' }}>
                        #{order.id}
                      </span>
                      <span style={{
                        background: order.status.includes('Entregado') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: order.status.includes('Entregado') ? '#10b981' : '#fbbf24',
                        border: order.status.includes('Entregado') ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: '700'
                      }}>
                        {order.status}
                      </span>
                    </div>

                    {/* Progress tracking bar */}
                    <div style={{
                      background: '#090d16',
                      borderRadius: '6px',
                      height: '6px',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        height: '100%',
                        width: order.status.includes('Entregado') ? '100%' : order.status.includes('camino') ? '70%' : order.status.includes('plancha') ? '40%' : '20%',
                        background: order.status.includes('Entregado') ? '#10b981' : 'linear-gradient(90deg, #f59e0b, #ea580c)',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '10px' }}>
                      {order.items && order.items.map((it, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span>{it.quantity}x {it.name}</span>
                          <span>${(it.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      borderTop: '1px solid #1e293b',
                      paddingTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Total Pagado ({order.paymentMethod || 'Tarjeta'})</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fbbf24' }}>
                          ${Number(order.total).toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAdvanceOrderStatus(order.id)}
                        style={{
                          background: '#1e293b',
                          border: '1px solid #334155',
                          color: '#e2e8f0',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        ⚡ Avanzar Estado
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PESTAÑA 4: PERFIL ================= */}
        {activeTab === 'perfil' && (
          <div className="fade-in">
            <div style={{
              background: 'linear-gradient(135deg, #131b2e 0%, #172033 100%)',
              border: '1px solid #1e293b',
              borderRadius: '18px',
              padding: '20px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 12px',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
              }}>
                🍔
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginBottom: '2px' }}>
                Carlos Mendoza
              </h2>
              <div style={{
                display: 'inline-block',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: '800',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                marginBottom: '12px'
              }}>
                👑 Rapid VIP Gold Member
              </div>

              {/* Loyalty progress */}
              <div style={{ background: '#090d16', padding: '12px', borderRadius: '12px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>Puntos Rapid acumulados:</span>
                  <span style={{ color: '#38bdf8', fontWeight: '800' }}>3,450 pts</span>
                </div>
                <div style={{ background: '#1e293b', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #38bdf8)' }} />
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px', textAlign: 'right' }}>
                  Faltan 550 pts para VIP Platinum
                </div>
              </div>
            </div>

            {/* Profile Preferences */}
            <div style={{ background: '#131b2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📍 Dirección de Entrega Guardada
              </div>
              <input
                type="text"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#e2e8f0',
                  fontSize: '0.85rem',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />

              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                💳 Método de Pago Predeterminado
              </div>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#e2e8f0',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="Tarjeta Online">Tarjeta de Crédito / Débito (•••• 4242)</option>
                <option value="RapidPay Express">RapidPay Express Digital</option>
                <option value="Efectivo contra entrega">Efectivo contra entrega</option>
              </select>
            </div>

            {/* Ecosystem Navigation */}
            <div style={{ background: '#131b2e', border: '1px solid #1e293b', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase' }}>
                🌐 Plataforma Comercial Hamburger Rapid
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#090d16',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: '1px solid #1e293b'
                  }}
                >
                  <span>🌐 Ir a Landing E-commerce</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href="/admin"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#090d16',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: '1px solid #1e293b'
                  }}
                >
                  <span>⚙️ Ir al Panel Administrativo</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Cart Button (visible if items in cart) */}
      {cart.length > 0 && !isCartOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '448px',
          zIndex: 30
        }}>
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
              color: '#ffffff',
              border: 'none',
              padding: '14px 18px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(234, 88, 12, 0.45)',
              cursor: 'pointer',
              fontWeight: '800',
              fontSize: '0.95rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.8rem'
              }}>
                {cartTotalItems}
              </span>
              <span>Ver Pedido</span>
            </div>
            <span>${finalTotal.toFixed(2)} &rarr;</span>
          </button>
        </div>
      )}

      {/* Cart & Checkout Modal */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            background: '#111827',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            borderTop: '1px solid #1e293b',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                  🛒 Simulación de Compra
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {cartTotalItems} {cartTotalItems === 1 ? 'hamburguesa' : 'hamburguesas'} en tu orden
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: '#1e293b',
                  border: 'none',
                  color: '#94a3b8',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Items List */}
            <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#172033',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1px solid #1e293b'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: '600' }}>
                      ${Number(item.price).toFixed(2)} c/u
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{
                        background: '#1f2937',
                        border: '1px solid #374151',
                        color: 'white',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '700'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: '800', fontSize: '0.9rem', minWidth: '16px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        background: '#2563eb',
                        border: 'none',
                        color: 'white',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '700'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* Coupon Row */}
              <div style={{
                background: '#090d16',
                border: '1px dashed #334155',
                borderRadius: '10px',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Cupón de Descuento:</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: appliedCoupon ? '#10b981' : '#f59e0b' }}>
                    {appliedCoupon ? `${appliedCoupon.code} (${appliedCoupon.title})` : 'Ningún cupón aplicado'}
                  </div>
                </div>
                {!appliedCoupon ? (
                  <button
                    onClick={() => { setIsCartOpen(false); setActiveTab('ofertas'); }}
                    style={{
                      background: '#1e293b',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Cupones
                  </button>
                ) : (
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    style={{
                      background: 'transparent',
                      color: '#ef4444',
                      border: 'none',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Quitar
                  </button>
                )}
              </div>

              {/* Notes */}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  Notas especiales para la cocina (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ej: Término medio, sin cebolla, salsa extra..."
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#090d16',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#f8fafc',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Price Breakdown */}
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: '700' }}>
                    <span>Descuento cupón</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span>Envío Express (15-20 min)</span>
                  <span>{deliveryFee === 0 ? 'GRATIS' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: '800', fontSize: '1.15rem', marginTop: '6px' }}>
                  <span>Total Final</span>
                  <span style={{ color: '#fbbf24' }}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b', background: '#090d16' }}>
              <button
                disabled={isSubmitting}
                onClick={handleConfirmOrder}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 25px rgba(234, 88, 12, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSubmitting ? (
                  <span>Enviando orden a la plancha...</span>
                ) : (
                  <span>🔥 Confirmar y Enviar a la Plancha (${finalTotal.toFixed(2)})</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(13, 19, 34, 0.94)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 40
      }}>
        {[
          { id: 'menu', icon: '🍔', label: 'Menú' },
          { id: 'ofertas', icon: '🎟️', label: 'Ofertas' },
          { id: 'ordenes', icon: '📦', label: 'Órdenes', count: orders.length },
          { id: 'perfil', icon: '👤', label: 'Perfil' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isActive ? '#38bdf8' : '#64748b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: isActive ? '800' : '500',
                position: 'relative',
                padding: '4px 12px'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '10px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '9999px',
                  fontSize: '0.62rem',
                  padding: '1px 5px',
                  fontWeight: '800'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid #38bdf8',
          color: '#ffffff',
          padding: '10px 18px',
          borderRadius: '9999px',
          fontSize: '0.82rem',
          fontWeight: '700',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          zIndex: 100,
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(8px)'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
