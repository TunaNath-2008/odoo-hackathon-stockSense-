import OperationBoard from "../components/operations/OperationBoard";

export default function DeliveryOrders() {
  return (
    <OperationBoard
      type="Delivery"
      title="Delivery orders"
      description="Pick and pack stock for customer shipment. Validating a delivery decreases stock automatically."
      referenceLabel="Customer / sales order"
      referencePlaceholder="e.g. Sales Order #4473"
      newButtonLabel="New delivery order"
      direction="out"
    />
  );
}