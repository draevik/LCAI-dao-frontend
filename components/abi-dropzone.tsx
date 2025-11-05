"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Button as ButtonCommon } from "@/components/common/Button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { AbiObjectType, WriteContractItemTypeAbi } from "@/types";

interface AbiDropzoneProps {
  onAbiParsed: (methods: WriteContractItemTypeAbi[]) => void;
  onFileChange?: (file: File | null) => void;
}

export function AbiDropzone({ onAbiParsed, onFileChange }: AbiDropzoneProps) {
  const [uploadedAbi, setUploadedAbi] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const validateAndParseAbi = useCallback(
    async (file: File) => {
      try {
        setParseError(null);
        const text = await file.text();
        const parsedAbi = JSON.parse(text) as AbiObjectType[];

        // Validate ABI structure
        if (!Array.isArray(parsedAbi)) {
          throw new Error("ABI must be an array");
        }

        // Check if it contains valid ABI items
        const hasValidItems = parsedAbi.some(
          (item) =>
            item &&
            typeof item === "object" &&
            "type" in item &&
            ["function", "constructor", "event", "error"].includes(item.type)
        );

        if (!hasValidItems) {
          throw new Error(
            "Invalid ABI format - no valid function definitions found"
          );
        }

        // Filter writable methods
        const contractWriteMethods = parsedAbi.filter(
          (item) =>
            item.type === "function" &&
            (item.stateMutability === "payable" ||
              item.stateMutability === "nonpayable")
        ) as WriteContractItemTypeAbi[];

        if (contractWriteMethods.length === 0) {
          throw new Error("No writable methods found in ABI");
        }

        onAbiParsed(contractWriteMethods);
        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Invalid ABI file";
        setParseError(errorMessage);
        onAbiParsed([]);
        return false;
      }
    },
    [onAbiParsed]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const abiFile = files.find(
        (file) =>
          file.name.endsWith(".json") || file.type === "application/json"
      );

      if (abiFile) {
        setUploadedAbi(abiFile);
        onFileChange?.(abiFile);
        await validateAndParseAbi(abiFile);
      }
    },
    [onFileChange, validateAndParseAbi]
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedAbi(file);
      onFileChange?.(file);
      await validateAndParseAbi(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedAbi(null);
    setParseError(null);
    onFileChange?.(null);
    onAbiParsed([]);
  };

  if (uploadedAbi) {
    return (
      <div className="space-y-2">
        <Label>Upload ABI File</Label>
        <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
          <div className="flex items-center gap-3">
            <FileText
              className={`h-5 w-5 ${
                parseError ? "text-red-500" : "text-green-600"
              }`}
            />
            <div>
              <p
                className={`font-medium text-sm ${
                  parseError ? "text-red-600" : "text-green-600"
                }`}
              >
                {uploadedAbi.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(uploadedAbi.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {parseError && (
          <div className="flex items-center gap-2 p-2 text-sm text-red-600 bg-red-50 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>{parseError}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Upload ABI File</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("abi-upload")?.click()}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <h3 className="text-sm font-medium mb-1">
          Drag and drop your ABI file
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Or click to browse your files
        </p>
        <ButtonCommon variant="outline" size="sm" type="button">
          <label htmlFor="abi-upload" className="cursor-pointer">
            Browse Files
          </label>
        </ButtonCommon>
        <input
          id="abi-upload"
          type="file"
          accept=".json,application/json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
