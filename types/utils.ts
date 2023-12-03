export type Callbacks<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export type OmitCallbacks<T> = Omit<T, Callbacks<T>>;
