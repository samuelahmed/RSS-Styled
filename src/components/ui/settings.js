"use client";

import {
  Settings as SettingsIcon,
  PlusCircle,
  CircleUserRound,
  FolderPlus,
  LogOut,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
// import { ThemeToggle } from "./themeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function Settings() {
  const { setTheme } = useTheme();

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <SettingsIcon className="h-6" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <PlusCircle className="h-4" />
              &nbsp;Source
            </MenubarItem>
            <MenubarItem>
              <FolderPlus className="h-4" />
              &nbsp;Category
            </MenubarItem>

            <MenubarItem>
              <CircleUserRound className="h-4" />
              &nbsp;Account
            </MenubarItem>
            <MenubarItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full px-0.5">
                  <Button
                    className="justify-start"
                    variant="outline"
                    size="icon"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="font-normal"> &nbsp;&nbsp;Theme</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </MenubarItem>

            <MenubarSeparator />
            <MenubarItem>
              <LogOut className="h-4" />
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* //onclick open a menu */}

      {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
    </>
  );
}
