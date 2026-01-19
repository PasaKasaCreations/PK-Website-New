import Link from "next/link";
import { getGames } from "@/lib/admin/actions/games";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GamesTable } from "./GamesTable";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Games</h2>
          <p className="text-slate-600">Manage your games and apps</p>
        </div>
        <Link href="/admin/games/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </Button>
        </Link>
      </div>

      <GamesTable games={games} />
    </div>
  );
}
