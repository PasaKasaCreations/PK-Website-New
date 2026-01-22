import { Metadata } from "next";
import {
  GamesHeroVariants,
  GamesGridSection,
  ComingSoonSection,
} from "@/components/games";
import { getAllGames } from "@/lib/api/games";

export const metadata: Metadata = {
  title: "Our Games - Pasakasa Creations",
  description:
    "Strategic multiplayer card games from Nepal. Play Teen Patti Friends and Callbreak Multiplayer on Android and iOS. Free to download.",
};

export default async function GamesPage() {
  const allGames = await getAllGames();

  // Get all published games for the carousel
  const publishedGames = allGames.filter((game) => game.is_published === true);

  return (
    <div className="min-h-screen bg-background">
      {/* Games Hero - Play Store Style */}
      <GamesHeroVariants games={publishedGames} />

      {/* Games Grid Section */}
      <GamesGridSection games={publishedGames} />

      {/* Enhanced Coming Soon Section */}
      <ComingSoonSection />
    </div>
  );
}
