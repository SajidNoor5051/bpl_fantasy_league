"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  Calendar,
  ChevronDown,
  Trophy,
  Clock,
  MapPin,
  ArrowLeft,
  X,
  Goal,
  Award,
  User,
  Activity,
} from "lucide-react";
import { FaFutbol, FaRunning } from "react-icons/fa"; // Import football and running icons
import NavLayout from "@/components/layout/NavLayout";

// Define the types for fixtures and gameweeks
interface Team {
  team_id: number;
  team_name: string;
  team_short_name: string;
  logo_url?: string;
}

interface PlayerInfo {
  player_id: number;
  first_name: string;
  last_name: string;
  position: string;
  team_id: number;
}

interface Goal {
  goal_id: number;
  minute: number;
  is_penalty: boolean;
  player_id: PlayerInfo;
  team_id: Team;
}

interface Assist {
  assist_id: number;
  minute: number;
  player_id: PlayerInfo;
  assisted_to: PlayerInfo;
  team_id: Team;
}

interface YellowCard {
  yellow_card_id: number;
  minute: number;
  player_id: PlayerInfo;
  team_id: Team;
}

interface RedCard {
  red_card_id: number;
  minute: number;
  is_straight_red: boolean;
  player_id: PlayerInfo;
  team_id: Team;
}

interface OwnGoal {
  own_goal_id: number;
  minute: number;
  player_id: PlayerInfo;
  team_id: Team;
}

interface PlayerStat {
  stat_id: number;
  player_id: number;
  fixture_id: number;
  minutes_played: number;
  goals_scored: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  fantasy_points: number;
  players: {
    player_id: number;
    first_name: string;
    last_name: string;
    position: string;
    team_id: number;
    teams: {
      team_id: number;
      team_name: string;
      team_short_name: string;
    };
  };
}

interface Fixture {
  fixture_id: number;
  match_date: string;
  home_team_score: number | null;
  away_team_score: number | null;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "POSTPONED" | "CANCELLED";
  stadium: string;
  is_final: boolean;
  gameweek_id: number;
  gameweeks: {
    name: string;
  };
  home_team_id: Team;
  away_team_id: Team;
}

interface Gameweek {
  gameweek_id: number;
  name: string;
  is_current: boolean;
}

