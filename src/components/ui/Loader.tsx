export function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="pulse-soft flex items-center gap-2 text-sm text-slate-600" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-200 border-t-fuchsia-600" />
      <span>{label}</span>
    </div>
  );
}
