import OperationBoard from "../components/operations/OperationBoard";

export default function Receipts() {
  return (
    <OperationBoard
      type="Receipt"
      title="Receipts"
      description="Record incoming stock from suppliers. Validating a receipt increases stock automatically."
      referenceLabel="Supplier"
      referencePlaceholder="e.g. Steel & Co."
      newButtonLabel="New receipt"
      direction="in"
    />
  );
}