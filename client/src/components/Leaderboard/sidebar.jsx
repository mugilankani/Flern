import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import players from "../../data/userData";

export default function Component() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <Trophy className="h-6 w-6 text-yellow-400" />
      </div>

      {/* Top Player */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-yellow-400 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
              </svg>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
            <img
              src={players[0].userAvatar}
              alt="Top player avatar"
              className="w-16 h-16 rounded-full"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-3">{players[0].userName}</h3>
        <div className="bg-black text-white text-sm px-4 py-1 rounded-full inline-block mt-2">
          {players[0].points}% completed
        </div>
      </div>

      {/* Other Players */}
      <div className="space-y-3">
        {players.slice(1).map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={player.userAvatar}
                alt={`${player.userName} avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{player.userName}</div>
                <div className="text-sm text-gray-500">
                  {player.points}% completed
                </div>
              </div>
            </div>
            <div
              className={`bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-medium`}
            >
              {index + 2}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
