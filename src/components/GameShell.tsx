export function GameShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <section className="my-auto overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl shadow-violet-950/40 backdrop-blur">
        {children}
      </section>
    </main>
  );
}
