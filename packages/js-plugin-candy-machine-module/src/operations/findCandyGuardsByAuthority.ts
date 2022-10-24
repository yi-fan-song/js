import { CandyGuard as MplCandyGuard } from '@metaplex-foundation/mpl-candy-guard';
import { PublicKey } from '@solana/web3.js';
import {
  GpaBuilder,
  Operation,
  OperationHandler,
  OperationScope,
  Metaplex,
} from '@metaplex-foundation/js-core';
import { CandyGuard, toCandyGuard } from '../models';
import { CandyGuardsSettings, DefaultCandyGuardSettings } from '../guards';

// -----------------
// Operation
// -----------------

const Key = 'FindCandyGuardsByAuthorityOperation' as const;

/**
 * Find all Candy Guards matching by a given authority.
 *
 * ```ts
 * const candyGuards = await metaplex
 *   .candyMachines()
 *   .findAllCandyGuardsByAuthority({ authority: new PublicKey('...') });
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export const findCandyGuardsByAuthorityOperation =
  _findCandyGuardsByAuthorityOperation;
// eslint-disable-next-line @typescript-eslint/naming-convention
function _findCandyGuardsByAuthorityOperation<
  T extends CandyGuardsSettings = DefaultCandyGuardSettings
>(
  input: FindCandyGuardsByAuthorityInput
): FindCandyGuardsByAuthorityOperation<T> {
  return { key: Key, input };
}
_findCandyGuardsByAuthorityOperation.key = Key;

/**
 * @group Operations
 * @category Types
 */
export type FindCandyGuardsByAuthorityOperation<
  T extends CandyGuardsSettings = DefaultCandyGuardSettings
> = Operation<typeof Key, FindCandyGuardsByAuthorityInput, CandyGuard<T>[]>;

/**
 * @group Operations
 * @category Inputs
 */
export type FindCandyGuardsByAuthorityInput = {
  /** The authority to filter Candy Guards by. */
  authority: PublicKey;
};

/**
 * @group Operations
 * @category Handlers
 */
export const findCandyGuardsByAuthorityOperationHandler: OperationHandler<FindCandyGuardsByAuthorityOperation> =
  {
    handle: async <T extends CandyGuardsSettings = DefaultCandyGuardSettings>(
      operation: FindCandyGuardsByAuthorityOperation<T>,
      metaplex: Metaplex,
      scope: OperationScope
    ) => {
      const { authority } = operation.input;
      const { programs, commitment } = scope;
      const candyGuardProgram = metaplex.programs().getCandyGuard(programs);
      const query = MplCandyGuard.gpaBuilder(
        candyGuardProgram.address
      ).addFilter('authority', authority);

      const gpaBuilder = new GpaBuilder(metaplex, candyGuardProgram.address);
      gpaBuilder.mergeConfig({ ...query.config, commitment });

      return gpaBuilder.getAndMap((account) => toCandyGuard(account, metaplex));
    },
  };