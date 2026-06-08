export function Wordmark() {
  return (
    <div className="flex items-center gap-2" aria-label="TITAN Build Co.">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M2 26L14 2L26 26H2Z" fill="#f59e0b" />
        <path d="M14 10L19 22H9L14 10Z" fill="#0a0a0b" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl text-zinc-50 tracking-wide">TITAN</span>
        <span className="font-mono text-[8px] text-amber-500 uppercase tracking-[0.25em] mt-0.5">Build Co.</span>
      </div>
    </div>
  );
}