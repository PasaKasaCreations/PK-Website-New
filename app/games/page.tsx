import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ProductCard } from "@/components/shared/ProductCard";
import { GamesHero } from "@/components/shared/GamesHero";
import { Gamepad2 } from "lucide-react";
import { getAllGames, getGamesForHero } from "@/lib/api/games";

export const metadata: Metadata = {
  title: "Our Games - Pasakasa Creations",
  description:
    "Strategic multiplayer card games from Nepal. Play Teen Patti Friends and Callbreak Multiplayer on Android and iOS. Free to download.",
};

export default async function GamesPage() {
  // Fetch games in parallel for better performance
  const [allGames, heroGames] = await Promise.all([
    getAllGames(),
    getGamesForHero(),
  ]);

  const releasedGames = allGames.filter((game) => game.is_published === true);

  return (
    <div className="min-h-screen">
      <GamesHero games={heroGames} />

      {/* Games Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Available Now
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Download our games and start playing with friends and players
                worldwide
              </p>
            </div>
          </AnimatedWrapper>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {releasedGames.map((game, index) => (
              <AnimatedWrapper key={game.id} delay={0.3 + index * 0.1}>
                <ProductCard product={game} />
              </AnimatedWrapper>
            ))}
          </div>

          {/* Coming Soon Section */}
          <AnimatedWrapper delay={0.5}>
            <section className="mt-20 mx-auto max-w-4xl">
              <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-blue-500/10 via-orange-500/10 to-blue-500/10 border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4">
                  <Gamepad2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  More Games Coming Soon
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We&apos;re constantly working on new exciting games. Stay
                  tuned for more multiplayer experiences, strategic gameplay,
                  and fun challenges!
                </p>
              </div>
            </section>
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
