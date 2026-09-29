export default function FolderIcon({ id, hue }) {
  const a = `hsl(${hue},90%,78%)`, b = `hsl(${hue},80%,52%)`;
  return (
    <svg viewBox="0 0 110 90" width="110" height="90" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M8 18 Q8 10 16 10 H40 L48 20 H94 Q102 20 102 28 V72 Q102 80 94 80 H16 Q8 80 8 72Z" fill={`url(#g${id})`} stroke="#fff" strokeWidth="3" />
      <path d="M12 26 Q12 22 18 22 H92 Q98 22 98 28 V44 Q55 56 12 44Z" fill={`url(#h${id})`} />
    </svg>
  );
}
