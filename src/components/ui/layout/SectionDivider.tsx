export function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="section-divider" />
    </div>
  );
}

export function GrainOverlay({ children }: { children?: React.ReactNode }) {
  return <div className="image-grain">{children}</div>;
}