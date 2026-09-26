// Mock data standing in for a real backend. Swap this module out for
// API calls once the server side exists — the shapes below match what
// the UI expects.

export const categories = ["Raw Materials", "Components", "Finished Goods", "Packaging"];

export const warehouses = [
  { id: "wh-1", name: "Main Warehouse", location: "Sector 12, Amritsar", racks: 18 },
  { id: "wh-2", name: "Production Floor", location: "Unit B, Amritsar", racks: 10 },
  { id: "wh-3", name: "Regional Depot", location: "Ludhiana", racks: 8 },
];

export const products = [
  {
    id: "p-1",
    name: "Steel Rods (12mm)",
    sku: "STL-RD-012",
    category: "Raw Materials",
    uom: "kg",
    reorderPoint: 200,
    stockByLocation: { "wh-1": 420, "wh-2": 60, "wh-3": 0 },
  },
  {
    id: "p-2",
    name: "Oak Chair Frame",
    sku: "FRN-CHR-004",
    category: "Finished Goods",
    uom: "pcs",
    reorderPoint: 15,
    stockByLocation: { "wh-1": 8, "wh-2": 22, "wh-3": 5 },
  },
  {
    id: "p-3",
    name: "Corrugated Box (M)",
    sku: "PKG-BOX-M02",
    category: "Packaging",
    uom: "pcs",
    reorderPoint: 500,
    stockByLocation: { "wh-1": 1250, "wh-2": 0, "wh-3": 340 },
  },
  {
    id: "p-4",
    name: "M8 Hex Bolts",
    sku: "CMP-BLT-M8",
    category: "Components",
    uom: "pcs",
    reorderPoint: 1000,
    stockByLocation: { "wh-1": 640, "wh-2": 210, "wh-3": 0 },
  },
  {
    id: "p-5",
    name: "Aluminium Sheet 2mm",
    sku: "STL-SHT-002",
    category: "Raw Materials",
    uom: "sheet",
    reorderPoint: 40,
    stockByLocation: { "wh-1": 55, "wh-2": 12, "wh-3": 9 },
  },
  {
    id: "p-6",
    name: "Ball Bearing 6203",
    sku: "CMP-BRG-6203",
    category: "Components",
    uom: "pcs",
    reorderPoint: 300,
    stockByLocation: { "wh-1": 90, "wh-2": 0, "wh-3": 0 },
  },
];

export const documentTypes = ["Receipt", "Delivery", "Internal", "Adjustment"];
export const statuses = ["Draft", "Waiting", "Ready", "Done", "Canceled"];

export const operations = [
  {
    id: "op-1001",
    type: "Receipt",
    reference: "Steel & Co.",
    status: "Done",
    warehouse: "wh-1",
    date: "2026-09-24",
    lines: [{ productId: "p-1", qty: 50 }],
  },
  {
    id: "op-1002",
    type: "Delivery",
    reference: "Sales Order #4471",
    status: "Ready",
    warehouse: "wh-2",
    date: "2026-09-25",
    lines: [{ productId: "p-2", qty: 10 }],
  },
  {
    id: "op-1003",
    type: "Internal",
    reference: "Main Warehouse → Production Floor",
    status: "Waiting",
    warehouse: "wh-1",
    date: "2026-09-25",
    lines: [{ productId: "p-1", qty: 100 }],
  },
  {
    id: "op-1004",
    type: "Adjustment",
    reference: "Cycle count - Rack A4",
    status: "Done",
    warehouse: "wh-1",
    date: "2026-09-23",
    lines: [{ productId: "p-1", qty: -3 }],
  },
  {
    id: "op-1005",
    type: "Receipt",
    reference: "Bolt World Traders",
    status: "Waiting",
    warehouse: "wh-2",
    date: "2026-09-26",
    lines: [{ productId: "p-4", qty: 500 }],
  },
  {
    id: "op-1006",
    type: "Delivery",
    reference: "Sales Order #4472",
    status: "Draft",
    warehouse: "wh-3",
    date: "2026-09-26",
    lines: [{ productId: "p-3", qty: 120 }],
  },
  {
    id: "op-1007",
    type: "Internal",
    reference: "Rack A → Rack B",
    status: "Done",
    warehouse: "wh-1",
    date: "2026-09-22",
    lines: [{ productId: "p-5", qty: 10 }],
  },
];

export function totalStock(product) {
  return Object.values(product.stockByLocation).reduce((a, b) => a + b, 0);
}

export function stockStatus(product) {
  const total = totalStock(product);
  if (total === 0) return "out";
  if (total <= product.reorderPoint) return "low";
  return "ok";
}