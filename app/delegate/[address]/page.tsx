"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useConnection } from "wagmi";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingBlock from "@/components/loading-block";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import useCurrentChain from "@/hooks/useCurrentChain";
import config from "@/config";
import { useDelegateProfile } from "@/hooks/useDelegateProfile";
import { DelegateProfileHeader } from "@/components/delegate/delegate-profile-header";
import { DelegateProfileStats } from "@/components/delegate/delegate-profile-stats";
import { DelegateProfileStatement } from "@/components/delegate/delegate-profile-statement";
import { DelegateVotingHistory } from "@/components/delegate/delegate-voting-history";
import { DelegateProfileEdit } from "@/components/delegate/delegate-profile-edit";
import { ArrowLeft } from "lucide-react";

export default function DelegateProfilePage() {
  const api = useGraphqlApi();
  const params = useParams();
  const delegateAddress = (params.address as string).toLowerCase();
  const { address: connectedAddress } = useConnection();
  const chain = useCurrentChain();
  const spaceId = config.governor[chain.id];

  const isOwnProfile =
    connectedAddress?.toLowerCase() === delegateAddress.toLowerCase();

  const [editOpen, setEditOpen] = useState(false);

  // Load delegate data from GraphQL
  const { data: delegate, isLoading: isLoadingDelegate } = useQuery({
    queryKey: ["delegate", spaceId, delegateAddress],
    queryFn: () => api.loadDelegate(spaceId, delegateAddress),
    enabled: !!spaceId,
  });

  // Load user stats
  const { data: user } = useQuery({
    queryKey: ["user", delegateAddress],
    queryFn: () => api.loadUser(delegateAddress),
  });

  // Load user votes
  const { data: userVotes = {} } = useQuery({
    queryKey: ["user-votes", delegateAddress],
    queryFn: () => api.loadUserVotes(delegateAddress, { limit: 50, skip: 0 }),
  });

  // Load user profile (REST); merge with delegate.user when available
  const { data: profileUser, isLoading: isLoadingProfile } =
    useDelegateProfile(delegateAddress);

  const mergedUser = profileUser ?? delegate?.user ?? user ?? null;

  if (isLoadingDelegate && isLoadingProfile) return <LoadingBlock />;

  return (
    <>
      <div className="border-b border-border-default">
        <div className="container mx-auto py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-content-primary hover:text-content-secondary transition-colors duration-200"
          >
            <ArrowLeft size={16} /> Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-8 sm:py-15 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <DelegateProfileHeader
              address={delegateAddress}
              user={mergedUser}
              delegate={delegate || null}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setEditOpen(true)}
            />

            <Tabs defaultValue="statement" className="w-full">
              <TabsList className="bg-transparent border-b border-surface-soft rounded-none w-full flex gap-1">
                <TabsTrigger
                  className="max-w-fit border-0 rounded-t-2xl rounded-b-none px-6 py-4 text-lg font-semibold -tracking-[0.18px] text-content-primary leading-[1] bg-surface-soft data-[state=active]:bg-[image:var(--gradient-primary)] data-[state=active]:text-white"
                  value="statement"
                >
                  Statement
                </TabsTrigger>
                <TabsTrigger
                  className="max-w-fit border-0 rounded-t-2xl rounded-b-none px-6 py-4 text-lg font-semibold -tracking-[0.18px] text-content-primary leading-[1] bg-surface-soft data-[state=active]:bg-[image:var(--gradient-primary)] data-[state=active]:text-white"
                  value="votes"
                >
                  Voting History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="statement" className="mt-6">
                <DelegateProfileStatement user={mergedUser} />
              </TabsContent>

              <TabsContent value="votes" className="mt-6">
                <DelegateVotingHistory
                  address={delegateAddress}
                  votes={userVotes}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <DelegateProfileStats
                delegate={delegate || null}
                user={delegate?.user ?? user ?? null}
                votes={userVotes}
              />
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <DelegateProfileEdit
            open={editOpen}
            onOpenChange={setEditOpen}
            address={delegateAddress}
            user={mergedUser}
          />
        )}
      </div>
    </>
  );
}
