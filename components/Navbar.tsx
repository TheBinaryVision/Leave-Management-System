"use client"

import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
 
  import { useTheme } from "next-themes"
  import { Button } from "@/components/ui/button"


export default function Navbar() {
    const { setTheme } = useTheme()
  return (
    <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
        <Button>
            Sign Up
        <span className="sr-only">Toggle theme</span>
        </Button>
    </NavigationMenuItem>
    <NavigationMenuItem>
    
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

  )
}
