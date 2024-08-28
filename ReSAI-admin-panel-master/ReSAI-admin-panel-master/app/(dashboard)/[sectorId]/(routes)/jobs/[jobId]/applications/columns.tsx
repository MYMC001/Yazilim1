"use client"

import { Decimal } from "@prisma/client/runtime";
import { ColumnDef } from "@tanstack/react-table"

export type ApplicationColumn = {
  id: string;
  name: string;
  surname: string;
  email: string;
  resume: string;
  score: Decimal;
  range: number;
  status: string;
  createdAt: string;
}

export const columns: ColumnDef<ApplicationColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "resume",
    header: "Resume",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "range",
    header: "Range",
  },
  
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  /*{
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },*/
];
