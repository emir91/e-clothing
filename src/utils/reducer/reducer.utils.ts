import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match: (action: AnyAction) => action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match: (action: AnyAction) => action.type === type,
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

interface Person {
  name: string;
  age: number;
}

interface Employee {
  company: string;
  jobTitle: string;
}

type PersonEmployee = Person & Employee;

const john: PersonEmployee = {
  name: "John",
  age: 30,
  company: "ABC Corp",
  jobTitle: "Software Engineer",
};

//export const createAction = (type, payload) => ({ type, payload });
