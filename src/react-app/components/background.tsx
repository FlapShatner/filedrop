function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full bg-bg">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:20px_20px] "></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-radial-[at_50%_10%] from-[rgba(21,44,34,0.3)] from-40% to-[#091a08] to-100%"></div>
      {children}
    </div>
  );
}

export default Background;
