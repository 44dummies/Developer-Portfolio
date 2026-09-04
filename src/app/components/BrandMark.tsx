type BrandMarkProps = {
  className?: string;
  title?: string;
};

/** A compact double-four mark: two interlocked construction lines, built to hold at favicon scale. */
export function BrandMark({ className = "", title = "44 Dummies" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <path d="M3 11L8 3V21M3 11H11M13 11L18 3V21M13 11H21" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
