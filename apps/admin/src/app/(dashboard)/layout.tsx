import AdminSidebar from '@/components/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@mns/ui';

const DashboardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />

        <div>
          <SidebarTrigger />

          {children}
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
