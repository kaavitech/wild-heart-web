export function LeafDivider() {
  return (
    <div aria-hidden className="my-2 flex items-center justify-center gap-3 text-secondary/50">
      <span className="h-px w-12 bg-secondary/30" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9 6 4 9 4 14a8 8 0 0 0 16 0c0-5-5-8-8-12Z" />
      </svg>
      <span className="h-px w-12 bg-secondary/30" />
    </div>
  );
}
