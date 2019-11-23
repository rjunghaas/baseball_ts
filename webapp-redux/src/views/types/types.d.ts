// wrap all of our types here
declare module "BaseballTypes" {
  import { StateType, ActionType } from "typesafe-actions";
  export type ReducerState = StateType<typeof import("../store/configureStore").default>;
  export type RootAction = ActionType<typeof import("../actions/nameSearch")>;
}
