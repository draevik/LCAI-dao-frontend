/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Abi, AbiFunction, erc20Abi, zeroAddress } from "viem";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { ContractAction } from "@/types";
import { AbiDropzone } from "./abi-dropzone";
import {
  contractActionSchema,
  createContractActionSchemaWithArgs,
  ContractActionFormData,
} from "@/lib/validations/contract-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import counterAbi from "@/contracts/abi/counterAbi";
import useGetAbiContract from "@/hooks/useGetAbiContract";
import { Loader2Icon, BookUserIcon } from "lucide-react";
import { ContractPickerDialog } from "./contract-picker-dialog";

const abiOptions = [
  { value: "imported", label: "Use the imported ABI" },
  {
    value: "erc20",
    label: "ERC 20",
    abi: erc20Abi as unknown as Abi,
  },
  {
    value: "counter",
    label: "Counter (Example)",
    abi: counterAbi as unknown as Abi,
  },
  { value: "upload", label: "Upload an ABI" },
];

type ContractActionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (action: ContractAction) => void;
  editingAction?: ContractAction | null;
  dialogType: "send" | "contract";
};

export function ContractActionDialog({
  isOpen,
  onClose,
  onSave,
  editingAction,
  dialogType,
}: ContractActionDialogProps) {
  const [writeContractAbi, setWriteContractAbi] = useState<AbiFunction[]>([]);
  const [methodInputs, setMethodInputs] = useState<AbiFunction["inputs"]>([]);
  const [showContractPicker, setShowContractPicker] = useState(false);

  // Create dynamic schema based on method inputs
  const currentSchema =
    methodInputs.length > 0
      ? createContractActionSchemaWithArgs(methodInputs)
      : contractActionSchema;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      target: "",
      method: "",
      args: {},
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const autoAbi = useGetAbiContract(watch("target") as `0x${string}`);

  useEffect(() => {
    if (autoAbi.data) {
      handleAbiOptionChange("imported");
    } else {
      handleAbiOptionChange("upload");
    }
  }, [autoAbi.data]);

  const handleAbiOptionChange = (value: string) => {
    setMethodInputs([]);
    setWriteContractAbi([]);
    setValue("method", "");
    setValue("abiOption", value);

    const methods =
      value === "imported"
        ? autoAbi.data
        : abiOptions.find((i) => i.value === value)?.abi;
    handleAbiParsed(methods || []);
  };

  const handleAbiParsed = (methods: AbiFunction[]) => {
    const writeMethods = methods.filter(
      (item: AbiFunction) =>
        item.type === "function" &&
        (item.stateMutability === "payable" ||
          item.stateMutability === "nonpayable")
    );
    setWriteContractAbi(writeMethods);
    setValue("method", "");
    setMethodInputs([]);
  };

  const handleMethodChange = (value: string) => {
    const method = writeContractAbi.find((i) => i.name === value);
    if (method) {
      setMethodInputs(method.inputs || []);
      // Reset args when method changes
      setValue(
        "args",
        method.inputs.reduce((acc, input) => {
          if (input.name) acc[input.name] = "";
          return acc;
        }, {} as Record<string, string>)
      );
    }
    setValue("method", value);
  };

  const onSubmit = (data: ContractActionFormData) => {
    const newAction: ContractAction = {
      id: editingAction?.id || Date.now().toString(),
      type: dialogType,
      target: data.target as `0x${string}`,
      method: data.method,
      abiOption: data.abiOption,
      abi: writeContractAbi,
      args: data.args as Record<string, string>,
    };

    onSave(newAction);
    resetForm();
  };

  const resetForm = () => {
    form.reset({ target: "", method: "", abiOption: "", args: {} });
    setMethodInputs([]);
    setWriteContractAbi([]);
  };

  // Update form when editing action changes
  useEffect(() => {
    if (!isOpen) return;
    if (editingAction) {
      form.reset({
        target: editingAction.target,
        method: editingAction.method || "",
        abiOption: editingAction.abiOption || "",
        args: editingAction.args || {},
      });
      setWriteContractAbi(editingAction.abi || []);
      if (editingAction.method) {
        setMethodInputs(
          editingAction.abi?.find((i) => i.name === editingAction.method)
            ?.inputs || []
        );
      }
    } else resetForm();
  }, [isOpen, editingAction, form]);

  // Reset form when method inputs change to apply new validation
  useEffect(() => {
    const currentArgs = form.getValues("args");
    const newArgs: Record<string, string> = {};

    // Preserve existing values for matching inputs
    methodInputs.forEach((input) => {
      if (input.name) newArgs[input.name] = currentArgs?.[input.name] || "";
    });

    form.setValue("args", newArgs);
  }, [methodInputs, form]);

  const handleSelectContract = (address: string) => {
    setValue("target", address);
    setShowContractPicker(false);
  };

  return (
    <>
      {/* Contract Picker Modal */}
      <ContractPickerDialog
        isOpen={showContractPicker}
        onClose={() => setShowContractPicker(false)}
        onSelect={handleSelectContract}
      />

      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl px-0">
          <DialogHeader className="px-6">
            <DialogTitle>Contract Call</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Add a contract call to your proposal
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ScrollArea className="max-h-[80vh] overflow-auto">
                <div className="space-y-6 pt-4 px-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="target"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target contract address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Address or ENS"
                                disabled={autoAbi.isFetching}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={() => setShowContractPicker(true)}
                              >
                                <BookUserIcon className="h-4 w-4" />
                              </Button>
                              {autoAbi.isFetching && (
                                <Loader2Icon className="absolute right-10 top-1/2 -translate-y-1/2 animate-spin h-4 w-4" />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      {/* <Label htmlFor="abi-select">
                      Select an ABI or upload yours
                    </Label>
                    <Select
                      value={abiOption}
                      onValueChange={handleAbiOptionChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an ABI" />
                      </SelectTrigger>
                      <SelectContent>
                        {abiOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}
                      <FormField
                        control={form.control}
                        name="abiOption"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select an ABI or upload yours</FormLabel>
                            <Select
                              disabled={autoAbi.isFetching}
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleAbiOptionChange(value);
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an ABI" />
                              </SelectTrigger>
                              <SelectContent>
                                {abiOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.getValues("abiOption") === "upload" && (
                      <AbiDropzone onAbiParsed={handleAbiParsed} />
                    )}

                    {writeContractAbi.length > 0 && (
                      <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contract method</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleMethodChange(value);
                              }}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a contract method..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {writeContractAbi.map((method) => (
                                  <SelectItem
                                    key={method.name}
                                    value={method.name}
                                  >
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                            <p className="text-muted-foreground text-xs">
                              This ABI is a standard. Please, be sure the smart
                              contract implements the method you selected.
                            </p>
                          </FormItem>
                        )}
                      />
                    )}

                    {methodInputs.length > 0 && (
                      <>
                        <Separator />

                        <div className="space-y-2">
                          <Label>Calldatas</Label>
                          <p className="text-sm text-muted-foreground mb-3">
                            The data for the function arguments you wish to send
                            when the action executes
                          </p>

                          <div className="space-y-3 p-4 border rounded-lg">
                            {methodInputs.map((input) => (
                              <FormField
                                key={input.name}
                                control={form.control}
                                name={`args.${input.name}` as `args.${string}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      {input.name}
                                      <span className="text-xs text-muted-foreground ml-2">
                                        ({input.type})
                                      </span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={input.type}
                                        {...field}
                                        type="text"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>

                          {/* <div className="flex items-center gap-2 mt-3">
                <input type="checkbox" id="send-ether" className="rounded" />
                <Label htmlFor="send-ether" className="text-sm">
                  Also send Ether to the target address? (this is not common)
                </Label>
              </div> */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="px-6 mt-6">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAction ? "Update" : "Add"} Transaction
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
