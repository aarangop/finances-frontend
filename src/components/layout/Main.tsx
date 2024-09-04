export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "1rem",
      }}
    >
      {children}
    </main>
  );
}
