const mysql = require('mysql2/promise');
const net = require('net');

// 10 VARIANTES DESTACADAS - HAMBURGER RAPID
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especiales',
    price: 14.99,
    stock: 45,
    specialty_level: 'Legendaria',
    specialty_badge: '👑 Especialidad Suprema',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Nuestra creación insignia: doble carne Angus certificada 300g flameada a la parrilla de roble, queso cheddar añejo fundido al soplete, tocineta ahumada crujiente, cebolla caramelizada al bourbon y salsa secreta King en pan brioche artesanal dorado a la mantequilla.',
    ingredients: 'Doble carne Angus 300g, Cheddar madurado, Bacon ahumado crujiente, Cebolla al bourbon, Salsa King de la casa, Pan Brioche con sésamo negro tostado',
    prep_time: '8-10 min',
    calories: 920
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    price: 9.99,
    stock: 65,
    specialty_level: 'Signature',
    specialty_badge: '⭐ Clásica de la Casa',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'La receta original perfeccionada: 180g de carne de res premium a la plancha, lechuga hidropónica crespa, tomates de huerto madurados, pepinillos agridulces artesanales, queso cheddar inglés derretido y salsa de la casa.',
    ingredients: 'Res premium 180g, Cheddar inglés, Pepinillos agridulces encurtidos, Tomate fresco, Lechuga crespa, Aderezo Real de hierbas',
    prep_time: '6-8 min',
    calories: 680
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Dobles',
    price: 12.99,
    stock: 50,
    specialty_level: 'Doble Smash',
    specialty_badge: '🔥 Doble Carne Smash',
    image: 'https://images.unsplash.com/photo-1583032015879-c558c42b827e?w=600&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash con costra caramelizada irresistible (2x110g), cuatro lonchas de queso cheddar americano fundido, cebolla confitada en su propio jugo y aderezo especial tártaro en pan brioche.',
    ingredients: '2x Medallón Smash 110g (220g), 4 capas Queso Americano, Cebolla caramelizada a la plancha, Salsa Tártara ahumada',
    prep_time: '7-9 min',
    calories: 840
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especiales',
    price: 13.99,
    stock: 38,
    specialty_level: 'Doble Bacon & Provolone',
    specialty_badge: '🥓 Especial Doble Bacon',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: 'Para los verdaderos apasionados del sabor contundente: dos medallones gruesos a la brasa, triple porción de tocineta glaseada en maple, doble queso provolone fundido y salsa barbacoa ahumada al nogal.',
    ingredients: 'Doble medallón a la brasa 240g, Triple Bacon crocante al maple, Queso Provolone fundido, Salsa BBQ artesanal de nogal',
    prep_time: '8-10 min',
    calories: 960
  },
  {
    id: 5,
    name: 'Burger Crispy Chicken Master',
    category: 'Pollo & Crispy',
    price: 11.49,
    stock: 42,
    specialty_level: 'Pollo Crujiente',
    specialty_badge: '🍗 Pollo Crujiente Oro',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    description: 'Pechuga entera marinada por 24h en buttermilk y 11 especias secretas, rebozado extra crujiente con copos dorados, ensalada coleslaw fresca con un toque de manzana verde y emulsión honey mustard dijon.',
    ingredients: 'Filete de pechuga crujiente 200g, Ensalada Coleslaw fresca de col morada, Pepinillos dulces, Emulsión Honey Mustard',
    prep_time: '7-9 min',
    calories: 710
  },
  {
    id: 6,
    name: 'Burger Rapid BBQ Bacon',
    category: 'Especiales',
    price: 11.99,
    stock: 55,
    specialty_level: 'Ahumada BBQ',
    specialty_badge: '🔥 Ahumado Intenso',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    description: 'Medallón a la parrilla de carbón vivo, queso gouda ahumado derretido, aros de cebolla crocantes rebozados en cerveza artesanal y bañada en abundante barbacoa bourbon dulce de la casa.',
    ingredients: 'Carne a la parrilla 180g, Queso Gouda ahumado, Aros de cebolla crujientes, Salsa BBQ Bourbon casera',
    prep_time: '6-8 min',
    calories: 820
  },
  {
    id: 7,
    name: 'Burger Mega Trufada',
    category: 'Gourmet',
    price: 15.99,
    stock: 25,
    specialty_level: 'Gourmet Exclusiva',
    specialty_badge: '💎 Selección Gourmet',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    description: 'Alta gastronomía urbana: medallón blend Angus con picaña, mayonesa artesanal infusionada con trufa negra silvestre, champiñones portobello salteados con mantequilla clarificada y queso emmental suizo.',
    ingredients: 'Blend Angus Picaña 200g, Mayonesa de Trufa Negra, Champiñones Portobello al ajillo fino, Queso Emmental suizo',
    prep_time: '9-11 min',
    calories: 880
  },
  {
    id: 8,
    name: 'Burger Tex-Mex Spicy Fire',
    category: 'Especiales',
    price: 12.49,
    stock: 35,
    specialty_level: 'Picante Kick',
    specialty_badge: '🌶️ Nivel Picante Alto',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80',
    description: 'Sabor fronterizo electrizante: carne sazonada con especias tex-mex, queso pepper jack fundido, rodajas de jalapeños encurtidos, guacamole rústico recién hecho y crujientes nachos de maíz triturados.',
    ingredients: 'Carne Tex-Mex 180g, Queso Pepper Jack derretido, Jalapeños encurtidos, Guacamole rústico fresco, Nachos crocantes',
    prep_time: '7-9 min',
    calories: 790
  },
  {
    id: 9,
    name: 'Burger Veggie Green Power',
    category: 'Veggie',
    price: 10.99,
    stock: 30,
    specialty_level: 'Plant-Based',
    specialty_badge: '🌱 100% Plant-Based',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80',
    description: 'Medallón artesanal a base de quinoa real, lentejas y remolacha glaseada, con queso cheddar vegano fundido, rúcula fresca silvestre, láminas de aguacate hass y alioli suave de ajo negro.',
    ingredients: 'Medallón Quinoa & Lentejas 160g, Queso Vegano derretido, Rúcula silvestre, Aguacate Hass fresco, Alioli de ajo asado',
    prep_time: '6-8 min',
    calories: 540
  },
  {
    id: 10,
    name: 'Burger Smash Clásica Simple',
    category: 'Clásicas',
    price: 8.99,
    stock: 70,
    specialty_level: 'Tradicional',
    specialty_badge: '🍔 Clásica Tradicional',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80',
    description: 'La esencia pura del smash: medallón prensado con costra dorada irresistible, cebolla blanca en juliana caramelizada en la propia plancha, doble queso cheddar americano, pepinillos dill y mostaza clásica.',
    ingredients: 'Medallón Smash 130g, Doble Cheddar Americano, Cebolla a la plancha, Pepinillos dill, Mostaza americana y Ketchup',
    prep_time: '5-7 min',
    calories: 590
  }
];

