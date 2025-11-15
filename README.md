# Belyfted Pay Integration Flow

An implementation of the Belyfted Pay payment integration flow, built with Next.js, TypeScript, and Tailwind CSS.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd belyfted-pay-integration-flow
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm start
```

### Run Tests
```bash
npm test
```

## Testing the Flow

### User Credentials
- **Email**: `user@example.com` or `bimms@belyfted.com`
- **Password**: `password123`

### PIN Testing
- **Success**: Enter `1234`
- **Failed**: Enter `0000`
- **Invalid**: Any other PIN shows error in modal

### Wallets
- GBP Wallet
- NGN Wallet

## Technologies Used

### Core
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS v4** - Styling with CSS-first configuration

### State Management
- **React Context API** - Global payment state management

### Architecture
- **Next.js API Routes** - Backend API for authentication
- **Service Layer Pattern** - Separation of concerns
- **Component-Based Architecture** - Reusable UI components

## Implementation Decisions

### 1. Routing Strategy
- **Main checkout page**: Full route (`/`)
- **Payment flow pages**: Full routes (`/payment/method`, `/payment/signin`, `/payment/confirm`)
- **PIN entry**: Modal overlay
- **Result pages**: Separate routes (`/payment/success`, `/payment/failed`, `/payment/redirect`)

### 2. Dark Mode Implementation
- Class-based dark mode (`.dark` class)
- Manual toggle
- Persistent via localStorage

**Rationale**: User control over theme, future-proof for system preference feature.

### 3. Authentication Architecture
```
Component → Service Layer → API Client → Next.js API Route → Mock Data
```

**Rationale**: 
- Separation of concerns
- Easy to swap mock data with real API
- Testable layers
- Secure (passwords only on server-side)

### 4. Currency Conversion Feature
- Automatic detection when wallet currency ≠ payment currency
- Fixed exchange rate for demo

**Rationale**: Real-world payment scenario handling multiple currencies.

### 5. Component Structure
- **Atomic Design**: Button, Input, Radio, Spinner, Alert
- **Feature Components**: WalletDropdown, CurrencyConversionBox, PinModal
- **Page Components**: Full payment flow pages

**Rationale**: Reusability, maintainability, and scalability.

### 6. Responsive Design
- Mobile-first approach
- Breakpoint: `md:` (768px+)
- Fluid typography and spacing

**Rationale**: Multi-device support from the start.
```

### Possible Improvements with More Time
- Implement JWT-based authentication
- Implement proper session management
- Add route guards
- Proper Unit tests (Jest + React Testing Library)
- Session persistence
