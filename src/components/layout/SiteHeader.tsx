"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function SiteHeader() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "text-sm font-medium transition-colors hover:text-primary",
      pathname === href ? "text-primary" : "text-foreground/80",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link href={siteConfig.bookCta.href}>{siteConfig.bookCta.label}</Link>
          </Button>
        </div>

        <div className="flex items-center md:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="left-0 top-0 flex h-full max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col gap-6 rounded-none border-0 p-6 sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border sm:p-6">
              <div className="font-display text-lg font-semibold">{siteConfig.name}</div>
              <nav className="flex flex-col gap-4" aria-label="Mobile">
                {navItems.map((item) => (
                  <DialogClose asChild key={item.href}>
                    <Link href={item.href} className={cn("text-lg", linkClass(item.href))}>
                      {item.label}
                    </Link>
                  </DialogClose>
                ))}
              </nav>
              <DialogClose asChild>
                <Button asChild className="w-full sm:w-auto">
                  <Link href={siteConfig.bookCta.href}>{siteConfig.bookCta.label}</Link>
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
