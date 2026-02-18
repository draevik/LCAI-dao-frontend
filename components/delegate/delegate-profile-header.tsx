"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/CopyButton";
import { truncateAddress, compactNumber } from "@/lib/utils";
import type { Delegate, User } from "@/types";
import { Pencil, Globe, Twitter } from "lucide-react";

interface DelegateProfileHeaderProps {
  address: string;
  user: User | null;
  delegate: Delegate | null;
  isOwnProfile: boolean;
  onEditClick: () => void;
}

export function DelegateProfileHeader({
  address,
  user,
  delegate,
  isOwnProfile,
  onEditClick,
}: DelegateProfileHeaderProps) {
  const avatarUrl =
    user?.avatarUrl || `https://effigy.im/a/${address}.png`;
  const displayName = user?.displayName || truncateAddress(address);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="text-lg">
            {address.slice(2, 4).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-content-primary truncate">
              {displayName}
            </h1>
            {isOwnProfile && (
              <Button variant="outline" size="sm" onClick={onEditClick}>
                <Pencil className="w-3 h-3 mr-1" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-content-secondary">
              {truncateAddress(address)}
            </span>
            <CopyButton
              text={address}
              className="size-6 shrink-0 text-content-muted hover:text-content-primary [&_svg:not([class*='size-'])]:size-3"
            />
          </div>

          {user?.bio && (
            <p className="text-sm text-content-secondary mt-2 line-clamp-3">
              {user.bio}
            </p>
          )}

          {/* Social links */}
          <div className="flex items-center gap-3 mt-3">
            {user?.twitter && (
              <a
                href={`https://x.com/${profile.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-secondary hover:text-content-primary"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {user?.github && (
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-secondary hover:text-content-primary"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {user?.discord && (
              <span className="text-xs text-content-secondary">
                Discord: {user.discord}
              </span>
            )}
            {user?.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-secondary hover:text-content-primary"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Badges */}
          {delegate && (
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline">
                {compactNumber(delegate.votingPowerParsed)} voting power
              </Badge>
              <Badge variant="outline">
                {delegate.delegatorCount} delegators
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
