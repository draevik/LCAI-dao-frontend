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
import { ProposalCancelButton } from "@/components/proposal/proposal-cancel-button";
import { ProposalVoteResults } from "@/components/proposal/proposal-vote-results";
import { ProposalTimeline } from "@/components/proposal/proposal-timeline";
import { ProposalSimulationReport } from "@/components/proposal/proposal-simulation-report";
import { ProposalActions } from "@/components/proposal/proposal-actions";
import { ProposalDelegationReminder } from "@/components/proposal/proposal-delegation-reminder";
import { useQuery } from "@tanstack/react-query";

export default function ProposalDetail() {
  const api = useGraphqlApi();
  const params = useParams();
  const id = params.id as string;
  const space = params.space as string;

  const { data: proposal, isLoading } = useQuery({
    queryKey: ["proposal", `${space}/${id}`],
    queryFn: () =>
      api.loadProposal(`${space}/${id}`, Math.floor(Date.now() / 1000)),
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
    <>
      <ProposalHeader />
      <div className="container mx-auto py-8 sm:py-15 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_355px] gap-8">
          {/* Main Content */}
          <div className="space-y-8 min-w-0">
            <ProposalTitleSection proposal={proposal} />
            <Tabs defaultValue="description" className="w-full justify-start">
              <TabsList className="bg-transparent border-b border-surface-soft rounded-none w-full flex gap-1">
                <TabsTrigger
                  className="max-w-fit border-0 rounded-t-2xl rounded-b-none px-6 py-4 text-lg font-semibold tracking-[-0.18px] text-content-primary leading-none bg-surface-soft data-[state=active]:bg-(image:--gradient-primary) data-[state=active]:text-white"
                  value="description"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  className="max-w-fit border-0 rounded-t-2xl rounded-b-none px-6 py-4 text-lg font-semibold tracking-[-0.18px] text-content-primary leading-none bg-surface-soft data-[state=active]:bg-(image:--gradient-primary) data-[state=active]:text-white"
                  value="votes"
                >
                  Votes
                </TabsTrigger>
                <TabsTrigger
                  className="max-w-fit border-0 rounded-t-2xl rounded-b-none px-6 py-4 text-lg font-semibold tracking-[-0.18px] text-content-primary leading-none bg-surface-soft data-[state=active]:bg-(image:--gradient-primary) data-[state=active]:text-white"
                  value="actions"
                >
                  Actions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6 mt-6">
                <ProposalOverviewTab content={proposal.metadata?.body} />
              </TabsContent>

              <TabsContent value="votes" className="mt-6">
                <ProposalVotesTab proposal={proposal} />
              </TabsContent>

              <TabsContent value="actions" className="mt-6">
                <ProposalActions proposal={proposal} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="grid gap-3">
              <ProposalActionButton
                proposal={proposal}
                onVoteAction={() => setIsVoteDialogOpen(true)}
              />
              <ProposalCancelButton proposal={proposal} />
            </div>

            <ProposalDelegationReminder proposal={proposal} />

            <ProposalVoteDialog
              open={isVoteDialogOpen}
              onOpenChange={setIsVoteDialogOpen}
              proposal={proposal}
            />

            <ProposalVoteResults proposal={proposal} />

            {proposal.indexer === "mainnet" && (
              <ProposalSimulationReport proposal={proposal} />
            )}
            <ProposalTimeline proposal={proposal} />
          </div>
        </div>
      </div>
    </>
  );
}
