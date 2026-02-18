import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

function mapProfileResponseToUser(res: {
  address: string;
  displayName?: string | null;
  bio?: string | null;
  statement?: string | null;
  avatarUrl?: string | null;
  twitter?: string | null;
  discord?: string | null;
  github?: string | null;
  website?: string | null;
  created: number;
  updated: number;
}): User {
  return {
    id: res.address,
    created: res.created,
    updated: res.updated,
    displayName: res.displayName ?? null,
    bio: res.bio ?? null,
    statement: res.statement ?? null,
    avatarUrl: res.avatarUrl ?? null,
    twitter: res.twitter ?? null,
    discord: res.discord ?? null,
    github: res.github ?? null,
    website: res.website ?? null,
  };
}

export function useProfile(address?: string) {
  return useQuery<User | null>({
    queryKey: ["profile", address],
    queryFn: async () => {
      if (!address) return null;
      const res = await fetch(`${API_ENDPOINT}/api/profile/${address}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      return mapProfileResponseToUser(data);
    },
    enabled: !!address,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      address,
      data,
    }: {
      address: string;
      data: Partial<Omit<User, "id" | "created" | "updated">>;
    }) => {
      const token = sessionStorage.getItem("siwe-token");
      if (!token) throw new Error("Not authenticated. Please sign in first.");

      const res = await fetch(`${API_ENDPOINT}/api/profile/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Update failed" }));
        throw new Error(error.error || "Failed to update profile");
      }

      const responseData = await res.json();
      return mapProfileResponseToUser(responseData);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.address],
      });
    },
  });
}
