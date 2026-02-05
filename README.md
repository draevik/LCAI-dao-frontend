# LCAI DAO - Governance Interface

A modern DAO governance interface built with Next.js and OpenZeppelin governance contracts, specifically designed for the LCAI ecosystem. Features proposal creation, voting, and contract execution capabilities.

## Features

- **Proposal Management**: Create, view, and vote on governance proposals with contract actions
- **Voting System**: Vote For/Against/Abstain with real-time results and voting power display
- **Contract Actions**: Add multiple contract calls to proposals with simulation
- **Web3 Integration**: Seamless wallet connection with Reown AppKit
- **LCAI Testnet**: Native support for LCAI Testnet (Chain ID: 504)
- **Modern UI**: Responsive interface built with shadcn/ui and Tailwind CSS
- **Real-time Data**: Live proposal status and blockchain event monitoring
- **Markdown Support**: Rich text descriptions with markdown rendering

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Web3**: Reown AppKit, Viem v2, Wagmi v2, TanStack Query
- **Smart Contracts**: OpenZeppelin Governor, Custom Presale Voting Power, TimelockController
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Web3 wallet (MetaMask, WalletConnect, etc.)
- Access to LCAI Testnet or deployed contracts

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd lcai-dao
npm install
```

2. **Set up environment variables:**

```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your Reown Project ID:
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_reown_project_id
```

3. **Run the development server:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your DAO interface!

### Network Configuration

The app is pre-configured for LCAI Testnet:

- **Chain ID**: 504
- **RPC**: https://light-testnet-rpc.lightchain.ai
- **Explorer**: https://testnet.lightscan.app
- **Currency**: LCAI

## Smart Contract Architecture

The interface integrates with deployed contracts on LCAI Testnet:

### Deployed Contracts

- **Governor**: `0xD61EEAD276De743393de11bBc9997Aa7Cc95ca31`
- **Presale Voting Power**: `0xaea6e8C8149b9aA996e3151C5aaB6855F6Fa8Daa`
- **Timelock**: `0x2925fcaaAcC7b2c41BDc68383899f78Cd26b3B21`

### Contract Features

- **OpenZeppelin Governor**: Standard governance with proposal creation and voting
- **Custom Voting Power**: Presale-based voting power calculation
- **Timelock Controller**: Delayed execution for security
- **Multi-call Support**: Execute multiple contract calls per proposal

### Governance Parameters

- **Proposal Threshold**: 0 LCAI (for testing)
- **Quorum**: 4% of total voting power
- **Proposal Delay**: 1 hour
- **Voting Period**: 2 days
- **Timelock Delay**: 2 days

## Usage Guide

### For Users

1. **Connect Wallet**: Connect your Web3 wallet to LCAI Testnet
2. **View Proposals**: Browse all governance proposals with status and voting results
3. **Cast Votes**: Vote For/Against/Abstain on active proposals
4. **Create Proposals**: Submit new proposals with contract actions
5. **Add Actions**: Include contract calls, token transfers, and other executable actions

### For Developers

Key hooks and utilities:

```typescript
// Main governance hook
const { createProposal, castVote, simulateActions } = useGovernance();

// Contract interactions
const { governorContract, presaleVotingPowerContract } = useContracts();

// Web3 clients
const { publicClient } = useWeb3Clients();

