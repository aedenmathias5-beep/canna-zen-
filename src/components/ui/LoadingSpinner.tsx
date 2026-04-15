export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-3 border-[var(--border-color)] border-t-[#c4956a] rounded-full animate-spin" />
    </div>
  );
}
