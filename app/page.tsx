"use client";

import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useConnection } from "wagmi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/home/stats-card";
import { RecentProposals } from "@/components/home/recent-proposals";
import { RisingDelegates } from "@/components/home/rising-delegates";
import { DaoSidebar } from "@/components/home/dao-sidebar";
import { ProposalsList } from "@/components/home/proposals-list";
import { ParticipantsList } from "@/components/home/participants-list";
import { DelegateModal } from "@/components/delegation/delegate-modal";
import BallotsLockerModal from "@/components/ballots-locker";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import config from "@/config";
import useCurrentChain from "@/hooks/useCurrentChain";
import { FileText, Users, Home } from "lucide-react";

export default function HomePage() {
  const api = useGraphqlApi();
  const { address } = useConnection();
  const chain = useCurrentChain();
  const [activeTab, setActiveTab] = useState("home");
  const [delegateModalOpen, setDelegateModalOpen] = useState(false);
  const [ballotsLockerOpen, setBallotsLockerOpen] = useState(false);

  // Get governor address as space ID
  const spaceId = config.governor[chain.id];

  // Fetch proposals
  const {
    isLoading: isLoadingProposals,
    data: proposals = [],
    refetch: refetchProposals,
  } = useQuery({
    queryKey: ["proposals"],
    queryFn: () =>
      api.loadProposals(
        [],
        { limit: 20, skip: 0 },
        Math.floor(Date.now() / 1000)
      ),
  });

  // Fetch delegates
  const {
    isLoading: isLoadingDelegates,
    data: delegates = [],
    refetch: refetchDelegates,
  } = useQuery({
    queryKey: ["delegates", spaceId],
    queryFn: () => api.loadDelegates(spaceId, { limit: 50, skip: 0 }),
    enabled: !!spaceId,
  });

  // Fetch space stats
  const { isLoading: isLoadingStats, data: spaceStats } = useQuery({
    queryKey: ["spaceStats", spaceId],
    queryFn: () => api.loadSpaceStats(spaceId),
    enabled: !!spaceId,
  });

  // Fetch user delegation
  const { data: userDelegation } = useQuery({
    queryKey: ["userDelegation", spaceId, address],
    queryFn: () => api.loadUserDelegation(spaceId, address!),
    enabled: !!spaceId && !!address,
  });

  const handleDelegateSuccess = useCallback(() => {
    refetchDelegates();
    refetchProposals();
  }, [refetchDelegates, refetchProposals]);

  const handleViewAllProposals = () => setActiveTab("proposals");
  const handleViewAllParticipants = () => setActiveTab("participants");

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 border-b border-border-default pb-2 w-full">
          <TabsTrigger value="home" className="gap-2">
            <Home className="h-4 w-4" />
            Home
          </TabsTrigger>
          <TabsTrigger value="proposals" className="gap-2">
            <FileText className="h-4 w-4" />
            Proposals
          </TabsTrigger>
          <TabsTrigger value="participants" className="gap-2">
            <Users className="h-4 w-4" />
            Participants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <StatsCard
                  title="Delegates"
                  value={spaceStats?.delegateCount || 0}
                  icon={<Users className="h-6 w-6 text-primary" />}
                />
                <StatsCard
                  title="Proposals"
                  value={spaceStats?.proposalCount || 0}
                  icon={<FileText className="h-6 w-6 text-primary" />}
                />
              </div>

              {/* Recent proposals */}
              <RecentProposals
                proposals={proposals}
                isLoading={isLoadingProposals}
                onViewAll={handleViewAllProposals}
              />

              {/* Rising delegates */}
              <RisingDelegates
                delegates={delegates}
                isLoading={isLoadingDelegates}
                onViewAll={handleViewAllParticipants}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <DaoSidebar
                  spaceStats={spaceStats || null}
                  userDelegation={userDelegation || null}
                  onDelegateClick={() => setDelegateModalOpen(true)}
                  onBallotsLockerClick={() => setBallotsLockerOpen(true)}
                  isLoading={isLoadingStats}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <ProposalsList proposals={proposals} isLoading={isLoadingProposals} />
        </TabsContent>

        <TabsContent value="participants">
          <ParticipantsList
            delegates={delegates}
            isLoading={isLoadingDelegates}
          />
        </TabsContent>
      </Tabs>

      <DelegateModal
        open={delegateModalOpen}
        onOpenChange={setDelegateModalOpen}
        onSuccess={handleDelegateSuccess}
      />

      <BallotsLockerModal
        open={ballotsLockerOpen}
        onOpenChange={setBallotsLockerOpen}
        onSuccess={handleDelegateSuccess}
      />
    </div>
  );
}
