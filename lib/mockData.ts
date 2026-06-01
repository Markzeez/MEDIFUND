// Mock donation data — replace with real on-chain events in production
export const CAMPAIGN_GOAL = 50000; // USD equivalent

export interface Donation {
  id: string;
  donor: string;
  amount: number; // ETH
  amountUsd: number;
  timestamp: Date;
  message?: string;
  txHash: string;
}

export const MOCK_DONATIONS: Donation[] = [
  {
    id: "1",
    donor: "0x4a2e...c3f1",
    amount: 0.5,
    amountUsd: 1540,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    message: "Praying for a speedy recovery 🙏",
    txHash: "0xabc123",
  },
  {
    id: "2",
    donor: "0x7f9b...11d4",
    amount: 1.2,
    amountUsd: 3696,
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    message: "Stay strong!",
    txHash: "0xdef456",
  },
  {
    id: "3",
    donor: "Anonymous",
    amount: 0.25,
    amountUsd: 770,
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    txHash: "0xghi789",
  },
  {
    id: "4",
    donor: "0x1c3e...9a70",
    amount: 2.0,
    amountUsd: 6160,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    message: "From our whole family ❤️",
    txHash: "0xjkl012",
  },
  {
    id: "5",
    donor: "0x88fa...bb2c",
    amount: 0.8,
    amountUsd: 2464,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    txHash: "0xmno345",
  },
  {
    id: "6",
    donor: "0x5501...7731",
    amount: 3.5,
    amountUsd: 10780,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    message: "Hope this helps cover the costs",
    txHash: "0xpqr678",
  },
];

export function formatAddress(addr: string): string {
  if (addr === "Anonymous") return addr;
  if (addr.length <= 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
