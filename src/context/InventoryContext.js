import { createContext, useContext, useMemo, useState } from "react";
import {
  products as seedProducts,
  operations as seedOperations,
  warehouses,
  categories,
  documentTypes,
  statuses,
} from "../data/mockData";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(seedProducts);
  const [operations, setOperations] = useState(seedOperations);

  function login(email) {
    setCurrentUser({ name: email.split("@")[0] || "Manager", email });
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  function addProduct(product) {
    setProducts((prev) => [
      ...prev,
      {
        id: `p-${prev.length + 1}-${Date.now()}`,
        stockByLocation: {},
        ...product,
      },
    ]);
  }

  function nextOperationId() {
    const numbers = operations
      .map((o) => Number(String(o.id).replace(/\D/g, "")))
      .filter((n) => !Number.isNaN(n));
    const next = (numbers.length ? Math.max(...numbers) : 1000) + 1;
    return `op-${next}`;
  }

  function addOperation(operation) {
    const id = nextOperationId();
    const record = {
      id,
      status: "Waiting",
      date: new Date().toISOString().slice(0, 10),
      ...operation,
    };
    setOperations((prev) => [record, ...prev]);
    return id;
  }

  function cancelOperation(operationId) {
    setOperations((prev) =>
      prev.map((op) =>
        op.id === operationId && op.status !== "Done" ? { ...op, status: "Canceled" } : op
      )
    );
  }

  function applyStockDelta(warehouseId, productId, delta) {
    if (!delta) return;
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== productId) return product;
        return {
          ...product,
          stockByLocation: {
            ...product.stockByLocation,
            [warehouseId]: (product.stockByLocation[warehouseId] || 0) + delta,
          },
        };
      })
    );
  }

  function validateOperation(operationId) {
    const op = operations.find((o) => o.id === operationId);
    if (!op || op.status === "Done" || op.status === "Canceled") return;

    op.lines.forEach((line) => {
      if (op.type === "Internal" && op.fromWarehouse && op.toWarehouse) {
        applyStockDelta(op.fromWarehouse, line.productId, -Math.abs(line.qty));
        applyStockDelta(op.toWarehouse, line.productId, Math.abs(line.qty));
      } else {
        const direction = op.type === "Delivery" ? -1 : 1;
        const delta = op.type === "Adjustment" ? line.qty : direction * line.qty;
        applyStockDelta(op.warehouse, line.productId, delta);
      }
    });

    setOperations((prev) =>
      prev.map((o) => (o.id === operationId ? { ...o, status: "Done" } : o))
    );
  }

  function updateProfile(updates) {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      login,
      logout,
      products,
      addProduct,
      operations,
      addOperation,
      cancelOperation,
      validateOperation,
      updateProfile,
      warehouses,
      categories,
      documentTypes,
      statuses,
    }),
    [isAuthenticated, currentUser, products, operations]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used within InventoryProvider");
  return ctx;
}