"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateDelegateProfile } from "@/hooks/useDelegateProfile";
import type { User } from "@/types";
import { toast } from "sonner";

interface DelegateProfileEditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  user: User | null;
}

export function DelegateProfileEdit({
  open,
  onOpenChange,
  address,
  user,
}: DelegateProfileEditProps) {
  const updateProfile = useUpdateDelegateProfile();

  const [form, setForm] = useState({
    displayName: user?.displayName || "",
    bio: user?.bio || "",
    statement: user?.statement || "",
    avatarUrl: user?.avatarUrl || "",
    twitter: user?.twitter || "",
    discord: user?.discord || "",
    github: user?.github || "",
    website: user?.website || "",
  });

  useEffect(() => {
    setForm({
      displayName: user?.displayName || "",
      bio: user?.bio || "",
      statement: user?.statement || "",
      avatarUrl: user?.avatarUrl || "",
      twitter: user?.twitter || "",
      discord: user?.discord || "",
      github: user?.github || "",
      website: user?.website || "",
    });
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateProfile.mutateAsync({
        address,
        data: form,
      });
      toast.success("Profile updated successfully");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Delegate Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-content-secondary mb-1 block">
              Display Name
            </label>
            <Input
              placeholder="Your name or alias"
              value={form.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-content-secondary mb-1 block">
              Bio
            </label>
            <Textarea
              placeholder="A short bio about yourself"
              rows={2}
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-content-secondary mb-1 block">
              Delegate Statement (Markdown)
            </label>
            <Textarea
              placeholder="Your full delegate statement. Supports markdown."
              rows={6}
              value={form.statement}
              onChange={(e) => handleChange("statement", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-content-secondary mb-1 block">
              Avatar URL
            </label>
            <Input
              placeholder="https://example.com/avatar.png"
              value={form.avatarUrl}
              onChange={(e) => handleChange("avatarUrl", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-content-secondary mb-1 block">
                Twitter/X
              </label>
              <Input
                placeholder="@username"
                value={form.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-content-secondary mb-1 block">
                Discord
              </label>
              <Input
                placeholder="username#1234"
                value={form.discord}
                onChange={(e) => handleChange("discord", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-content-secondary mb-1 block">
                GitHub
              </label>
              <Input
                placeholder="username"
                value={form.github}
                onChange={(e) => handleChange("github", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-content-secondary mb-1 block">
                Website
              </label>
              <Input
                placeholder="https://example.com"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
