const BASE_URL = 'http://localhost:5001/api';

async function runTests() {
  console.log('--- STARTING PHASE 7 VERIFICATION SUITE ---');
  let passCount = 0;
  let totalCount = 0;

  function assert(condition, message) {
    totalCount++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passCount++;
    } else {
      console.error(`[FAIL] ${message}`);
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200 && healthJson.status === 'ok', 'Health API (GET /api/health)');

    // 2. Unauthenticated user blocked from Admin API
    const unauthRes = await fetch(`${BASE_URL}/admin/dashboard`);
    assert(unauthRes.status === 401, 'Unauthenticated user blocked from Admin API (401 Unauthorized)');

    // 3. Customer Login
    const custLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer@example.com', password: 'Customer123!' })
    });
    const custCookies = custLoginRes.headers.getSetCookie ? custLoginRes.headers.getSetCookie().join('; ') : custLoginRes.headers.get('set-cookie');
    const custJson = await custLoginRes.json();
    assert(custLoginRes.status === 200 && custJson.data?.user?.role === 'CUSTOMER', 'Customer authentication (POST /api/auth/login)');

    // 4. Customer blocked from Admin API (403 Forbidden)
    const custAdminRes = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: { cookie: custCookies }
    });
    assert(custAdminRes.status === 403, 'Customer blocked from Admin API (403 Forbidden)');

    // 5. Customer Product Flow
    const prodRes = await fetch(`${BASE_URL}/products`);
    const prodJson = await prodRes.json();
    assert(prodRes.status === 200 && prodJson.data.length > 0, 'Customer product catalog flow (GET /api/products)');

    const singleProdRes = await fetch(`${BASE_URL}/products/prod_101`);
    const singleProdJson = await singleProdRes.json();
    assert(singleProdRes.status === 200 && singleProdJson.data.id === 'prod_101', 'Customer product detail flow (GET /api/products/:id)');

    // 6. Customer Cart & Checkout Flow
    const addCartRes = await fetch(`${BASE_URL}/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ productId: 'prod_101', quantity: 2 })
    });
    assert(addCartRes.status === 200, 'Customer cart add item (POST /api/cart/items)');

    const checkoutRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies }
    });
    const checkoutJson = await checkoutRes.json();
    assert(checkoutRes.status === 201 && checkoutJson.data?.id, 'Customer checkout & order creation (POST /api/orders)');
    const createdOrderId = checkoutJson.data?.id;

    // 7. Customer Order History & Details
    const custOrdersRes = await fetch(`${BASE_URL}/orders`, { headers: { cookie: custCookies } });
    const custOrdersJson = await custOrdersRes.json();
    assert(custOrdersRes.status === 200 && custOrdersJson.data?.length > 0, 'Customer order history flow (GET /api/orders)');

    // 8. Admin Authentication
    const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Admin123!' })
    });
    const adminCookies = adminLoginRes.headers.getSetCookie ? adminLoginRes.headers.getSetCookie().join('; ') : adminLoginRes.headers.get('set-cookie');
    const adminJson = await adminLoginRes.json();
    assert(adminLoginRes.status === 200 && adminJson.data?.user?.role === 'ADMIN', 'Admin authentication (POST /api/auth/login)');

    // 9. Admin Dashboard
    const adminDashRes = await fetch(`${BASE_URL}/admin/dashboard`, { headers: { cookie: adminCookies } });
    const adminDashJson = await adminDashRes.json();
    assert(
      adminDashRes.status === 200 &&
        adminDashJson.data?.totalProducts > 0 &&
        adminDashJson.data?.totalOrders > 0,
      'Admin dashboard endpoint (GET /api/admin/dashboard)'
    );

    // 10. Admin Product CRUD
    // A. Product validation (invalid data)
    const invalidProdRes = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ name: '', price: -10, stock: -5 })
    });
    assert(invalidProdRes.status === 400, 'Product creation input validation (returns 400 Bad Request)');

    // B. Product Create (valid data)
    const createProdRes = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({
        name: 'Test Admin Gadget',
        description: 'High performance testing device for admin module.',
        price: 89.99,
        category: 'Electronics',
        image: '⚙️',
        stock: 15
      })
    });
    const createProdJson = await createProdRes.json();
    assert(createProdRes.status === 201 && createProdJson.data?.id, 'Product create (POST /api/admin/products)');
    const newProdId = createProdJson.data?.id;

    // C. Product Update
    const updateProdRes = await fetch(`${BASE_URL}/admin/products/${newProdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ price: 99.99, stock: 20 })
    });
    const updateProdJson = await updateProdRes.json();
    assert(updateProdRes.status === 200 && updateProdJson.data?.price === 99.99, 'Product update (PUT /api/admin/products/:id)');

    // D. Product Delete
    const deleteProdRes = await fetch(`${BASE_URL}/admin/products/${newProdId}`, {
      method: 'DELETE',
      headers: { cookie: adminCookies }
    });
    assert(deleteProdRes.status === 200, 'Product delete (DELETE /api/admin/products/:id)');

    // 11. Admin Orders Management
    // A. Admin Orders List
    const adminOrdersRes = await fetch(`${BASE_URL}/admin/orders`, { headers: { cookie: adminCookies } });
    const adminOrdersJson = await adminOrdersRes.json();
    assert(adminOrdersRes.status === 200 && adminOrdersJson.data?.length > 0, 'Admin order list (GET /api/admin/orders)');

    // B. Admin Order Details
    const adminOrderDetRes = await fetch(`${BASE_URL}/admin/orders/${createdOrderId}`, {
      headers: { cookie: adminCookies }
    });
    const adminOrderDetJson = await adminOrderDetRes.json();
    assert(
      adminOrderDetRes.status === 200 && adminOrderDetJson.data?.customerEmail === 'customer@example.com',
      'Admin order details (GET /api/admin/orders/:id)'
    );

    // C. Order Status Update (Valid Transition: PENDING -> CONFIRMED)
    const statusUpdateRes = await fetch(`${BASE_URL}/admin/orders/${createdOrderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ status: 'CONFIRMED' })
    });
    const statusUpdateJson = await statusUpdateRes.json();
    assert(
      statusUpdateRes.status === 200 && statusUpdateJson.data?.status === 'CONFIRMED',
      'Order status update (PUT /api/admin/orders/:id/status PENDING -> CONFIRMED)'
    );

    // D. Invalid Order Status Transition (CONFIRMED -> PENDING) -> 409 Conflict
    const invalidTransRes = await fetch(`${BASE_URL}/admin/orders/${createdOrderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ status: 'PENDING' })
    });
    assert(invalidTransRes.status === 409, 'Invalid order status transition returns 409 Conflict');

    // 12. Historical Order Integrity Test
    // Create product to order then delete
    const tempProdRes = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({
        name: 'Temporary Historical Item',
        description: 'Item to be ordered then deleted.',
        price: 45.0,
        category: 'Accessories',
        image: '💎',
        stock: 10
      })
    });
    const tempProd = (await tempProdRes.json()).data;

    // Add to cart and order
    await fetch(`${BASE_URL}/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ productId: tempProd.id, quantity: 1 })
    });

    const histOrderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies }
    });
    const histOrder = (await histOrderRes.json()).data;

    // Delete product from catalog
    await fetch(`${BASE_URL}/admin/products/${tempProd.id}`, {
      method: 'DELETE',
      headers: { cookie: adminCookies }
    });

    // Verify order details still contains full historical item snapshot
    const checkHistOrderRes = await fetch(`${BASE_URL}/orders/${histOrder.id}`, {
      headers: { cookie: custCookies }
    });
    const checkHistOrder = (await checkHistOrderRes.json()).data;
    const hasSnapshotItem = checkHistOrder.items.some((i) => i.productName === 'Temporary Historical Item');
    assert(hasSnapshotItem, 'Historical order integrity preserved after product deletion');
  } catch (err) {
    console.error('Test execution error:', err);
  }

  console.log(`\n--- VERIFICATION SUMMARY: ${passCount} / ${totalCount} PASSED ---`);
}

runTests();
