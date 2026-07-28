

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
        <div className="flex min-h-screen w-full">
     
          <main className="w-full">
          
            {children}
          </main>
        </div>
     
    </>
  );
}

