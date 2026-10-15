const express = require('express');
const router = express.Router();
const db = require('../db');
const dns = require('dns').promises;
const os = require('os');
const net = require('net');

// Health Check Endpoint (For Dokploy Health Checks & Admin Dashboard)
router.get('/health', (req, res) => {
  const dbStatus = db.getDbStatus();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    platform: 'Hamburger Rapid - Dokploy Production Stack',
    database: dbStatus
  });
});

// List products
router.get('/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new product
router.post('/products', async (req, res) => {
  try {
    const { name, category, price, stock, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, error: 'Nombre y precio son requeridos.' });
    }
    const product = await db.addProduct({ name, category, price, stock, specialty_level, specialty_badge, image, description, ingredients, prep_time, calories });
    res.status(201).json({ success: true, message: 'Hamburguesa agregada exitosamente', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await db.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Hamburguesa no encontrada' });
    }
    res.json({ success: true, message: 'Hamburguesa actualizada', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteProduct(id);
    res.json({ success: true, message: `Hamburguesa ${id} eliminada.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset initial products
router.post('/reset', async (req, res) => {
  try {
    await db.resetProducts();
    res.json({ success: true, message: 'Catálogo de hamburguesas restablecido con éxito.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Consumers list
router.get('/consumers', (req, res) => {
  try {
    const consumers = db.getConsumers();
    res.json({
      success: true,
      count: consumers.length,
      data: consumers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Consumer Metrics by Consumption (Métricas de consumidores/clientes según consumo)
router.get('/metrics/consumers', (req, res) => {
  try {
    const metrics = db.getConsumerMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Orders list
router.get('/orders', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new order (simular compra desde PWA)
router.post('/orders', (req, res) => {
  try {
    const { customerName, items, total, paymentMethod, deliveryAddress, notes } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'La orden debe contener al menos un producto.' });
    }
    const newOrder = db.createOrder({ customerName, items, total, paymentMethod, deliveryAddress, notes });
    res.status(201).json({
      success: true,
      message: '¡Orden recibida y enviada a la plancha!',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Diagnostic helper
function checkTcpPort(host, port = 3306, timeout = 300) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket.once('connect', () => {
      socket.destroy();
      resolve({ host, port, open: true });
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve({ host, port, open: false, reason: 'timeout' });
    });
    socket.once('error', (err) => {
      resolve({ host, port, open: false, reason: err.code || err.message });
    });
    socket.connect(port, host);
  });
}

// Diagnostic network endpoint
router.get('/debug-network', async (req, res) => {
  const hostsToTest = [
    process.env.DB_HOST,
    '172.18.0.1',
    '172.17.0.1',
    '127.0.0.1'
  ].filter(Boolean);

  const dnsResults = {};
  for (const host of hostsToTest) {
    try {
      const lookup = await dns.lookup(host);
      dnsResults[host] = { ok: true, ip: lookup.address };
    } catch (err) {
      dnsResults[host] = { ok: false, error: err.message };
    }
  }

  const candidateTargets = ['172.18.0.1', '172.17.0.1'];
  for (let i = 2; i <= 30; i++) {
    candidateTargets.push(`172.18.0.${i}`);
  }

  const portScans = await Promise.all(candidateTargets.map(ip => checkTcpPort(ip, 3306, 250)));
  const open3306 = portScans.filter(p => p.open);

  res.json({
    hostname: os.hostname(),
    interfaces: os.networkInterfaces(),
    environment: {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_NAME: process.env.DB_NAME,
      HAS_PASSWORD: !!process.env.DB_PASSWORD,
      HAS_DATABASE_URL: !!process.env.DATABASE_URL
    },
    dns_tests: dnsResults,
    open_mysql_ports_found: open3306,
    db_status: db.getDbStatus()
  });
});

module.exports = router;
