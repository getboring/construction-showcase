import { useGsapParallax } from "../../../hooks/useGsap";
import { Section, Container } from "../layout";
import { SectionHeader } from "../layout";
import { equipmentList } from "../../../lib/data";

export function ParallaxEquipment() {
  return (
    <Section id="fleet">
      <Container className="mb-12">
        <SectionHeader
          label="Our Fleet"
          title="HEAVY EQUIPMENT"
          description="$48M fleet investment · Owned and maintained in-house"
        />
      </Container>

      <div className="space-y-4">
        {equipmentList.map((eq) => (
          <EquipmentItem key={eq.id} {...eq} />
        ))}
      </div>
    </Section>
  );
}

function EquipmentItem({ name, capacity, description, image }: typeof equipmentList[number]) {
  const imageRef = useGsapParallax([-60, 60]);

  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden rounded-lg mx-6 md:mx-auto max-w-7xl">
      <div ref={imageRef} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-2">
              Equipment
            </p>
            <h3 className="font-display text-4xl md:text-6xl text-zinc-50 leading-none mb-3">
              {name.toUpperCase()}
            </h3>
            <p className="text-steel-300 text-sm md:text-base max-w-md">{description}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mb-1">
              Capacity
            </p>
            <p className="font-display text-5xl md:text-7xl text-amber-500 leading-none">
              {capacity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}