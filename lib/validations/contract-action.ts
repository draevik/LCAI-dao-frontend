import { AbiFunction } from "viem";
import { z } from "zod";

export const contractActionSchema = z.object({
  target: z
    .string()
    .min(1, "Target contract address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM address format"),
  abiOption: z.string().min(1, "ABI option is required"),
  method: z.string().min(1, "Contract method is required"),
  args: z.record(z.string(), z.string()).optional(),
  value: z.string().optional(),
});

// Dynamic schema creator for method arguments
export const createContractActionSchemaWithArgs = (
  methodInputs: AbiFunction["inputs"]
) => {
  const argsSchema: Record<string, z.ZodString> = {};

  methodInputs.forEach((input) => {
    let fieldSchema = z.string().min(1, `${input.name} is required`);

    if (input.type === "address") {
      fieldSchema = fieldSchema.regex(
        /^0x[a-fA-F0-9]{40}$/,
        "Invalid address format"
      );
    } else if (input.type.startsWith("uint")) {
      fieldSchema = fieldSchema.regex(/^\d+$/, "Must be a positive integer");
    } else if (input.type.startsWith("int")) {
      fieldSchema = fieldSchema.regex(/^-?\d+$/, "Must be an integer");
    }

    argsSchema[input.name || ""] = fieldSchema;
  });

  return contractActionSchema.extend({
    args: z.object(argsSchema),
    value: z.string().optional(),
  });
};

export type ContractActionFormData = z.infer<typeof contractActionSchema>;
