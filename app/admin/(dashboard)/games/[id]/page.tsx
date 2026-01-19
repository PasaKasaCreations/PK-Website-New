import { notFound } from "next/navigation";
import { getGame } from "@/lib/admin/actions/games";
import { GameForm } from "@/components/admin/forms/GameForm";

interface EditGamePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGamePage({ params }: EditGamePageProps) {
  const { id } = await params;

  let game;
  try {
    game = await getGame(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Edit Game</h2>
        <p className="text-slate-600">Update game details</p>
      </div>

      <GameForm game={game} />
    </div>
  );
}
