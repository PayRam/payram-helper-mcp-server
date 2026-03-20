import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../../utils/logger.js';
import { buildToolSchemas } from '../common/schemas.js';
import { safeHandler } from '../common/errors.js';
import { getAddressBalances } from '../../api/payramApi.js';
import type { AddressBalanceEntry } from '../../api/types.js';

const balanceEntrySchema = z.object({
  walletName: z.string(),
  walletID: z.number(),
  blockchainCode: z.string(),
  blockchainFamily: z.string(),
  currencyCode: z.string(),
  amount: z.string(),
  addressCount: z.number(),
  action: z.string(),
});

const schemas = buildToolSchemas({
  input: z.object({}).strict(),
  output: z.object({
    balances: z.array(balanceEntrySchema),
    totalWallets: z.number(),
  }),
});

const textContent = (text: string) => ({ type: 'text' as const, text });

const formatEntry = (e: AddressBalanceEntry): string => {
  const amount = parseFloat(e.amount) || 0;
  const amountStr = amount.toFixed(6);
  return (
    `  ${e.walletName.padEnd(24)} ${e.blockchainCode.padEnd(10)} ` +
    `${e.currencyCode.padEnd(8)} ${amountStr.padStart(16)} ` +
    `${String(e.addressCount).padStart(6)} addrs   ${e.action}`
  );
};

export const registerGetUnsweptBalancesTool = (server: McpServer) => {
  server.registerTool(
    'get_unswept_balances',
    {
      title: 'Get Unswept Balances',
      description:
        'Returns unswept (unsettled) balances across all wallets, broken down by blockchain and currency. ' +
        'Shows sweep readiness status for each entry (sweep, sweep_in_progress, sweep_not_allowed, no_balance).',
      inputSchema: schemas.input,
      outputSchema: schemas.output,
    },
    safeHandler(
      async () => {
        const allBalances = await getAddressBalances();

        // Filter out zero-balance entries
        const balances = allBalances.filter((e) => {
          const amount = parseFloat(e.amount);
          return amount > 0;
        });

        const walletIds = new Set(balances.map((e) => e.walletID));

        let message: string;
        if (balances.length === 0) {
          message = 'No unswept balances found. All addresses have zero balance.';
        } else {
          const header =
            `Unswept Balances (${balances.length} entries across ${walletIds.size} wallet(s)):\n\n` +
            `  ${'Wallet'.padEnd(24)} ${'Chain'.padEnd(10)} ${'Currency'.padEnd(8)} ${'Amount'.padStart(16)} ${'Addrs'.padStart(6)}         Action`;
          const separator = `  ${'─'.repeat(90)}`;
          const rows = balances.map(formatEntry).join('\n');
          message = `${header}\n${separator}\n${rows}`;
        }

        logger.info('Unswept balances fetched', {
          totalEntries: balances.length,
          wallets: walletIds.size,
        });

        return {
          content: [textContent(message)],
          structuredContent: {
            balances: balances.map((b) => ({ ...b })),
            totalWallets: walletIds.size,
          },
        };
      },
      { toolName: 'get_unswept_balances' },
    ),
  );
};
