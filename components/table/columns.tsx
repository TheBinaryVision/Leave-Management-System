"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  profile:String
  reason: string
  type:string
  file:string
  From: string
  To:string
  leaveStatus: "pending" | "success" | "failed"

}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
            <>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />

          </>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "profile",
        header: () => <div className="text-right">Profile</div>,
        cell: ({ row }) => {
            // console.log(row.getValue("profile"))
          return (<Image src={row.getValue("profile")} className=" rounded-xl" alt={row.getValue("profile")} height={30} width={30}/>)
        },
      },
  {
    accessorKey: "leaveStatus",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {

      return ( <div className="text-right font-medium">{row.getValue("leaveStatus")}</div>)
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reason
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("reason")}</div>
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("type")}</div>
    },
  },
  {
    accessorKey: "file",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"

          >
            File
            {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
          </Button>
        )
      },
    cell: ({ row }) => {
      if (row.getValue("file") === "null"){
        return (
          <p className="font-medium">Not Available</p>
        )
      }
      return (
        <a href={row.getValue("file")} target="_blank">
          <Download/>
        </a>
      )
    },
  },
  {
    accessorKey: "From",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            From
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "To",
    header: "To",
  },


  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {alert("Successfully Deleted!")}}
            >
              Delete Request
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
