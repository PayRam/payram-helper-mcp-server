/** Token pair returned by POST /api/v1/refresh */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/** Single payment record from payment search */
export interface PaymentData {
  projectName: string;
  blockId?: number;
  referenceId?: string;
  txHash?: string;
  fromAddress?: string;
  toAddress?: string;
  paymentStatus: string;
  currency?: string;
  network?: string;
  createdAt?: string;
  updatedAt?: string;
  invoiceId?: string;
  customerId?: string;
  email?: string;
  amountInUSD?: number;
  amount?: number;
  filledAmountInUSD?: number;
  filledAmount?: number;
  paymasterFee?: number;
  paymasterFeeInUSD?: number;
  onRamperFee?: number;
  onRamperFeeInUSD?: number;
  createdBy: string;
  trxTimestamp?: string;
  webhookStatus?: string;
}

/** Response from POST /api/v1/external-platform/{id}/payment/search */
export interface PaymentSearchResponse {
  data: PaymentData[];
  totalCount: number;
}

/** Response from POST /api/v1/external-platform/{id}/payment/summary */
export interface PaymentSummaryResponse {
  totalCount: number;
  closedCount: number;
  openCount: number;
  cancelledCount: number;
}

/** Single entry from GET /api/v1/addresses/balance */
export interface AddressBalanceEntry {
  walletName: string;
  walletID: number;
  blockchainCode: string;
  blockchainFamily: string;
  blockchainID: number;
  currencyCode: string;
  currencyAddress?: string;
  currencyID: number;
  amount: string;
  addressCount: number;
  startID: number;
  endID: number;
  action: string;
}

/** Request body for payment search */
export interface SearchParams {
  query?: string;
  paymentStatus?: string[];
  currency?: string[];
  network?: string[];
  dateFrom?: string;
  dateTo?: string;
  createdBy?: string[];
  webhookStatus?: string[];
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  externalPlatformIds?: number[];
  limit?: number;
  offset?: number;
}
