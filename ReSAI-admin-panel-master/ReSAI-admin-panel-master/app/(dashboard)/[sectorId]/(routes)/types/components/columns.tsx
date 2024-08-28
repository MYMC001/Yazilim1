"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type TypeColumn = {
  id: string
  name: string;
  filedLabel: string;
  createdAt: string;
}

export const columns: ColumnDef<TypeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "filed",
    header: "Filed",
    cell: ({ row }) => row.original.filedLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
