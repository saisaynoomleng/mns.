import AdminSidebar from '@/components/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@mns/ui';

const DashboardLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <>
      <SidebarProvider>
        <SidebarTrigger />
        <div>
          <AdminSidebar />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
