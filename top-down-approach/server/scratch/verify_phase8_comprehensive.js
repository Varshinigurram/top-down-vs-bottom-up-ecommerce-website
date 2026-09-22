const BASE_URL = 'http://localhost:5001/api';

async function runComprehensiveSuite() {
  console.log('====================================================');
  console.log('PHASE 8 — TOP-DOWN COMPREHENSIVE VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;
  const testResults = [];

  function test(id, description, condition, details = '') {
    if (condition) {
      console.log(`[PASS] ${id}: ${description}`);
      testResults.push({ id, description, result: 'PASS', details });
      passed++;
    } else {
      console.error(`[FAIL] ${id}: ${description} — ${details}`);
      testResults.push({ id, description, result: 'FAIL', details });
      failed++;
    }
  }

  try {
    // 1. Health API
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthJson = await healthRes.json();
    test('REG-01', 'Application startup & Health check API', healthRes.status === 200 && healthJson.status === 'ok');

    // 2. Customer Registration
    const testRegEmail = `user_p8_${Date.now()}@example.com`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Phase8 User', email: testRegEmail, password: 'Password123!' })
    });
    const regJson = await regRes.json();
    test('REG-02', 'Customer registration (FR-01)', regRes.status === 201 && regJson.data?.user?.email === testRegEmail);

    // 3. Duplicate Registration Rejection
    const dupRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Phase8 User', email: testRegEmail, password: 'Password123!' })
    });
    test('REG-03', 'Duplicate registration rejection (409 Conflict / 400 Bad Request)', dupRegRes.status === 409 || dupRegRes.status === 400);

    // 4. Customer Login
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testRegEmail, password: 'Password123!' })
    });
    const custCookies = loginRes.headers.getSetCookie ? loginRes.headers.getSetCookie().join('; ') : loginRes.headers.get('set-cookie');
    const loginJson = await loginRes.json();
    test('REG-04', 'Customer login (FR-02)', loginRes.status === 200 && loginJson.data?.user?.role === 'CUSTOMER');

    // 5. Invalid Login
    const invalidLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testRegEmail, password: 'WrongPassword!' })
    });
    test('REG-05', 'Invalid credentials login rejection (401)', invalidLoginRes.status === 401);

    // 6. Current User Retrieval / Profile
    const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: { cookie: custCookies } });
    const meJson = await meRes.json();
    test('REG-06', 'Current-user profile retrieval (FR-03)', meRes.status === 200 && meJson.data?.user?.email === testRegEmail);

    // 7. Product Catalog Browsing
    const catRes = await fetch(`${BASE_URL}/products`);
    const catJson = await catRes.json();
    test('REG-07', 'Product catalog browsing (FR-04)', catRes.status === 200 && Array.isArray(catJson.data) && catJson.data.length >= 10);

    // 8. Product Search
    const searchRes = await fetch(`${BASE_URL}/products?search=keyboard`);
    const searchJson = await searchRes.json();
    test('REG-08', 'Product search by keyword (FR-05)', searchRes.status === 200 && searchJson.data.some(p => p.name.toLowerCase().includes('keyboard')));

    // 9. Category Filtering
    const filterRes = await fetch(`${BASE_URL}/products?category=Electronics`);
    const filterJson = await filterRes.json();
    test('REG-09', 'Product category filtering (FR-06)', filterRes.status === 200 && filterJson.data.every(p => p.category === 'Electronics'));

    // 10. Product Details View
    const detRes = await fetch(`${BASE_URL}/products/prod_101`);
    const detJson = await detRes.json();
    test('REG-10', 'Product details inspection (FR-07)', detRes.status === 200 && detJson.data.id === 'prod_101');

    // 11. Nonexistent Product ID Handling
    const nonExistProdRes = await fetch(`${BASE_URL}/products/prod_nonexistent_999`);
    test('REG-11', 'Nonexistent product ID returns 404', nonExistProdRes.status === 404);

    // 12. Empty Search Results Handling
    const emptySearchRes = await fetch(`${BASE_URL}/products?search=xyz_nonexistent_term_99`);
    const emptySearchJson = await emptySearchRes.json();
    test('REG-12', 'Empty search results handled gracefully', emptySearchRes.status === 200 && emptySearchJson.data.length === 0);

    // 13. Shopping Cart - Add Item
    const addCartRes = await fetch(`${BASE_URL}/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ productId: 'prod_101', quantity: 2 })
    });
    const addCartJson = await addCartRes.json();
    test('REG-13', 'Add item to cart (FR-08)', addCartRes.status === 200 && addCartJson.data?.items?.some(i => i.productId === 'prod_101'));

    // 14. Increase / Update Cart Item Quantity
    const updateQtyRes = await fetch(`${BASE_URL}/cart/items/prod_101`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ quantity: 4 })
    });
    const updateQtyJson = await updateQtyRes.json();
    test('REG-14', 'Update cart quantity (FR-09)', updateQtyRes.status === 200 && updateQtyJson.data?.items?.find(i => i.productId === 'prod_101')?.quantity === 4);

    // 15. Stock Excess Validation
    const excessStockRes = await fetch(`${BASE_URL}/cart/items/prod_101`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ quantity: 9999 })
    });
    test('REG-15', 'Stock excess quantity validation returns 409 Conflict', excessStockRes.status === 409);

    // 16. Remove Cart Item
    await fetch(`${BASE_URL}/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ productId: 'prod_102', quantity: 1 })
    });
    const removeRes = await fetch(`${BASE_URL}/cart/items/prod_102`, {
      method: 'DELETE',
      headers: { cookie: custCookies }
    });
    const removeJson = await removeRes.json();
    test('REG-16', 'Remove item from cart (FR-10)', removeRes.status === 200 && !removeJson.data?.items?.some(i => i.productId === 'prod_102'));

    // 17. View Cart Summary & Calculation Integrity (FR-11)
    const cartSummaryRes = await fetch(`${BASE_URL}/cart`, { headers: { cookie: custCookies } });
    const cartSummaryJson = await cartSummaryRes.json();
    const item = cartSummaryJson.data?.items?.[0];
    const expectedSubtotal = item ? Number((item.quantity * item.price).toFixed(2)) : 0;
    test(
      'REG-17',
      'View cart summary & backend-authoritative calculation integrity (FR-11)',
      cartSummaryRes.status === 200 && Math.abs(cartSummaryJson.data.subtotal - expectedSubtotal) < 0.01
    );

    // 18. Checkout & Order Placement (FR-12)
    const prodBeforeRes = await fetch(`${BASE_URL}/products/prod_101`);
    const prodBeforeJson = await prodBeforeRes.json();
    const stockBefore = prodBeforeJson.data.stock;

    const checkoutRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies }
    });
    const checkoutJson = await checkoutRes.json();
    const createdOrder = checkoutJson.data;
    test('REG-18', 'Checkout and order creation (FR-12)', checkoutRes.status === 201 && createdOrder?.id);

    // 19. Stock Reduction Verification
    const prodAfterRes = await fetch(`${BASE_URL}/products/prod_101`);
    const prodAfterJson = await prodAfterRes.json();
    test(
      'REG-19',
      'Inventory stock reduced after order placement',
      prodAfterRes.status === 200 && prodAfterJson.data.stock === stockBefore - 4
    );

    // 20. Customer Order History (FR-13)
    const orderHistRes = await fetch(`${BASE_URL}/orders`, { headers: { cookie: custCookies } });
    const orderHistJson = await orderHistRes.json();
    test('REG-20', 'Customer order history view (FR-13)', orderHistRes.status === 200 && orderHistJson.data.some(o => o.id === createdOrder.id));

    // 21. Order Details Inspection (FR-14)
    const orderDetRes = await fetch(`${BASE_URL}/orders/${createdOrder.id}`, { headers: { cookie: custCookies } });
    const orderDetJson = await orderDetRes.json();
    test('REG-21', 'Customer order details inspection (FR-14)', orderDetRes.status === 200 && orderDetJson.data.id === createdOrder.id);

    // 22. Nonexistent Order ID Handling
    const nonExistOrderRes = await fetch(`${BASE_URL}/orders/ord_nonexistent_888`, { headers: { cookie: custCookies } });
    test('REG-22', 'Nonexistent order ID returns 404', nonExistOrderRes.status === 404);

    // 23. Logout & Access Protection (FR-02 & Security)
    const logoutRes = await fetch(`${BASE_URL}/auth/logout`, { method: 'POST', headers: { cookie: custCookies } });
    const loggedOutCookies = logoutRes.headers.getSetCookie ? logoutRes.headers.getSetCookie().join('; ') : logoutRes.headers.get('set-cookie');
    const protectedRes = await fetch(`${BASE_URL}/cart`, { headers: { cookie: loggedOutCookies || '' } });
    test('REG-23', 'Logged out user blocked from protected customer APIs (401)', protectedRes.status === 401);

    // 24. Admin Authentication & Protection (FR-15..FR-18 & Security)
    const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Admin123!' })
    });
    const adminCookies = adminLoginRes.headers.getSetCookie ? adminLoginRes.headers.getSetCookie().join('; ') : adminLoginRes.headers.get('set-cookie');
    test('REG-24', 'Admin authentication (FR-02)', adminLoginRes.status === 200);

    // Customer trying to access admin API -> 403 Forbidden
    const custAdminBlockRes = await fetch(`${BASE_URL}/admin/dashboard`, { headers: { cookie: custCookies } });
    test('REG-25', 'Customer user blocked from Admin API (403 Forbidden)', custAdminBlockRes.status === 403);

    // 25. Admin Dashboard
    const adminDashRes = await fetch(`${BASE_URL}/admin/dashboard`, { headers: { cookie: adminCookies } });
    const adminDashJson = await adminDashRes.json();
    test('REG-26', 'Admin dashboard statistics API', adminDashRes.status === 200 && adminDashJson.data?.totalProducts > 0);

    // 26. Admin Product CRUD & Input Validation (FR-15 & FR-16)
    const invalidProdRes = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ name: '', price: -10, stock: -5 })
    });
    test('REG-27', 'Admin product validation rejects invalid data (400)', invalidProdRes.status === 400);

    const createProdRes = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({
        name: 'Phase 8 Audit Item',
        description: 'Temporary item for verification audit.',
        price: 55.0,
        category: 'Electronics',
        image: '⚙️',
        stock: 12
      })
    });
    const createProdJson = await createProdRes.json();
    test('REG-28', 'Admin product creation (FR-15)', createProdRes.status === 201 && createProdJson.data?.id);
    const auditProdId = createProdJson.data?.id;

    const updateProdRes = await fetch(`${BASE_URL}/admin/products/${auditProdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ price: 65.0, stock: 15 })
    });
    test('REG-29', 'Admin product update (FR-16)', updateProdRes.status === 200);

    // 27. Admin Order Overview & Details (FR-17)
    const adminOrdersRes = await fetch(`${BASE_URL}/admin/orders`, { headers: { cookie: adminCookies } });
    test('REG-30', 'Admin order overview list (FR-17)', adminOrdersRes.status === 200);

    const adminOrderDetRes = await fetch(`${BASE_URL}/admin/orders/${createdOrder.id}`, { headers: { cookie: adminCookies } });
    test('REG-31', 'Admin order details inspection', adminOrderDetRes.status === 200);

    // 28. Order Status Transitions & State Machine (FR-18)
    const status1Res = await fetch(`${BASE_URL}/admin/orders/${createdOrder.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ status: 'CONFIRMED' })
    });
    test('REG-32', 'Admin order status update PENDING -> CONFIRMED (FR-18)', status1Res.status === 200);

    const status2Res = await fetch(`${BASE_URL}/admin/orders/${createdOrder.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ status: 'SHIPPED' })
    });
    test('REG-33', 'Admin order status update CONFIRMED -> SHIPPED', status2Res.status === 200);

    const status3Res = await fetch(`${BASE_URL}/admin/orders/${createdOrder.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ status: 'DELIVERED' })
    });
    test('REG-34', 'Admin order status update SHIPPED -> DELIVERED', status3Res.status === 200);

    const statusInvalidRes = await fetch(`${BASE_URL}/admin/orders/${createdOrder.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', cookie: adminCookies },
      body: JSON.stringify({ status: 'PENDING' })
    });
    test('REG-35', 'Invalid order status transition DELIVERED -> PENDING returns 409 Conflict', statusInvalidRes.status === 409);

    // 29. Historical Order Integrity Test
    await fetch(`${BASE_URL}/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies },
      body: JSON.stringify({ productId: auditProdId, quantity: 1 })
    });
    const histOrderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie: custCookies }
    });
    const histOrderJson = await histOrderRes.json();
    const histOrderId = histOrderJson.data?.id;

    await fetch(`${BASE_URL}/admin/products/${auditProdId}`, {
      method: 'DELETE',
      headers: { cookie: adminCookies }
    });

    const checkHistRes = await fetch(`${BASE_URL}/orders/${histOrderId}`, { headers: { cookie: custCookies } });
    const checkHistJson = await checkHistRes.json();
    const itemSnapshotRetained = checkHistJson.data?.items?.some(i => i.productName === 'Phase 8 Audit Item');
    test('REG-36', 'Historical order item snapshot integrity preserved after product deletion', checkHistRes.status === 200 && itemSnapshotRetained);

  } catch (err) {
    console.error('Execution error during test suite:', err);
  }

  console.log('\n====================================================');
  console.log(`VERIFICATION COMPLETE: ${passed} / ${passed + failed} PASSED (${failed} FAILED)`);
  console.log('====================================================\n');
}

runComprehensiveSuite();
