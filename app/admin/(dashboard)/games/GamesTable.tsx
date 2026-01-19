"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { deleteGame } from "@/lib/admin/actions/games";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Tables } from "@/types/database.types";

interface GamesTableProps {
  games: Tables<"games">[];
}

const statusLabels = {
  in_development: "In Development",
  coming_soon: "Coming Soon",
  released: "Released",
};

const statusColors = {
  in_development: "bg-yellow-100 text-yellow-800",
  coming_soon: "bg-blue-100 text-blue-800",
  released: "bg-green-100 text-green-800",
};

export function GamesTable({ games }: GamesTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      await deleteGame(deleteId);
      setDeleteId(null);
      router.refresh();
    });
  };

  const columns: Column<Tables<"games">>[] = [
    {
      key: "name",
      header: "Name",
      cell: (game) => (
        <div>
          <p className="font-medium">{game.name}</p>
          <p className="text-sm text-slate-500">{game.tagline}</p>
        </div>
      ),
    },
    {
      key: "genre",
      header: "Genre",
    },
    {
      key: "hero_stats",
      header: "Rating",
      cell: (game) => {
        const stats = game.hero_stats as { rating?: string } | null;
        return stats?.rating ? (
          <span className="text-sm">{stats.rating} ⭐</span>
        ) : (
          <span className="text-slate-400 text-sm">-</span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (game) => (
        <Badge className={statusColors[game.status]}>
          {statusLabels[game.status]}
        </Badge>
      ),
    },
    {
      key: "is_published",
      header: "Published",
      cell: (game) => (
        <Badge variant={game.is_published ? "default" : "secondary"}>
          {game.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={games}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search games..."
        viewHref={(game) => `/admin/games/${game.id}/view`}
        editHref={(game) => `/admin/games/${game.id}`}
        onDelete={(game) => setDeleteId(game.id)}
        emptyMessage="No games found. Create your first game!"
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Game</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this game? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