export default function FixturesPage() {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([]);
  const [selectedGameweek, setSelectedGameweek] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [fixtureDetails, setFixtureDetails] = useState<{
    fixture: Fixture | null;
    goals: Goal[];
    assists: Assist[];
    yellowCards: YellowCard[];
    redCards: RedCard[];
    ownGoals: OwnGoal[];
  }>({
    fixture: null,
    goals: [],
    assists: [],
    yellowCards: [],
    redCards: [],
    ownGoals: [],
  });
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(user !== null);
  }, [user]);

  // Fetch fixtures and gameweeks data
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const queryParams = selectedGameweek
          ? `?gameweekId=${selectedGameweek}`
          : "";
        const response = await fetch(`/api/fixtures${queryParams}`);

        if (!response.ok) {
          throw new Error("Failed to fetch fixtures");
        }

        const data = await response.json();
        setFixtures(data.fixtures || []);
        setGameweeks(data.gameweeks || []);

        // Set the current gameweek as default if not already selected
        if (!selectedGameweek && data.currentGameweek) {
          setSelectedGameweek(data.currentGameweek.gameweek_id);
        } else if (
          !selectedGameweek &&
          data.gameweeks &&
          data.gameweeks.length > 0
        ) {
          // If no current gameweek, default to first gameweek
          setSelectedGameweek(data.gameweeks[0].gameweek_id);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching fixtures:", err);
        setError("Failed to load fixtures. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedGameweek]);

  // Function to open modal and fetch fixture details
  const openFixtureModal = async (fixture: Fixture) => {
    if (fixture.status !== "COMPLETED" && fixture.status !== "LIVE") {
      // Don't show modal for fixtures that haven't been played yet
      return;
    }

    setSelectedFixture(fixture);
    setIsModalOpen(true);
    setIsLoadingDetails(true);

    try {
      const response = await fetch(
        `/api/fixtures?fixtureId=${fixture.fixture_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch fixture details");
      }

      const data = await response.json();
      setFixtureDetails({
        fixture: data.fixture,
        goals: data.goals || [],
        assists: data.assists || [],
        yellowCards: data.yellowCards || [],
        redCards: data.redCards || [],
        ownGoals: data.ownGoals || [],
      });
    } catch (err) {
      console.error("Error fetching fixture details:", err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFixture(null);
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Group fixtures by date for better organization
  const groupFixturesByDate = (fixtures: Fixture[]) => {
    const groupedFixtures: { [key: string]: Fixture[] } = {};

    fixtures.forEach((fixture) => {
      // Extract just the date part for grouping
      const dateKey = new Date(fixture.match_date).toLocaleDateString("en-US");

      if (!groupedFixtures[dateKey]) {
        groupedFixtures[dateKey] = [];
      }

      groupedFixtures[dateKey].push(fixture);
    });

    return groupedFixtures;
  };

  // Get fixture status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "LIVE":
        return (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            LIVE
          </span>
        );
      case "COMPLETED":
        return (
          <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            FT
          </span>
        );
      case "SCHEDULED":
        return (
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            UPCOMING
          </span>
        );
      case "POSTPONED":
        return (
          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            POSTPONED
          </span>
        );
      case "CANCELLED":
        return (
          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            CANCELLED
          </span>
        );
      default:
        return null;
    }
  };

  // Find the name of the selected gameweek
  const selectedGameweekName =
    gameweeks.find((gw) => gw.gameweek_id === selectedGameweek)?.name ||
    "All Gameweeks";
  const groupedFixtures = groupFixturesByDate(fixtures);
  const dateKeys = Object.keys(groupedFixtures).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const content = (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Calendar className="mr-3 h-8 w-8 text-primary-500" />
            Fixtures
          </h1>
          <p className="text-gray-400">
            View all scheduled matches and results for the BUET Premier League
          </p>
        </div>

        {isAuthenticated === false && (
          <Link
            href="/"
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        )}
      </div>

      {/* Gameweek Selector Dropdown */}
      <div className="mb-8 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2 border border-gray-700"
        >
          <span>{selectedGameweekName}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isDropdownOpen && (
          <div className="absolute mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700 py-1 max-h-64 overflow-y-auto">
            {gameweeks.map((gameweek) => (
              <button
                key={gameweek.gameweek_id}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                  selectedGameweek === gameweek.gameweek_id
                    ? "bg-gray-700 text-white"
                    : "text-gray-300"
                } ${gameweek.is_current ? "font-medium text-primary-400" : ""}`}
                onClick={() => {
                  setSelectedGameweek(gameweek.gameweek_id);
                  setIsDropdownOpen(false);
                }}
              >
                {gameweek.name} {gameweek.is_current && "(Current)"}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg p-4 mb-8">
          {error}
        </div>
      ) : fixtures.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 text-center">
          <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Fixtures Found
          </h3>
          <p className="text-gray-400">
            There are no fixtures scheduled for this gameweek yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {dateKeys.map((dateKey) => (
            <div
              key={dateKey}
              className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
            >
              <div className="bg-gray-700 py-3 px-4 border-b border-gray-600">
                <h3 className="text-lg font-semibold text-white">
                  {new Date(dateKey).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
              </div>

              <div className="divide-y divide-gray-700">
                {groupedFixtures[dateKey].map((fixture) => (
                  <div
                    key={fixture.fixture_id}
                    className={`p-4 ${
                      fixture.status === "COMPLETED" ||
                      fixture.status === "LIVE"
                        ? "cursor-pointer hover:bg-gray-700 transition-colors"
                        : ""
                    }`}
                    onClick={() => openFixtureModal(fixture)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                      <div className="mb-2 sm:mb-0 text-xs text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(fixture.match_date)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(fixture.status)}
                        {fixture.is_final && (
                          <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            FINAL
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-7 items-center my-4">
                      {/* Home Team */}
                      <div className="col-span-3 text-right">
                        <div className="flex items-center justify-end">
                          <div className="text-right mr-3">
                            <div className="font-medium text-white">
                              {fixture.home_team_id? fixture.home_team_id.team_name : 'TBD'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Score - Ensure it stays on one line on mobile */}
                      <div className="col-span-1 flex justify-center whitespace-nowrap">
                        {fixture.status === "COMPLETED" ||
                        fixture.status === "LIVE" ? (
                          <div className="px-3 py-1 bg-gray-700 rounded-md text-white font-bold">
                            {fixture.home_team_score}-{fixture.away_team_score}
                          </div>
                        ) : (
                          <div className="px-3 py-1 text-gray-400 font-medium">
                            vs
                          </div>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="col-span-3 text-left">
                        <div className="flex items-center">
                          <div className="text-left ml-3">
                            <div className="font-medium text-white">
                            {fixture.away_team_id? fixture.away_team_id.team_name : 'TBD'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-400 mt-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{fixture.stadium || "BUET Stadium"}</span>
                    </div>

                    {(fixture.status === "COMPLETED" ||
                      fixture.status === "LIVE") && (
                      <div className="mt-2 text-xs text-center text-primary-400">
                        Click to view match details
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal to display fixture details */}
      {isModalOpen && selectedFixture && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                Match Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {isLoadingDetails ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <>
                  {/* Match header */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-400 mb-2">
                      {fixtureDetails.fixture?.gameweeks.name} •{" "}
                      {formatDate(selectedFixture.match_date)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-white">
                        {selectedFixture.home_team_id?.team_name}
                      </div>
                      <div className="px-4 py-2 bg-gray-700 rounded-md text-xl font-bold text-white">
                        {selectedFixture.home_team_score} -{" "}
                        {selectedFixture.away_team_score}
                      </div>
                      <div className="text-lg font-semibold text-white">
                        {selectedFixture.away_team_id?.team_name}
                      </div>
                    </div>
                    <div className="flex justify-center mt-2">
                      {getStatusBadge(selectedFixture.status)}
                      {selectedFixture.is_final && (
                        <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">
                          FINAL
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Match Timeline - Updated with better mobile responsive design */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-primary-400" />
                      Match Timeline
                    </h4>

                    {fixtureDetails.goals.length > 0 ||
                    fixtureDetails.yellowCards.length > 0 ||
                    fixtureDetails.redCards.length > 0 ||
                    fixtureDetails.ownGoals.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Home Team Events */}
                        <div className="w-full">
                          <h5 className="text-sm font-medium text-primary-400 mb-3 pb-1 border-b border-gray-700">
                            {selectedFixture.home_team_id.team_name}
                          </h5>
                          <ul className="space-y-2">
                            {/* Combine all events and sort by minute */}
                            {[
                              // Add goals
                              ...fixtureDetails.goals
                                .filter(
                                  (goal) =>
                                    goal.team_id.team_id ===
                                    selectedFixture.home_team_id.team_id
                                )
                                .map((goal) => ({
                                  type: "goal",
                                  minute: goal.minute,
                                  data: goal,
                                })),
                              // Add yellow cards
                              ...fixtureDetails.yellowCards
                                .filter(
                                  (card) =>
                                    card.team_id.team_id ===
                                    selectedFixture.home_team_id.team_id
                                )
                                .map((card) => ({
                                  type: "yellow",
                                  minute: card.minute,
                                  data: card,
                                })),
                              // Add red cards
                              ...fixtureDetails.redCards
                                .filter(
                                  (card) =>
                                    card.team_id.team_id ===
                                    selectedFixture.home_team_id.team_id
                                )
                                .map((card) => ({
                                  type: "red",
                                  minute: card.minute,
                                  data: card,
                                })),
                              // Add own goals
                              ...fixtureDetails.ownGoals
                                .filter(
                                  (og) =>
                                    og.team_id.team_id ===
                                    selectedFixture.home_team_id.team_id
                                )
                                .map((og) => ({
                                  type: "own_goal",
                                  minute: og.minute,
                                  data: og,
                                })),
                            ]
                              .sort((a, b) => a.minute - b.minute)
                              .map((event, index) => {
                                // Find assist for goals
                                const assist =
                                  event.type === "goal"
                                    ? fixtureDetails.assists.find(
                                        (a) =>
                                          a.assisted_to.player_id ===
                                            event.data.player_id.player_id &&
                                          Math.abs(
                                            a.minute - event.data.minute
                                          ) <= 1
                                      )
                                    : null;

                                return (
                                  <li
                                    key={`${event.type}-${index}`}
                                    className="p-2 bg-gray-700/40 rounded-md"
                                  >
                                    <div className="flex items-center text-sm">
                                      <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-md mr-2 min-w-[34px] text-center">
                                        {event.minute}'
                                      </span>

                                      {/* Different icons based on event type */}
                                      {event.type === "goal" && (
                                        <FaFutbol className="w-4 h-4 text-green-400 mr-2" />
                                      )}
                                      {event.type === "yellow" && (
                                        <div className="w-4 h-5 bg-yellow-400 rounded-sm mr-2"></div>
                                      )}
                                      {event.type === "red" && (
                                        <div className="w-4 h-5 bg-red-500 rounded-sm mr-2"></div>
                                      )}
                                      {event.type === "own_goal" && (
                                        <FaFutbol className="w-4 h-4 text-red-400 mr-2" />
                                      )}

                                      <div>
                                        {/* Player name and event specific details */}
                                        <span className="font-medium text-white">
                                          {event.data.player_id.first_name}{" "}
                                          {event.data.player_id.last_name}
                                        </span>

                                        {event.type === "goal" &&
                                          (event.data as Goal).is_penalty && (
                                            <span className="text-yellow-400 ml-1">
                                              (P)
                                            </span>
                                          )}
                                        {event.type === "own_goal" && (
                                          <span className="text-red-400 ml-1">
                                            (OG)
                                          </span>
                                        )}
                                        {event.type === "red" &&
                                          !(event.data as RedCard)
                                            .is_straight_red && (
                                            <span className="text-xs text-gray-400 ml-1">
                                              (Second Yellow)
                                            </span>
                                          )}

                                        {/* Show assist if available */}
                                        {assist && (
                                          <div className="text-xs text-gray-400 mt-0.5 flex items-center">
                                            <FaRunning className="w-3 h-3 mr-1 text-blue-400" />
                                            {assist.player_id.first_name}{" "}
                                            {assist.player_id.last_name}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}

                            {/* Only show "  " if no events */}
                            {fixtureDetails.goals.filter(
                              (g) =>
                                g.team_id.team_id ===
                                selectedFixture.home_team_id.team_id
                            ).length === 0 &&
                              fixtureDetails.yellowCards.filter(
                                (c) =>
                                  c.team_id.team_id ===
                                  selectedFixture.home_team_id.team_id
                              ).length === 0 &&
                              fixtureDetails.redCards.filter(
                                (c) =>
                                  c.team_id.team_id ===
                                  selectedFixture.home_team_id.team_id
                              ).length === 0 &&
                              fixtureDetails.ownGoals.filter(
                                (og) =>
                                  og.team_id.team_id ===
                                  selectedFixture.home_team_id.team_id
                              ).length === 0 && (
                                <li className="text-sm text-gray-400 italic p-2">
                                  {" "}
                                </li>
                              )}
                          </ul>
                        </div>

                        {/* Away Team Events */}
                        <div className="w-full">
                          <h5 className="text-sm font-medium text-primary-400 mb-3 pb-1 border-b border-gray-700">
                            {selectedFixture.away_team_id.team_name}
                          </h5>
                          <ul className="space-y-2">
                            {/* Combine all events and sort by minute */}
                            {[
                              // Add goals
                              ...fixtureDetails.goals
                                .filter(
                                  (goal) =>
                                    goal.team_id.team_id ===
                                    selectedFixture.away_team_id.team_id
                                )
                                .map((goal) => ({
                                  type: "goal",
                                  minute: goal.minute,
                                  data: goal,
                                })),
                              // Add yellow cards
                              ...fixtureDetails.yellowCards
                                .filter(
                                  (card) =>
                                    card.team_id.team_id ===
                                    selectedFixture.away_team_id.team_id
                                )
                                .map((card) => ({
                                  type: "yellow",
                                  minute: card.minute,
                                  data: card,
                                })),
                              // Add red cards
                              ...fixtureDetails.redCards
                                .filter(
                                  (card) =>
                                    card.team_id.team_id ===
                                    selectedFixture.away_team_id.team_id
                                )
                                .map((card) => ({
                                  type: "red",
                                  minute: card.minute,
                                  data: card,
                                })),
                              // Add own goals
                              ...fixtureDetails.ownGoals
                                .filter(
                                  (og) =>
                                    og.team_id.team_id ===
                                    selectedFixture.away_team_id.team_id
                                )
                                .map((og) => ({
                                  type: "own_goal",
                                  minute: og.minute,
                                  data: og,
                                })),
                            ]
                              .sort((a, b) => a.minute - b.minute)
                              .map((event, index) => {
                                // Find assist for goals
                                const assist =
                                  event.type === "goal"
                                    ? fixtureDetails.assists.find(
                                        (a) =>
                                          a.assisted_to.player_id ===
                                            event.data.player_id.player_id &&
                                          Math.abs(
                                            a.minute - event.data.minute
                                          ) <= 1
                                      )
                                    : null;

                                return (
                                  <li
                                    key={`${event.type}-${index}`}
                                    className="p-2 bg-gray-700/40 rounded-md"
                                  >
                                    <div className="flex items-center text-sm">
                                      <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-md mr-2 min-w-[34px] text-center">
                                        {event.minute}'
                                      </span>

                                      {/* Different icons based on event type */}
                                      {event.type === "goal" && (
                                        <FaFutbol className="w-4 h-4 text-green-400 mr-2" />
                                      )}
                                      {event.type === "yellow" && (
                                        <div className="w-4 h-5 bg-yellow-400 rounded-sm mr-2"></div>
                                      )}
                                      {event.type === "red" && (
                                        <div className="w-4 h-5 bg-red-500 rounded-sm mr-2"></div>
                                      )}
                                      {event.type === "own_goal" && (
                                        <FaFutbol className="w-4 h-4 text-red-400 mr-2" />
                                      )}

                                      <div>
                                        {/* Player name and event specific details */}
                                        <span className="font-medium text-white">
                                          {event.data.player_id.first_name}{" "}
                                          {event.data.player_id.last_name}
                                        </span>

                                        {event.type === "goal" &&
                                          (event.data as Goal).is_penalty && (
                                            <span className="text-yellow-400 ml-1">
                                              (P)
                                            </span>
                                          )}
                                        {event.type === "own_goal" && (
                                          <span className="text-red-400 ml-1">
                                            (OG)
                                          </span>
                                        )}
                                        {event.type === "red" &&
                                          !(event.data as RedCard)
                                            .is_straight_red && (
                                            <span className="text-xs text-gray-400 ml-1">
                                              (Second Yellow)
                                            </span>
                                          )}

                                        {/* Show assist if available */}
                                        {assist && (
                                          <div className="text-xs text-gray-400 mt-0.5 flex items-center">
                                            <FaRunning className="w-3 h-3 mr-1 text-blue-400" />
                                            {assist.player_id.first_name}{" "}
                                            {assist.player_id.last_name}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}

                            {/* Only show "   " if no events*/}
                            {fixtureDetails.goals.filter(
                              (g) =>
                                g.team_id.team_id ===
                                selectedFixture.away_team_id.team_id
                            ).length === 0 &&
                              fixtureDetails.yellowCards.filter(
                                (c) =>
                                  c.team_id.team_id ===
                                  selectedFixture.away_team_id.team_id
                              ).length === 0 &&
                              fixtureDetails.redCards.filter(
                                (c) =>
                                  c.team_id.team_id ===
                                  selectedFixture.away_team_id.team_id
                              ).length === 0 &&
                              fixtureDetails.ownGoals.filter(
                                (og) =>
                                  og.team_id.team_id ===
                                  selectedFixture.away_team_id.team_id
                              ).length === 0 && (
                                <li className="text-sm text-gray-400 italic p-2">
                                  {" "}
                                </li>
                              )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-4">
                        No match events recorded
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If authentication status is still loading or null, render a simple loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is authenticated, render within NavLayout, otherwise render standalone
  return isAuthenticated ? (
    <NavLayout>{content}</NavLayout>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Simple header for non-authenticated users */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">BUET Fantasy</h1>
                <p className="text-xs text-gray-400">2025 Season</p>
              </div>
            </Link>

            <div className="flex space-x-4">
              <Link
                href="/auth/signin"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto">{content}</main>

      {/* Simple footer */}
      <footer className="bg-gray-950 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2025 BUET Fantasy Premier League. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
