import Header from '@/components/ui/header';
import SideBar from '@/components/dashboard/panel/sideBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <SideBar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}