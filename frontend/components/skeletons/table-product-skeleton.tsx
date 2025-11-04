"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableProductSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableProductSkeleton({ rows = 5, columns = 6 }: TableProductSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-300">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-800/10">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i} className="animate-pulse">
              {Array.from({ length: columns }).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
