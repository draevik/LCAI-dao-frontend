# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LCAI DAO is a Next.js 15 governance interface for the LightchainAI ecosystem, built with React 19, TypeScript, and Tailwind CSS v4. It integrates with OpenZeppelin Governor contracts to enable proposal creation, voting, delegation, and contract execution through a DAO governance system.

## Commands

```bash
npm run dev          # Start Next.js dev server with Turbopack
npm run build        # Build production bundle with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint
npm run codegen      # Generate GraphQL types from external schema (requires ../lcai-dao-api/.checkpoint/schema.gql)
```

- Uses **Next.js 15 App Router** (not Pages Router) with **Turbopack**
- No test framework is configured
- Path alias `@/` maps to the project root

## Environment

Required in `.env.local`:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — Reown Cloud project ID (required; `config/wagmi.ts` throws if missing)
- `NEXT_PUBLIC_API_ENDPOINT` — GraphQL API endpoint (defaults to `http://localhost:3000/graphql`)
- `NEXT_PUBLIC_ETHERSCAN_API_KEY` — Optional; used by `useGetAbiContract` for Etherscan ABI fetching

## Architecture

### Multi-Chain Configuration (`config/index.ts`)

All contract addresses and chain definitions live here, keyed by chain ID. The `config.chains` array controls which chains Wagmi/AppKit offer — currently set to `[customMainnet]` (Ethereum mainnet with a custom Infura RPC). `lcaiTestnet` (Chain ID: 504) is also defined and used in the address maps but is not in `config.chains` by default.

Contract address maps (`governor`, `timeLock`, `voteToken`, `underlyingToken`, `predefinedContracts`) are all indexed by `chain.id`. When adding support for a new chain, update every relevant map here.

### Web3 Layer

```
context/index.tsx          — WagmiProvider + QueryClientProvider + AppKit setup (SSR via cookie state)
config/wagmi.ts            — WagmiAdapter with cookie storage, exports wagmiConfig
hooks/useCurrentChain.ts   — Returns the active chain from wagmi's useChainId, falling back to chains[0]
hooks/useWeb3Clients.ts    — Creates a Viem publicClient (with multicall batching) and re-exports walletClient
hooks/useContracts.ts      — Memoised getContract() instances: governorContract, voteTokenContract, timeLockContract, underlyingTokenContract
```

All Web3 interaction in components goes through these hooks — never call Viem or Wagmi directly from pages/components.

### Governance Hook (`hooks/useGovernance.ts`)

The single entry point for on-chain governance actions:
- `createProposal(actions, description)` — encodes calldatas, simulates, writes, decodes the `ProposalCreated` event to return the proposal ID
- `castVote(proposalId, support, reason?)` — supports optional reason via `castVoteWithReason`
- `simulateActions(actions)` — runs `simulateContract` against the timelock address as the sender (matches actual execution context)
- `cancel`, `queue`, `execute` — all hash the description with `keccak256(encodePacked(…))` for the Governor interface

### Delegation & Ballots

- `hooks/useDelegation.ts` — Reads/writes delegation state on the voteToken contract. `delegate(address)` and `delegateToSelf()` are the primary actions.
- `hooks/useBallots.ts` — Manages the ballot token (voteToken) deposit/withdraw flow: checks and approves ERC20 allowance on the underlying token, then calls `depositFor` / `withdrawTo` on the voteToken contract. Uses `useReadContracts` for balance/votes/symbol.
- `hooks/useGetAbiContract.ts` — Fetches a contract's ABI at runtime from Etherscan (v2 multi-chain API) with Sourcify as fallback. Used in the contract-action dialog when users paste an arbitrary address.

### Data Layer — GraphQL via Apollo

All indexed blockchain data comes through Apollo Client, not direct RPC:

- `graphqlApi/queries.ts` — All GraphQL queries using the `gql` tag from the codegen client preset. Includes shared fragments (`proposalFields`, `voteFields`, `delegateFields`).
- `graphqlApi/index.ts` — `createApi(uri)` factory returns an object with all query methods (`loadProposals`, `loadProposal`, `loadProposalVotes`, `loadDelegates`, etc.). Also owns `getProposalState()` — the client-side state calculation from raw proposal data.
- `graphqlApi/types.ts` — Re-exports codegen fragment types as `ApiProposal` and `ApiVote`
- `hooks/useGraphqlApi.ts` — Memoised `createApi()` call; use this in components

