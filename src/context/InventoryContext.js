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

  function validateOperation(operationId) {
    setOperations((prev) =>
      prev.map((op) => (op.id === operationId ? { ...op, status: "Done" } : op))
    );

    setOperations((prevOps) => {
      const op = prevOps.find((o) => o.id === operationId);
      if (op && op.status === "Done") {
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            const line = op.lines.find((l) => l.productId === product.id);
            if (!line) return product;
            const direction = op.type === "Delivery" ? -1 : 1;
            const delta = op.type === "Adjustment" ? line.qty : direction * line.qty;
            return {
              ...product,
              stockByLocation: {
                ...product.stockByLocation,
                [op.warehouse]: (product.stockByLocation[op.warehouse] || 0) + delta,
              },
            };
          })
        );
      }
      return prevOps;
    });
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
      validateOperation,
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