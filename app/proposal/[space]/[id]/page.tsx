"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingBlock from "@/components/loading-block";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import { ProposalHeader } from "@/components/proposal/proposal-header";
import { ProposalTitleSection } from "@/components/proposal/proposal-title-section";
import { ProposalOverviewTab } from "@/components/proposal/proposal-overview-tab";
import { ProposalVotesTab } from "@/components/proposal/proposal-votes-tab";
import { ProposalVoteDialog } from "@/components/proposal/proposal-vote-dialog";
import { ProposalActionButton } from "@/components/proposal/proposal-action-button";
import { ProposalVoteResults } from "@/components/proposal/proposal-vote-results";
import { ProposalTimeline } from "@/components/proposal/proposal-timeline";
import { useQuery } from "@tanstack/react-query";

export default function ProposalDetail() {
  const api = useGraphqlApi();
  const params = useParams();
  const id = params.id as string;
  const space = params.space as string;

  const { data: proposal, isLoading } = useQuery({
    queryKey: ["proposal", `${space}/${id}`],
    queryFn: () => api.loadProposal(`${space}/${id}`, Date.now()),
    enabled: true,
  });

  const { data: votes } = useQuery({
    queryKey: ["votes", `${space}/${id}`],
    queryFn: () =>
      api.loadProposalVotes(
        proposal!,
        { limit: 10, skip: 0 },
        "any",
        "vp-desc"
      ),
    enabled: Boolean(proposal),
  });

  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);

  if (isLoading) return <LoadingBlock />;

  if (!proposal) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proposal Not Found</h1>
          <Link href="/">
            <Button>Back to Proposals</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <ProposalHeader />

      <ProposalTitleSection proposal={proposal} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="votes">VOTES</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <ProposalOverviewTab content={proposal.metadata?.body} />
            </TabsContent>

            <TabsContent value="votes" className="mt-6">
              <ProposalVotesTab
                votes={votes}
                choices={proposal.metadata?.choices}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="grid">
            <ProposalActionButton
              proposal={proposal}
              onVoteAction={() => setIsVoteDialogOpen(true)}
            />
          </div>

          <ProposalVoteDialog
            open={isVoteDialogOpen}
            onOpenChange={setIsVoteDialogOpen}
            proposal={proposal}
          />

          <ProposalVoteResults proposal={proposal} />

          <ProposalTimeline proposal={proposal} />
        </div>
      </div>
    </div>
  );
}
