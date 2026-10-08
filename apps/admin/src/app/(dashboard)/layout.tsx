import AdminSidebar from '@/components/AdminSidebar';
import { QueryProvider } from '@/components/QueryProvider';
import { SidebarProvider, SidebarTrigger } from '@mns/ui';

const DashboardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AdminSidebar />

        <div>
          <SidebarTrigger />

          {children}
        </div>
      </SidebarProvider>
    </QueryProvider>
  );
};

export default DashboardLayout;
