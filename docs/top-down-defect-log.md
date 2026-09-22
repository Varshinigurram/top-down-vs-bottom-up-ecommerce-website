# Top-Down Implementation Defect Log

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 8 — Stabilization, Measurement & Freeze  
**Target Application:** `top-down-approach/`  

---

## Defect Tracking Log

| Defect ID | Area | Description | Severity | Status | Fix / Action Taken | Verification |
|---|---|---|---|---|---|---|
| **DEF-01** | Test Suite | Import statement in test script referenced external `node-fetch` module instead of native Node 22 `fetch`. | **LOW** | **RESOLVED** | Removed external module import; updated test runner to use native Node 22 `fetch`. | Executed test script with Node v22.22.3 cleanly. |
| **DEF-02** | Test Assertions | Cart summary test assertion expected `totalAmount` field directly on Cart entity instead of `subtotal`. | **LOW** | **RESOLVED** | Updated assertion to verify `cart.subtotal` matching `sum(quantity * unitPrice)`. | `REG-17` passed 100%. |

---

## Summary
No critical, high, or blocking defects remain in the Top-Down application. All 36 functional, administrative, security, and edge-case regression tests passed successfully.
