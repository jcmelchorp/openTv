import { AppEffects } from '../effects/app.effects';
import { RouteEffects } from '../router/route.effects';
// import { SnackEffects } from '../effects/snack.effects';
// import { SpinnerEffects } from '../effects/spinner.effects';


export const registeredEffects = [
    AppEffects,
    RouteEffects,
    // SnackEffects,
    // SpinnerEffects,
];
export * from '../effects/app.effects';
export * from '../router/route.effects';
// export * from '../effects/snack.effects';
// export * from '../effects/spinner.effects';

