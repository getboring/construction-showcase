import { cn } from "../../../lib/cn";
import type { Equipment } from "../../../db/schema";

interface EquipmentCardProps {
  equipment: Equipment;
  className?: string;
}

export function EquipmentCard({ equipment, className }: EquipmentCardProps) {
  return (
    <div className={cn("bg-steel-900 border border-steel-800 rounded-lg overflow-hidden group hover:border-amber-500/50 transition-colors", className)}>
      <div className="h-48 overflow-hidden">
        <img
          src={equipment.image}
          alt={equipment.name}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <p className="font-mono text-xs text-amber-500 uppercase tracking-[0.15em] mb-2">
          {equipment.category}
        </p>
        <h3 className="font-display text-xl text-zinc-50 leading-none mb-2">
          {equipment.name.toUpperCase()}
        </h3>
        <p className="text-steel-400 text-sm leading-relaxed mb-4">{equipment.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-steel-500 uppercase tracking-widest">Capacity</span>
          <span className="font-display text-2xl text-amber-500">{equipment.capacity}</span>
        </div>
      </div>
    </div>
  );
}