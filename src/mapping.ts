import { BigInt } from "@graphprotocol/graph-ts";
import {
  InsuranceRequestCreated,
  PoolUpdated,
} from "../generated/MacInsuranceMain/MacInsuranceMain";
import { PoolEntity, InsuranceRequestEntity } from "../generated/schema";

export function handleInsuranceRequestCreated(
  event: InsuranceRequestCreated
): void {
  let insuranceRequestEntity = InsuranceRequestEntity.load(
    event.transaction.from.toHex()
  );
  if (!insuranceRequestEntity) {
    insuranceRequestEntity = new InsuranceRequestEntity(
      event.transaction.from.toHex()
    );
  }
  insuranceRequestEntity.id =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  insuranceRequestEntity.createdAtTimestamp = event.block.timestamp;
  insuranceRequestEntity.poolId = event.params.poolId;
  insuranceRequestEntity.tokenAddress = event.params.tokenAddress;
  insuranceRequestEntity.insuranceRequester = event.params.insuranceRequester;
  insuranceRequestEntity.feeAmount = event.params.fee;
  insuranceRequestEntity.insuranceLiquidityRequest =
    event.params.liquidtyToInsure;
}

export function handlePoolUpdated(event: PoolUpdated): void {
  let poolEntity = PoolEntity.load(event.transaction.from.toHex());
  if (!poolEntity) {
    poolEntity = new PoolEntity(event.transaction.from.toHex());
  }

  const zero = BigInt.fromI32(0);
  let liquidityPool = event.params.liquidityAdded;
  if (liquidityPool == zero) {
    poolEntity.id =
      event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    poolEntity.createdAtTimestamp = event.block.timestamp;
    poolEntity.poolId = event.params.poolId;
    poolEntity.tokenAddress = event.params.tokenAddress;
    poolEntity.basePrice = event.params.basePrice;
    poolEntity.tresholdPrice = event.params.tresholdPrice;
    poolEntity.feePercentage = event.params.fee;
    poolEntity.insuranceLiquidityAdded = event.params.liquidityAdded;
    poolEntity.startDate = event.params.startDate;
    poolEntity.endDate = event.params.endDate;
    poolEntity.state = "created";

    poolEntity.save();
  } else {
    poolEntity.id =
      event.transaction.hash.toHex() + "-" + event.logIndex.toString();
    poolEntity.createdAtTimestamp = event.block.timestamp;
    poolEntity.poolId = event.params.poolId;
    poolEntity.tokenAddress = event.params.tokenAddress;
    poolEntity.basePrice = event.params.basePrice;
    poolEntity.tresholdPrice = event.params.tresholdPrice;
    poolEntity.feePercentage = event.params.fee;
    poolEntity.insuranceLiquidityAdded = event.params.liquidityAdded;
    poolEntity.startDate = event.params.startDate;
    poolEntity.endDate = event.params.endDate;
    poolEntity.state = "updated";

    poolEntity.save();
  }
}
