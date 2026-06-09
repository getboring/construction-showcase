import { useGsapCounter } from "../../../hooks/useGsap";
import { Section, Container, SectionHeader } from "../layout";
import { stats } from "../../../lib/data";

export function NumberCounters() {
  return (
    <Section id="counters">
      <Container>
        <SectionHeader label="By the Numbers" title="BUILT DIFFERENT." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <StatBlock key={stat.label} stat={stat} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function StatBlock({ stat }: { stat: (typeof stats)[number] }) {
  const decimals = "decimals" in stat ? (stat as { decimals: number }).decimals : undefined;
  const counterRef = useGsapCounter(stat.value, {
    decimals,
    suffix: stat.suffix,
  });

  return (
    <div className="border-l-2 border-amber-500 pl-6">
      <div className="font-display text-6xl md:text-7xl text-amber-500 leading-none">
        <span ref={counterRef}>0</span>
        <span className="text-3xl md:text-4xl ml-1">{stat.suffix}</span>
      </div>
      <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mt-3">
        {stat.label}
      </p>
    </div>
  );
}