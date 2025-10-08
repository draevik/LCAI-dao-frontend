# LCAI DAO - Governor-Style Governance Interface

A modern, Snapshot-inspired DAO interface built with Next.js, shadcn/ui, and OpenZeppelin governance contracts. This application provides a complete governance experience similar to Snapshot.org with on-chain voting capabilities.

## Features

- **Proposal Management**: Create, view, and vote on governance proposals
- **Token-based Voting**: Voting power based on LCAI token holding with delegation support
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui components
- **Web3 Integration**: Seamless wallet connection with Reown AppKit (WalletConnect v2)
- **Mobile Responsive**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live proposal status and voting results
- **Secure Voting**: Integration with OpenZeppelin Governor contracts
- **Multi-Chain**: Support for Ethereum, Arbitrum, Polygon, and more

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components  
- **Web3**: Reown AppKit, Viem, Wagmi v2, TanStack Query
- **Smart Contracts**: OpenZeppelin Governor, ERC20Votes, TimelockController
- **Icons**: Lucide React

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Web3 wallet (MetaMask, WalletConnect, etc.)
- Deployed OpenZeppelin governance contracts

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd lcai-dao
npm install
```

2. **Install required Web3 packages:**
```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

3. **Set up Reown Project:**
- Go to [https://cloud.reown.com](https://cloud.reown.com)
- Create a new project and get your Project ID

4. **Configure your contracts:**

Edit `lib/contracts.ts` with your deployed contract addresses:
```typescript
export const CONTRACTS = {
  GOVERNOR: "0x...", // Your Governor contract address
  TOKEN: "0x...",    // Your LCAI ERC20Votes token address
  TIMELOCK: "0x...", // Your Timelock contract (optional)
} as const;
```

5. **Set up environment variables:**
```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your values:
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_GOVERNOR_CONTRACT=0x...
NEXT_PUBLIC_TOKEN_CONTRACT=0x...
NEXT_PUBLIC_TIMELOCK_CONTRACT=0x...
```

5. **Run the development server:**
npm run dev

Visit [http://localhost:3000](http://localhost:3000) to see your DAO interface!

## Smart Contract Requirements

This interface works with OpenZeppelin governance contracts. You'll need:

### Required Contracts
1. **ERC20Votes Token** - Governance token with voting capabilities
2. **Governor Contract** - Main governance contract with OpenZeppelin Governor
3. **Timelock Controller** (optional) - For delayed execution

### Contract Interface Requirements
Your contracts should implement the standard OpenZeppelin interfaces:
- `IGovernor` - For proposal creation and voting
- `IVotes` - For voting power and delegation
- `IERC20` - For token balance queries

The interface expects these standard functions to be available:
- `propose()`, `castVote()`, `castVoteWithReason()`
- `getVotes()`, `delegate()`, `balanceOf()`
- `proposalThreshold()`, `votingDelay()`, `votingPeriod()`

## Usage Guide

### For Token Holders
{{ ... }}
2. **Delegate Voting Power**: Delegate tokens to yourself or others to participate
3. **Browse Proposals**: View all active and past governance proposals
4. **Cast Votes**: Vote For, Against, or Abstain on active proposals
5. **Create Proposals**: Submit new proposals (requires minimum token threshold)

### For Developers

Key hooks and utilities:

```typescript
// Main governance hook
const { 
  votingPower, 
  createProposal, 
  castVote, 
  canCreateProposal 
} = useGovernance();

// Wallet connection
const { address, isConnected } = useAccount();
const { connect, connectors } = useConnect();
```

## Project Structure

```
lcai-dao/
├── app/                     # Next.js app router
│   ├── create/             # Proposal creation page
│   ├── proposal/[id]/      # Dynamic proposal detail pages
│   ├── layout.tsx          # Root layout with navigation
│   └── page.tsx            # Home page (proposal list)
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── navigation.tsx     # Main navigation bar
│   └── providers.tsx      # Web3 providers
├── hooks/                 # Custom React hooks
│   └── useGovernance.ts   # Governance contract interactions
├── lib/                   # Utilities and configuration
│   ├── contracts.ts       # Contract ABIs and addresses
│   ├── web3.ts           # Reown AppKit configuration
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Configuration

### Supported networks

Configure networks in `lib/web3.ts`:

```typescript
export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  connectors: [injected(), metaMask(), walletConnect()],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
  },
});
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

## UI Components

Built with shadcn/ui components:
- **Cards**: Proposal display and voting interfaces
- **Forms**: Proposal creation with rich text editor
- **Navigation**: Responsive navigation with wallet connection
- **Badges**: Status indicators and voting power display
- **Progress**: Visual voting results
- **Tabs**: Organized content sections

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
