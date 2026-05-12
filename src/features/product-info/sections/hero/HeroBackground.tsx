const HeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "linear-gradient(#101828 1px, transparent 1px), linear-gradient(90deg, #101828 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-800/5 rounded-full blur-3xl" />
  </div>
);

export default HeroBackground;
