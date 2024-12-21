import { EntitySelectorsFactory } from "@ngrx/data";
import { createSelector } from "@ngrx/store";
import * as fromTdts from "../../store/tdt";
import { getCurrentParams } from "src/app/store/router/router.selectors";
import { TdtDto } from "../models/tdt-dto.model";

export const tdtselectors = new EntitySelectorsFactory().create<TdtDto>(
    fromTdts.entityCollectionName
);

export const selecttdts = createSelector(
    tdtselectors.selectEntities,
    (tdtEntities) => tdtEntities
);

export const selectedtdtById = createSelector(
    getCurrentParams,
    tdtselectors.selectEntities,
    (params, tdtEntities) =>
        tdtEntities.find((u) => u.id == params["id"])
);