import { EntitySelectorsFactory } from "@ngrx/data";
import { createSelector } from "@ngrx/store";
import * as fromIptvs from "../../store/iptv";
import { getCurrentParams } from "src/app/store/router/router.selectors";
import { IptvDto } from "../models/iptv-dto.model";

export const iptvselectors = new EntitySelectorsFactory().create<IptvDto>(
    fromIptvs.entityCollectionName
);

export const selectiptvs = createSelector(
    iptvselectors.selectEntities,
    (iptvEntities) => iptvEntities
);

export const selectediptvById = createSelector(
    getCurrentParams,
    iptvselectors.selectEntities,
    (params, iptvEntities) =>
        iptvEntities.find((u) => u.id == params["id"])
);