// Wallet connection
const { address, isConnected } = useConnection();
```

## Project Structure

```
lcai-dao/
├── app/                           # Next.js app router
│   ├── proposal/
│   │   ├── [id]/page.tsx         # Proposal detail page
│   │   └── create/page.tsx       # Proposal creation page
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page (proposal list)
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── contract-action-dialog.tsx # Contract action modal
│   ├── loading-block.tsx         # Loading states
│   └── providers.tsx             # Web3 and theme providers
├── config/
│   ├── index.ts                  # Chain and contract configuration
│   └── wagmi.ts                  # Wagmi adapter setup
├── hooks/
│   ├── useGovernance.ts          # Main governance logic
│   ├── useContracts.ts           # Contract instances
│   ├── useWeb3Clients.ts         # Viem clients
│   └── useCurrentChain.ts        # Chain utilities
├── lib/
│   ├── contracts.ts              # Contract ABIs
│   ├── constents.ts              # Constants and enums
│   ├── utils.ts                  # Utility functions
│   └── validations/              # Form validation schemas
└── types/                        # TypeScript type definitions
```

## Configuration

### Network Configuration

Networks are configured in `config/index.ts`:

```typescript
export const lcaiTestnet: Chain = {
  id: 504,
  name: "LCAI Testnet",
  nativeCurrency: { name: "LCAI Testnet", symbol: "LCAI", decimals: 18 },
  rpcUrls: { default: { http: ["https://light-testnet-rpc.lightchain.ai"] } },
  blockExplorers: {
    default: {
      name: "LCAI Testnet Explorer",
      url: "https://testnet.lightscan.app",
    },
  },
};

const config = {
  chains: [lcaiTestnet],
  daoSystem: {
    proposalThreshold: 0,
    quorumNeeded: 4,
    proposalDelay: 60 * 60,
    votingPeriod: 60 * 60 * 24 * 2,
  },
};
```

### Proposal States

The interface handles all OpenZeppelin Governor states:

- **Pending**: Proposal created, voting hasn't started
- **Active**: Voting is open
- **Canceled**: Proposal was canceled
- **Defeat**: Proposal failed to meet quorum/majority
- **Succeeded**: Proposal passed
- **Queued**: Proposal queued in timelock
- **Expired**: Proposal expired before execution
- **Executed**: Proposal successfully executed

## Key Features

### Proposal Management

- **Create Proposals**: Rich form with title, description, and discussion links
- **Contract Actions**: Add multiple contract calls with parameter inputs
- **Simulation**: Test proposal execution before submission
- **Status Tracking**: Real-time proposal state monitoring

### Voting Interface

- **Vote Casting**: For/Against/Abstain with voting power display
- **Results Visualization**: Progress bars and vote breakdowns
- **Voter History**: Track individual votes and timestamps
- **Timeline**: Proposal lifecycle visualization

### UI Components

- **Modern Design**: Clean, responsive interface with dark/light themes
- **Form Validation**: Zod schemas with React Hook Form
- **Loading States**: Skeleton loaders and async state management
- **Error Handling**: User-friendly error messages and recovery

## Security Considerations

- All contract interactions use Viem for type safety
- Proposal validation on both frontend and contract level
- Secure wallet connection with multiple connector options
- Input sanitization for proposal descriptions
- Rate limiting considerations for proposal creation

## Development Roadmap

### 🚧 TODO List

#### High Priority

- [ ] **Rich Text Editor**: Replace normal textarea with a rich text editor for proposal descriptions (markdown support with preview)
- [ ] **Governor Lifecycle Management**: Handle all proposal states including cancellation, queueing, and execution
- [ ] **Smart Contract ABI Integration**: Automatically fetch and implement ABI from verified smart contracts
- [ ] **Complete Proposal State Handling**: Implement UI and logic for all governor states (Pending, Active, Canceled, Defeated, Succeeded, Queued, Expired, Executed)

#### Medium Priority

- [ ] **Send Token Functionality**: Add token transfer capabilities similar to contract calls in proposal creation
- [ ] **Subgraph Integration**: Replace direct blockchain event querying with subgraph queries for better performance

### ✅ Completed Features

- [x] Basic proposal creation and voting interface
- [x] Web3 wallet integration with Reown AppKit
- [x] OpenZeppelin Governor contract integration
- [x] Responsive UI with shadcn/ui components
- [x] Proposal listing and detail views
- [x] Vote casting functionality
- [x] Contract action simulation
- [x] Timeline and voting power display
- [x] Multi-chain support configuration

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for governance contracts and security standards
- [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components
- [Wagmi](https://wagmi.sh/) for React hooks and Web3 integration
- [Viem](https://viem.sh/) for TypeScript-first Ethereum interactions
- [Snapshot](https://snapshot.org/) for governance UX inspiration

---

**Ready to govern? Connect your wallet and start participating in LCAI DAO governance! 🚀**.
