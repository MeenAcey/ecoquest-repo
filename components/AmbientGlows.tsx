export default function AmbientGlows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%] rounded-full opacity-60 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[15%] -right-[10%] w-[55%] h-[55%] rounded-full opacity-60 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[35%] left-[35%] w-[40%] h-[40%] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(211, 188, 142, 0.1) 0%, transparent 70%)" }}
      />
    </div>
  );
}
