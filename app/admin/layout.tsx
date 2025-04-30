export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-600">Manage homepage content</p>
          </header>
          <main>{children}</main>
        </div>
      </div>
    );
  }
  