'use client';

import {
  Logo,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@mns/ui';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { GiContract, GiNewspaper } from 'react-icons/gi';
import { SignOutButton } from './SignOutButton';

const MARKETING_LINKS = [
  { label: 'Newsletter', href: '/newsletters', icon: <GiNewspaper /> },
  { label: 'Contacts', href: '/contacts', icon: <GiContract /> },
];

const AdminSidebar = () => {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        {open ? (
          <Logo className="text-center" />
        ) : (
          <Logo className="" fullText={false} size="sm" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-px">
              {MARKETING_LINKS.map((l) => (
                <SidebarMenuItem key={l.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === l.href}
                    className={clsx('', pathname === l.href ? '' : '')}
                  >
                    <Link href={l.href}>
                      <span>{l.icon}</span>
                      <span className={clsx(open ? 'block' : 'hidden')}></span>
                      {l.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
