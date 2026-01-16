import { Injectable } from '@nestjs/common';
import {
  Contract,
  formatUnits,
  TransactionReceipt,
  WebSocketProvider,
} from 'ethers';
import { stats } from 'src/types';

import * as abi from '../abi.json';

@Injectable()
export class TransactionsService {
  address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
  transactionCounter: number;
  startTime: number;
  accumulator: bigint;
  provider: WebSocketProvider;

  constructor() {
    this.startTime = Date.now();
    this.accumulator = 0n;
    this.transactionCounter = 0;
    this.provider = new WebSocketProvider(
      `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
    );
    this.handleEvents();
  }

  /**
   * Handle 'Transfer' events from the blockchain
   * whilst application is running.
   */
  protected handleEvents(): void {
    // The Contract object
    const contract = new Contract(this.address, abi, this.provider);

    contract.on('Transfer', (from: string, to: string, value: bigint) => {
      this.transactionCounter++;
      // native bigint addition
      const sum = this.accumulator + value;

      console.log(
        `${from} -> ${to} ${formatUnits(
          value,
          'ether',
        )} DAI, accum: ${formatUnits(sum, 'ether')} DAI`,
      );
      this.accumulator = sum;
    });
  }

  /**
   * Get stats about DAI transactions.
   * @returns {stats}
   * @memberof Gateway
   **/
  getTotals(): stats {
    const result = {
      startTime: this.startTime,
      currentTime: Date.now(),
      totalTransactions: this.transactionCounter,
      totalDAITransactions:
        formatUnits(this.accumulator, 'ether') + ' DAI',
    };
    return result;
  }

  /**
   * Check if a transaction is a DAI transaction.
   * @param {string} id - transaction id
   * @returns {Promise<boolean>}
   * @memberof Gateway
   **/
  async isDAITransaction(id: string): Promise<boolean> {
    let tx;
    try {
      tx = await this.provider.getTransactionReceipt(id);
    } catch {
      return false;
    }
    return this.operationBelongsToDAI(tx);
  }

  /**
   * This should cover all DAI transactions, including those that are not part of the contract, e.g. Uniswap
   **/
  protected operationBelongsToDAI(
    tx?: TransactionReceipt | null,
  ): boolean {
    if (!tx) {
      return false; // transaction not found or pending
    }
    const logs = tx.logs.map((log) => log.address.toLocaleLowerCase());
    return logs.includes(this.address.toLocaleLowerCase());
  }
}
