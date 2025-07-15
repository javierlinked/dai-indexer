# DAI Indexer

A real-time DAI token transaction indexer built with NestJS that monitors and tracks DAI transfers on the Ethereum mainnet.

## What is this?

DAI Indexer is a blockchain monitoring application that:

- **Real-time Monitoring**: Listens to DAI token transfer events on Ethereum mainnet using WebSocket connections
- **Transaction Tracking**: Accumulates statistics about DAI transfers including total volume and transaction count
- **Transaction Validation**: Provides an API to check if any given transaction hash involves DAI token operations
- **Live Statistics**: Offers real-time insights into DAI token activity since the application started

The DAI token (0x6B175474E89094C44Da98b954EedeAC495271d0F) is a popular stablecoin on Ethereum, and this indexer helps track its movement across the network.

## Features

- Real-time DAI transfer event monitoring
- Cumulative transaction statistics
- Transaction hash validation for DAI operations
- RESTful API endpoints
- Built with TypeScript and NestJS
- Uses Infura for reliable Ethereum node access
- Comprehensive error handling

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **Blockchain**: [Ethers.js](https://docs.ethers.io/) - Ethereum library for blockchain interactions
- **Provider**: [Infura](https://infura.io/) - Ethereum node infrastructure
- **Language**: TypeScript
- **Runtime**: Node.js

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- Yarn package manager
- An [Infura](https://infura.io/) account and API key for Ethereum mainnet access

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dai-indexer
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and set your Infura API key:
   ```bash
   INFURA_KEY=your_infura_api_key_here
   ```

4. **Start the application**
   ```bash
   yarn start
   ```

   For development with auto-reload:
   ```bash
   yarn start:dev
   ```

The application will start on `http://localhost:3000`

## API Endpoints

### Get DAI Statistics
```
GET /transactions
```

Returns comprehensive statistics about DAI transfers since the application started.

**Response:**
```json
{
  "startTime": 1642684800000,
  "currentTime": 1642688400000,
  "totalTransactions": 1547,
  "totalDAITransactions": "1234567.89 DAI"
}
```

**Example:**
```bash
curl http://localhost:3000/transactions
```

### Validate DAI Transaction
```
GET /transactions/:transactionHash
```

Checks if a given transaction hash involves DAI token operations.

**Parameters:**
- `transactionHash` - Ethereum transaction hash (with or without 0x prefix)

**Response:**
```json
true  // if transaction involves DAI
false // if transaction doesn't involve DAI or doesn't exist
```

**Example:**
```bash
curl http://localhost:3000/transactions/0x1234567890abcdef...
```

## Architecture

The application follows a modular architecture:

```
src/
├── transactions/           # Transaction monitoring module
│   ├── transactions.controller.ts   # API endpoints
│   ├── transactions.service.ts      # Core business logic
│   └── transactions.spec.ts         # Unit tests
├── abi.json               # DAI token ABI for contract interaction
├── types.ts               # TypeScript type definitions
├── app.module.ts          # Main application module
└── main.ts                # Application bootstrap
```

### Key Components

- **TransactionsService**: Handles WebSocket connection to Ethereum, monitors Transfer events, and maintains statistics
- **TransactionsController**: Exposes REST API endpoints for accessing data
- **Real-time Event Handler**: Processes DAI transfer events as they occur on the blockchain

## How It Works

1. **Connection**: The app establishes a WebSocket connection to Ethereum mainnet via Infura
2. **Event Listening**: Subscribes to `Transfer` events from the DAI token contract
3. **Data Accumulation**: Each transfer event updates the running total and transaction count
4. **API Access**: Provides real-time access to accumulated data and transaction validation

## Testing

Run the test suite:

```bash
# Unit tests
yarn test

# End-to-end tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Available Scripts

- `yarn start` - Start the application
- `yarn start:dev` - Start in development mode with auto-reload
- `yarn start:prod` - Start in production mode
- `yarn build` - Build the application
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Lint the codebase
- `yarn format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED license.

## Author

**[@javierlinked](https://github.com/javierlinked)**  
*2022*

---

*Built with ❤️ for the Ethereum and DeFi community*