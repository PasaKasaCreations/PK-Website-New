import { GameForm } from "@/components/admin/forms/GameForm";

export default function NewGamePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create Game</h2>
        <p className="text-slate-600">Add a new game to your portfolio</p>
      </div>

      <GameForm />
    </div>
  );
}