**To add a new query:** write it in `queries.ts`, run `npm run codegen`, then add a method to the object returned by `createApi()`.

### Proposal State Machine

Defined in `lib/constents.ts` (note: filename has a typo, do not rename without updating all imports):

```
Pending (0) → Active (1) → Succeeded (4) → Queued (5) → Executed (7)
                          ↘ Defeated (3)
              ↘ Canceled (2)
                          → Expired (6)
```

State is computed client-side in `getProposalState()` (`graphqlApi/index.ts`) based on timestamps, quorum, and vote counts. The quorum check uses `scoresFor + scoresAbstain >= quorum`. The `scores` array on a formatted `Proposal` is `[for, against, abstain]` (mapped from API fields `scores_1`, `scores_2`, `scores_3`).

### Vote Choice Mapping — Be Careful

Governor Bravo uses `0=against, 1=for, 2=abstain`. The UI's "common format" flips 0 and 1. `convertChoice()` in `lib/utils.ts` handles this conversion. The `VoteType` enum in `lib/constents.ts` uses the common format (`For=1, Against=0, Abstain=2`).

### Component Organization

- `components/proposal/` — All proposal detail view components (header, title, tabs, voting dialog, action button, results, timeline)
- `components/home/` — Home page sections (stats, recent proposals, rising delegates, sidebar, lists)
- `components/delegation/` — Delegate modal and list item
- `components/ui/` — shadcn/ui primitives; add new ones via `npx shadcn add <component>`
- `components/common/Button.tsx` — A custom Button wrapper (uses FontAwesome icons, distinct from the shadcn `ui/button`). Both Button components coexist — check imports carefully.
- `components/CopyButton.tsx` — Reusable copy-to-clipboard button with icon toggle; used in delegate and vote list items

Pages are thin: `app/page.tsx` is the home page (client component, fetches via TanStack Query), `app/proposal/create/page.tsx` is the creation form (uses MDXEditor for markdown), and `app/proposal/[space]/[id]/page.tsx` is the detail view.

### Styling

- Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`)
- shadcn/ui configured in `components.json` (new-york style, CSS variables, lucide icons)
- Additional global styles in `public/scss/style.scss` and `public/css/plugins/fontawesome-all.min.css`
- Custom design tokens referenced as Tailwind classes like `text-content-primary`, `text-content-secondary`, `bg-surface-soft`, `border-border-default` — these are defined in the global CSS, not in a tailwind config file

## Key Gotchas

1. **Two Button components**: `components/common/Button.tsx` (FontAwesome-based, used in proposal creation) and `components/ui/button.tsx` (shadcn). Both are imported in the same files — check which one is needed.
2. **`lib/constents.ts` typo**: The filename is misspelled. Don't rename it without updating every import.
3. **Chain config vs active chain**: `config.chains` (used by Wagmi) currently only includes mainnet. The LCAI Testnet addresses exist in the maps but the chain must be added to `config.chains` to be selectable in the wallet.
4. **`underlyingToken` is mainnet-only**: `config.underlyingToken` only has an entry for mainnet. `useBallots` will fail on testnet if it tries to access this.
5. **GraphQL codegen requires a sibling repo**: The schema file is at `../lcai-dao-api/.checkpoint/schema.gql`. `npm run codegen` will fail if that path doesn't exist.
6. **MDXEditor is client-only**: It's used directly in the create proposal page, which is already a `"use client"` component. Don't try to render it in a server component.
7. **API hardcodes "mainnet" indexer**: The GraphQL queries in `graphqlApi/index.ts` pass `indexer: "mainnet"` as a variable. This is the indexer name, not the network — it works across all chains indexed by the API.
8. **Execution format migration**: `formatExecution()` handles two formats — old `RawTransaction` with `to` field and new `DecodedExecution` with `target` field. Both may exist in stored proposals.
