import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ProductCard } from "@/components/shared/ProductCard";
import { Gamepad2, Sparkles, Trophy, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Games - Pasakasa Creations",
  description:
    "Strategic multiplayer card games from Nepal. Play Teen Patti Friends and Callbreak Multiplayer on Android and iOS. Free to download.",
};

// Mock data - Replace with actual Supabase queries
const games = [
  {
    id: "1",
    name: "Teen Patti Friends",
    slug: "teen-patti-friends",
    tagline: "Play with friends, win big!",
    description:
      "Experience the thrill of Teen Patti with your friends. Join tables, compete in tournaments, and enjoy the ultimate Indian card game experience with daily rewards, fortune wheel, and emoji inventory to express yourself during gameplay.",
    thumbnail_url: "/images/TeenPattiFriendsLogo.png",
    screenshots: [
      "/images/TeenPatti_Dashboard.png",
      "/images/TeenPatti_Gameplay.png",
      "/images/TeenPatti_FortuneWheel.png",
      "/images/TeenPatti_DailyReward.png",
      "/images/TeenPatti_EmojiInventory.png",
    ],
    platforms: ["android", "ios"] as const,
    category: "game" as const,
    status: "launched" as const,
    play_store_url: "https://play.google.com/store/apps/details?id=com.pasakasa.teenpatti",
    app_store_url: "https://apps.apple.com",
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Callbreak Multiplayer",
    slug: "callbreak-multiplayer",
    tagline: "Master the tricks, win the game",
    description:
      "Play the classic Callbreak card game online with players worldwide. Strategic gameplay with stunning visuals, multiplayer lobbies, and competitive matches. Challenge your friends or compete with global players in this addictive trick-taking card game.",
    thumbnail_url: "/images/callbreaklogo.webp",
    screenshots: [
      "/images/CallbreakBanner.webp",
      "/images/callbreakLoginScreen.webp",
      "/images/callbreakMainTable.webp",
      "/images/callbreakMultiplayerLobby.webp",
      "/images/victoryCallbreak.webp",
    ],
    platforms: ["android"] as const,
    category: "game" as const,
    status: "launched" as const,
    play_store_url: "https://play.google.com/store/apps/details?id=com.pasakasa.callbreak",
    featured: true,
    created_at: "",
    updated_at: "",
  },
];

const launchedGames = games.filter((game) => game.status === "launched");

export default function GamesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-red-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                MADE IN NEPAL
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Play Our Amazing
                <br />
                Multiplayer Card Games
              </h1>

              <p className="text-xl md:text-2xl text-orange-100">
                Strategic multiplayer card games crafted with love in Nepal.
                Free to play, challenging to master.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-lg">100K+ Players</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  <span className="text-lg">Daily Tournaments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6" />
                  <span className="text-lg">Cross-Platform</span>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>

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
            {launchedGames.map((game, index) => (
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
                <h2 className="text-3xl font-bold mb-4">More Games Coming Soon</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're constantly working on new exciting games. Stay tuned for
                  more multiplayer experiences, strategic gameplay, and fun
                  challenges!
                </p>
              </div>
            </section>
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
