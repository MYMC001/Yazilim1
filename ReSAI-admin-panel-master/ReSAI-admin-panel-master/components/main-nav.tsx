"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.sectorId}`,
      label: 'Overview',
      active: pathname === `/${params.sectorId}`,
    },
    {
      href: `/${params.sectorId}/fields`,
      label: 'Fields',
      active: pathname === `/${params.sectorId}/fields`,
    },
    {
      href: `/${params.sectorId}/types`,
      label: 'Types',
      active: pathname === `/${params.sectorId}/types`,
    },
    
    {
      href: `/${params.sectorId}/jobs`,
      label: 'Jobs',
      active: pathname === `/${params.sectorId}/jobs`,
    },
    {
      href: `/${params.sectorId}/applications`,
      label: 'Applications',
      active: pathname === `/${params.sectorId}/applications`,
    },
    {
      href: `/${params.sectorId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.sectorId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
