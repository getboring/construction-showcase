import { cn } from "../../../lib/cn";
import { formatCents } from "../../../lib/data";

interface CostEstimatorProps {
  lineItems: Array<{
    id: string;
    label: string;
    quantity: number;
    unitCostCents: number;
    unit?: string;
  }>;
  taxRateCents?: number;
  discountCents?: number;
  className?: string;
  title?: string;
}

export function CostEstimator({ lineItems, taxRateCents = 0, discountCents = 0, className, title }: CostEstimatorProps) {
  const subtotalCents = lineItems.reduce((sum, item) => sum + item.quantity * item.unitCostCents, 0);
  const taxCents = Math.round(subtotalCents * (taxRateCents / 10000));
  const totalCents = subtotalCents + taxCents - discountCents;

  return (
    <div className={cn("bg-steel-900 border border-steel-700 rounded-lg overflow-hidden", className)}>
      {title && (
        <div className="px-6 py-4 border-b border-steel-700">
          <h3 className="font-display text-xl text-zinc-50">{title.toUpperCase()}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-steel-700">
              <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500 text-left px-6 py-3">Item</th>
              <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500 text-right px-6 py-3">Qty</th>
              <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500 text-right px-6 py-3">Unit Cost</th>
              <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500 text-right px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr key={item.id} className="border-b border-steel-800">
                <td className="px-6 py-3 text-sm text-zinc-50">{item.label}</td>
                <td className="px-6 py-3 text-sm text-steel-300 text-right">
                  {item.quantity.toLocaleString()}{item.unit ? ` ${item.unit}` : ""}
                </td>
                <td className="px-6 py-3 text-sm text-steel-300 text-right font-mono">
                  {formatCents(item.unitCostCents)}
                </td>
                <td className="px-6 py-3 text-sm text-zinc-50 text-right font-mono">
                  {formatCents(item.quantity * item.unitCostCents)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {discountCents > 0 && (
              <tr className="border-b border-steel-800">
                <td colSpan={3} className="px-6 py-2 text-sm text-steel-400 text-right">Discount</td>
                <td className="px-6 py-2 text-sm text-green-400 text-right font-mono">-{formatCents(discountCents)}</td>
              </tr>
            )}
            <tr className="border-b border-steel-800">
              <td colSpan={3} className="px-6 py-2 text-sm text-steel-400 text-right">Subtotal</td>
              <td className="px-6 py-2 text-sm text-steel-300 text-right font-mono">{formatCents(subtotalCents)}</td>
            </tr>
            {taxRateCents > 0 && (
              <tr className="border-b border-steel-800">
                <td colSpan={3} className="px-6 py-2 text-sm text-steel-400 text-right">
                  Tax ({(taxRateCents / 100).toFixed(1)}%)
                </td>
                <td className="px-6 py-2 text-sm text-steel-300 text-right font-mono">{formatCents(taxCents)}</td>
              </tr>
            )}
            <tr>
              <td colSpan={3} className="px-6 py-3 text-sm font-mono text-amber-500 uppercase tracking-widest text-right">Total</td>
              <td className="px-6 py-3 text-lg text-zinc-50 text-right font-mono font-bold">{formatCents(totalCents)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}