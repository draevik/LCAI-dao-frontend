/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Abi, AbiFunction, erc20Abi } from "viem";
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
import useGetAbiContract from "@/hooks/useGetAbiContract";
import { Loader2Icon, BookUserIcon } from "lucide-react";
import { ContractPickerDialog } from "./contract-picker-dialog";
import { Button } from "./common/Button";
import { Button as ButtonUi } from "@/components/ui/button";

const abiOptions = [
  { value: "imported", label: "Use the imported ABI" },
  {
    value: "erc20",
    label: "ERC 20",
    abi: erc20Abi as Abi,
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
  const [showEthValue, setShowEthValue] = useState(false);
  const skipAutoAbiRef = useRef(false);

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
      value: "",
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const autoAbi = useGetAbiContract(watch("target") as `0x${string}`);

  useEffect(() => {
    if (skipAutoAbiRef.current) {
      skipAutoAbiRef.current = false;
      return;
    }
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
    handleAbiParsed((methods as AbiFunction[]) || []);
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
      value: showEthValue && data.value ? data.value : undefined,
    };

    onSave(newAction);
    resetForm();
  };

  const resetForm = () => {
    form.reset({ target: "", method: "", abiOption: "", args: {}, value: "" });
    setMethodInputs([]);
    setWriteContractAbi([]);
    setShowEthValue(false);
  };

  // Update form when editing action changes
  useEffect(() => {
    if (!isOpen) return;
    if (editingAction) {
      skipAutoAbiRef.current = true;
      setWriteContractAbi(editingAction.abi || []);
      form.reset({
        target: editingAction.target,
        method: editingAction.method || "",
        abiOption: editingAction.abiOption || "",
        args: editingAction.args || {},
        value: editingAction.value || "",
      });
      setShowEthValue(!!editingAction.value);
      if (editingAction.method) {
        setMethodInputs(
          editingAction.abi?.find((i) => i.name === editingAction.method)
            ?.inputs || []
        );
      }
    } else resetForm();
  }, [isOpen]);

  // Reset form when method inputs change to apply new validation
  useEffect(() => {
    const currentArgs = form.getValues("args");
    const newArgs: Record<string, string> = {};

    // Preserve existing values for matching inputs
    methodInputs.forEach((input) => {
      if (input.name) newArgs[input.name] = currentArgs?.[input.name] || "";
    });

    form.setValue("args", newArgs);
  }, [methodInputs]);

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
        <DialogContent className="sm:max-w-2xl px-0 outline-none">
          <DialogHeader className="px-6">
            <DialogTitle className="text-xl sm:text-2xl text-content-primary">
              Contract Call
            </DialogTitle>
            <DialogDescription className="text-content-secondary">
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
                              <ButtonUi
                                type="button"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={() => setShowContractPicker(true)}
                              >
                                <BookUserIcon className="h-4 w-4" />
                              </ButtonUi>
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
                              <SelectTrigger className="w-full py-3">
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
                                <SelectTrigger className="w-full py-3 capitalize">
                                  <SelectValue placeholder="Select a contract method..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {writeContractAbi.map((method) => (
                                  <SelectItem
                                    className="capitalize"
                                    key={method.name}
                                    value={method.name}
                                  >
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                            <p className="text-content-secondary text-xs">
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
                          <Label className="text-content-primary">
                            Calldatas
                          </Label>
                          <p className="text-sm text-content-secondary mb-3">
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
                                    <FormLabel className="capitalize">
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
                        </div>
                        {/* ETH Value Toggle */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="send-ether-toggle"
                              className="text-sm text-content-secondary cursor-pointer"
                            >
                              Also send Ether to the target address? (this is
                              not common)
                            </Label>
                            <Switch
                              id="send-ether-toggle"
                              checked={showEthValue}
                              onCheckedChange={setShowEthValue}
                            />
                          </div>

                          {showEthValue && (
                            <div className="space-y-2 p-4 border rounded-lg">
                              <Label className="text-content-primary font-semibold">
                                Value
                              </Label>
                              <p className="text-sm text-content-secondary">
                                The amount of ETH you wish to send the target
                                address (External Account or Smart Contract)
                              </p>
                              <div className="flex items-center mt-3">
                                <div className="bg-muted px-4 py-2.5 rounded-l-lg border border-r-0 font-medium text-content-secondary">
                                  ETH
                                </div>
                                <Input
                                  type="text"
                                  placeholder="0"
                                  className="rounded-l-none"
                                  {...form.register("value")}
                                />
                              </div>
                            </div>
                          )}
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
