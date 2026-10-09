import { AdminHeader } from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import { QueryProvider } from '@/components/QueryProvider';
import { SidebarProvider } from '@mns/ui';

const DashboardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AdminSidebar />

        <div className="w-full p-4">
          <AdminHeader />
          {children}
        </div>
      </SidebarProvider>
    </QueryProvider>
  );
};

export default DashboardLayout;
