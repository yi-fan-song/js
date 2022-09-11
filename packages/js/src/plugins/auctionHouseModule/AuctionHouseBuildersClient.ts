import {
  createAuctionHouseBuilder,
  CreateAuctionHouseBuilderParams,
} from './operations/createAuctionHouse';
import {
  createBidBuilder,
  CreateBidBuilderParams,
} from './operations/createBid';
import {
  createListingBuilder,
  CreateListingBuilderParams,
} from './operations/createListing';
import {
  executeSaleBuilder,
  ExecuteSaleBuilderParams,
} from './operations/executeSale';
import {
  updateAuctionHouseBuilder,
  UpdateAuctionHouseBuilderParams,
} from './operations/updateAuctionHouse';
import type { Metaplex as MetaplexType } from '@/Metaplex';

/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the Auction House module.
 *
 * @see {@link AuctionsClient}
 * @group Module Builders
 * */
export class AuctionHouseBuildersClient {
  constructor(protected readonly metaplex: MetaplexType) {}

  bid(input: CreateBidBuilderParams) {
    return createBidBuilder(this.metaplex, input);
  }

  createAuctionHouse(input: CreateAuctionHouseBuilderParams) {
    return createAuctionHouseBuilder(this.metaplex, input);
  }

  list(input: CreateListingBuilderParams) {
    return createListingBuilder(this.metaplex, input);
  }

  executeSale(input: ExecuteSaleBuilderParams) {
    return executeSaleBuilder(this.metaplex, input);
  }

  updateAuctionHouse(input: UpdateAuctionHouseBuilderParams) {
    return updateAuctionHouseBuilder(this.metaplex, input);
  }
}