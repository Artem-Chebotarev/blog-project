import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

import type {
    StateSchema,
    ThunkConfig,
    ReduxStoreWithManager,
    StateSchemaKey,
} from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
};

export type {
    StateSchema,
    ReduxStoreWithManager,
    StateSchemaKey,
    ThunkConfig,
    AppDispatch,
};