// CONSUMIDORES / CLIENTES CON MÉTRICAS DE CONSUMO
const INITIAL_CONSUMERS = [
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

// ÓRDENES SIMULADAS
const INITIAL_ORDERS = [
  {
    id: 'HR-1001',
    customerName: 'Carlos Mendoza',
    items: [
      { name: 'Rey de las Burgers', quantity: 2, price: 14.99 },
      { name: 'Burger Doble Especial', quantity: 1, price: 13.99 }
    ],
    total: 43.97,
    status: 'En la plancha 🔥',
    paymentMethod: 'Tarjeta de Crédito',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'HR-1002',
    customerName: 'Mariana Silva',
    items: [
      { name: 'Burger Real Doble', quantity: 1, price: 12.99 },
      { name: 'Burger Crispy Chicken Master', quantity: 1, price: 11.49 }
    ],
    total: 24.48,
    status: 'En camino 🛵',
    paymentMethod: 'RapidPay Express',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'HR-1003',
    customerName: 'Rodrigo Gómez',
    items: [
      { name: 'Burger Real Clásica', quantity: 2, price: 9.99 }
    ],
    total: 19.98,
    status: 'Entregado ✅',
    paymentMethod: 'Efectivo contra entrega',
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString()
  }
];

let inMemoryProducts = [...INITIAL_PRODUCTS];
let inMemoryConsumers = [...INITIAL_CONSUMERS];
let inMemoryOrders = [...INITIAL_ORDERS];
let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para Hamburger Rapid.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Intentando conectar a MySQL en ${host}:${port} con usuario "${user}" a la BD "${database}"...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    // Crear tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        specialty_level VARCHAR(100),
        specialty_badge VARCHAR(150),
        image VARCHAR(500),
        description TEXT,
        ingredients TEXT,
        prep_time VARCHAR(50),
        calories INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Inicializar datos si la tabla está vacía
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando 10 hamburguesas en la tabla products de MySQL...');
      for (const p of INITIAL_PRODUCTS) {
        await connection.query(
          'INSERT INTO products (name, category, price, stock, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.category, p.price, p.stock, p.specialty_level || '', p.specialty_badge || '', p.image, p.description, p.ingredients || '', p.prep_time || '', p.calories || 0]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    console.warn(`⚠️ [DB] Conexión directa falló: ${error.message}. Escaneando red interna...`);
    try {
      const candidates = [];
      for (let i = 2; i <= 30; i++) candidates.push(`172.18.0.${i}`);
      for (let i = 1; i <= 254; i++) candidates.push(`10.0.1.${i}`);
      candidates.push('172.18.0.1', '172.17.0.1');

      const check = (ip) => new Promise((resolve) => {
        const s = new net.Socket();
        s.setTimeout(250);
        s.once('connect', () => { s.destroy(); resolve(ip); });
        s.once('timeout', () => { s.destroy(); resolve(null); });
        s.once('error', () => { resolve(null); });
        s.connect(3306, ip);
      });

      const found = (await Promise.all(candidates.map(check))).filter(Boolean);
      if (found.length > 0) {
        const discoveredIp = found[0];
        console.log(`🎯 [DB Discovery] ¡MySQL encontrado automáticamente en IP ${discoveredIp}! Conectando...`);
        pool = mysql.createPool({
          host: discoveredIp,
          user,
          password,
          database,
          port: 3306,
          waitForConnections: true,
          connectionLimit: 10,
          connectTimeout: 5000
        });
        const conn = await pool.getConnection();
        console.log(`✅ [DB] Conectado exitosamente a MySQL en ${discoveredIp}`);
        await conn.query(`
          CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL DEFAULT 0,
            specialty_level VARCHAR(100),
            specialty_badge VARCHAR(150),
            image VARCHAR(500),
            description TEXT,
            ingredients TEXT,
            prep_time VARCHAR(50),
            calories INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        conn.release();
        isConnectedToMySQL = true;
        lastDbError = null;
        return;
      }
    } catch (discoveryErr) {
      console.warn('Error en escaneo de red:', discoveryErr.message);
    }

    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      return rows;
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, price, stock, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, price, stock, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category || 'Especiales', parseFloat(price) || 0, parseInt(stock, 10) || 0, specialty_level || 'Especial', specialty_badge || '🍔 Hamburguesa Especial', image || '', description || '', ingredients || '', prep_time || '8-10 min', parseInt(calories, 10) || 750]
    );
    return { id: result.insertId, name, category, price: parseFloat(price) || 0, stock: parseInt(stock, 10) || 0, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Especiales',
    price: parseFloat(price) || 0,
    stock: parseInt(stock, 10) || 0,
    specialty_level: specialty_level || 'Especial',
    specialty_badge: specialty_badge || '🍔 Hamburguesa Especial',
    image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: description || 'Hamburguesa preparada en tiempo récord con ingredientes frescos de alta calidad.',
    ingredients: ingredients || 'Carne Angus, Queso Cheddar fundido, Pan Brioche',
    prep_time: prep_time || '8-10 min',
    calories: parseInt(calories, 10) || 750
  };
  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function updateProduct(id, updateData) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(updateData)) {
      if (['name', 'category', 'price', 'stock', 'specialty_level', 'specialty_badge', 'description', 'image', 'ingredients', 'prep_time', 'calories'].includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length > 0) {
      values.push(numId);
      await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
    }
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [numId]);
    return rows[0];
  }

  const index = inMemoryProducts.findIndex(p => p.id === numId);
  if (index !== -1) {
    inMemoryProducts[index] = { ...inMemoryProducts[index], ...updateData };
    return inMemoryProducts[index];
  }
  return null;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_PRODUCTS) {
      await pool.query(
        'INSERT INTO products (name, category, price, stock, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.category, p.price, p.stock, p.specialty_level || '', p.specialty_badge || '', p.image, p.description, p.ingredients || '', p.prep_time || '', p.calories || 0]
      );
    }
    return;
  }
  inMemoryProducts = [...INITIAL_PRODUCTS];
}

// CONSUMIDORES Y MÉTRICAS SEGÚN CONSUMO
function getConsumers() {
  return inMemoryConsumers;
}

function getConsumerMetrics() {
  const totalConsumers = inMemoryConsumers.length;
  const totalRevenue = inMemoryConsumers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalOrders = inMemoryConsumers.reduce((acc, c) => acc + c.ordersCount, 0);
  const averageTicket = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
  const averageCustomerSpend = totalConsumers > 0 ? (totalRevenue / totalConsumers) : 0;

  // Segmentación por tiers de consumo
  const tiers = {
    'VIP Platinum': { count: 0, totalSpent: 0, minSpend: 350 },
    'VIP Gold': { count: 0, totalSpent: 0, minSpend: 200 },
    'Recurrente Silver': { count: 0, totalSpent: 0, minSpend: 100 },
    'Frecuente Bronze': { count: 0, totalSpent: 0, minSpend: 50 },
    'Nuevo': { count: 0, totalSpent: 0, minSpend: 0 }
  };

  inMemoryConsumers.forEach(c => {
    if (tiers[c.tier]) {
      tiers[c.tier].count += 1;
      tiers[c.tier].totalSpent += c.totalSpent;
    }
  });

  const topSpenders = [...inMemoryConsumers].sort((a, b) => b.totalSpent - a.totalSpent);

  return {
    totalConsumers,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalOrders,
    averageTicket: parseFloat(averageTicket.toFixed(2)),
    averageCustomerSpend: parseFloat(averageCustomerSpend.toFixed(2)),
    tiers,
    topSpenders
  };
}

// GESTIÓN DE ÓRDENES SIMULADAS
function getOrders() {
  return inMemoryOrders;
}

function createOrder(orderData) {
  const newOrder = {
    id: 'HR-' + Math.floor(1000 + Math.random() * 9000),
    customerName: orderData.customerName || 'Cliente Invitado',
    items: orderData.items || [],
    total: parseFloat(orderData.total) || 0,
    status: 'En la plancha 🔥',
    paymentMethod: orderData.paymentMethod || 'Tarjeta Online',
    deliveryAddress: orderData.deliveryAddress || 'Av. Insurgentes Sur #450, CDMX',
    notes: orderData.notes || '',
    createdAt: new Date().toISOString()
  };

  inMemoryOrders.unshift(newOrder);

  // Reducir stock simulado de productos
  if (Array.isArray(orderData.items)) {
    orderData.items.forEach(item => {
      const prod = inMemoryProducts.find(p => p.name === item.name || p.id === item.id);
      if (prod && prod.stock > 0) {
        prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
      }
    });
  }

  return newOrder;
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'no-configurado'),
    database: process.env.DB_NAME || 'demo',
    user: process.env.DB_USER || 'pablovaldivia',
    error: lastDbError,
    activePoolConnections: pool ? 1 : 0
  };
}

module.exports = {
  INITIAL_PRODUCTS,
  initDB,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts,
  getConsumers,
  getConsumerMetrics,
  getOrders,
  createOrder,
  getDbStatus
};
