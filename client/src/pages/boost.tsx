import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, ArrowLeft, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface UserCommunity {
  id: string;
  name: string;
  platform: string;
  category: string;
  description: string;
  inviteLink: string;
  tags: string[];
  visibility: string;
  memberCount: number;
  imageUrl?: string | null;
  adminTagId?: string;
  bumpedAt?: string | null;
}

interface BumpStatus {
  lastBumpAt: string | null;
  lastBumpCommunityId: string | null;
  canBump: boolean;
  nextAvailableAt: string | null;
  hoursRemaining: number | null;
}

export default function Boost() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: userCommunities, isLoading: communitiesLoading } = useQuery({
    queryKey: ["user-communities", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/user/communities/${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch communities");
      const data = await response.json();
      return { 
        active: data.active as UserCommunity[], 
        bumpStatus: data.bumpStatus as BumpStatus
      };
    },
    enabled: !!user?.id,
  });

  const bumpMutation = useMutation({
    mutationFn: async (communityId: string) => {
      const response = await fetch(`/api/user/communities/${communityId}/bump`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to boost community");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-communities", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["approved-communities"] });
      toast.success("Community boosted to the top!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleBoost = (communityId: string) => {
    bumpMutation.mutate(communityId);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please log in to boost your communities");
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const activeCommunities = userCommunities?.active || [];
  const bumpStatus = userCommunities?.bumpStatus;
  const currentlyBoostedId = bumpStatus?.lastBumpCommunityId;

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-64px)] bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/dashboard")}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-4"
                style={{
                  boxShadow: "0 0 40px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.1)"
                }}
              >
                <Rocket className="w-10 h-10 text-cyan-400" />
              </motion.div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Boost Center
                </span>
              </h1>
              <p className="text-gray-400 max-w-md mx-auto">
                Boost your community to the top of the homepage for 24 hours
              </p>
            </div>

            {bumpStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-xl p-4 mb-8 border ${
                  bumpStatus.canBump
                    ? "bg-gradient-to-r from-cyan-500/10 to-blue-600/5 border-cyan-500/30"
                    : "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700"
                }`}
                style={bumpStatus.canBump ? {
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.1)"
                } : {}}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    bumpStatus.canBump
                      ? "bg-cyan-500/20"
                      : "bg-gray-700/50"
                  }`}>
                    {bumpStatus.canBump ? (
                      <Zap className="w-6 h-6 text-cyan-400" />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    {bumpStatus.canBump ? (
                      <>
                        <p className="text-cyan-400 font-semibold">Boost Available</p>
                        <p className="text-gray-400 text-sm">Select a community below to boost it to the top</p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-300 font-semibold">Boost on Cooldown</p>
                        <p className="text-gray-500 text-sm">
                          Next boost available in <span className="text-cyan-400 font-mono">{bumpStatus.hoursRemaining}h</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {communitiesLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : activeCommunities.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[#111118] rounded-xl border border-gray-800 p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Communities to Boost</h3>
                <p className="text-gray-500 mb-6">Get your communities approved first to boost them</p>
                <Button
                  onClick={() => setLocation("/list-community")}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg"
                >
                  List a Community
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCommunities.map((community, index) => {
                  const isBoosted = community.id === currentlyBoostedId && !bumpStatus?.canBump;
                  
                  return (
                    <motion.div
                      key={community.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className={`relative group rounded-xl p-4 border transition-all duration-300 ${
                        isBoosted
                          ? "bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border-cyan-500/40"
                          : "bg-[#111118] border-gray-800 hover:border-cyan-500/30"
                      }`}
                      style={isBoosted ? {
                        boxShadow: "0 0 25px rgba(34, 211, 238, 0.15)"
                      } : {}}
                    >
                      {isBoosted && (
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-cyan-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          BOOSTED
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-700">
                          {community.imageUrl ? (
                            <img 
                              src={community.imageUrl} 
                              alt={community.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                              <span className="text-lg font-bold text-cyan-400">
                                {getInitials(community.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate text-sm">
                            {community.name}
                          </h3>
                          <p className="text-xs text-cyan-400/80 font-mono">
                            #{community.adminTagId || "---"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBoost(community.id)}
                        disabled={!bumpStatus?.canBump || bumpMutation.isPending || isBoosted}
                        className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                          isBoosted
                            ? "bg-cyan-500/20 text-cyan-400 cursor-default border border-cyan-500/30"
                            : bumpStatus?.canBump
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 cursor-pointer"
                              : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                        }`}
                        style={bumpStatus?.canBump && !isBoosted ? {
                          boxShadow: "0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.1)"
                        } : {}}
                      >
                        <Zap className={`w-4 h-4 ${bumpStatus?.canBump && !isBoosted ? "animate-pulse" : ""}`} />
                        {bumpMutation.isPending ? (
                          "Boosting..."
                        ) : isBoosted ? (
                          "Currently Boosted"
                        ) : bumpStatus?.canBump ? (
                          "Boost Now"
                        ) : (
                          "On Cooldown"
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 p-4 rounded-xl bg-[#111118] border border-gray-800"
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                How Boost Works
              </h3>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Boosted communities appear after pinned ones on the homepage</li>
                <li>• You can boost one community at a time</li>
                <li>• 24-hour cooldown between boosts</li>
                <li>• Boosting a new community replaces the previous boost</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
