
import { createDebug } from "./debug.js";

const debug = createDebug('try-catch')

export type OperationSuccess<T> = { error: null; data: T };
export type OperationFailure<E> = { error: E; data: null };
export type OperationResult<T, E> = OperationSuccess<T> | OperationFailure<E>;

type Identity<T> = {
  [Key in keyof T]: T[Key];
};

type Operation<T> = Promise<T> | (() => Promise<T>) | (() => T);
type OnFinally = (() => void) | (() => Promise<void>);
type TransformError<TError> = (options: Identity<TError>) => TError 
type Options<TError extends Error> = {
  transformError?: TransformError<TError>;
  onFinally?: OnFinally;
  debugFn?: (...args: unknown[]) => void
};

export function tryCatch<TResult, TError extends Error>(
  operation: Promise<TResult>,
  options?: Options<TError>
): Promise<OperationResult<TResult, TError>>;
export function tryCatch<TResult, TError extends Error>(
  operation: TResult,
  options?: Options<TError>
): Promise<OperationResult<TResult, TError>>;
export function tryCatch<TResult, TError extends Error>(
  operation: () => Promise<TResult>,
  options?: Options<TError>
): Promise<OperationResult<TResult, TError>>;
export function tryCatch<TResult, TError extends Error>(
  operation: Operation<TResult>,
  options?: Options<TError>
): OperationResult<TResult, TError> | Promise<OperationResult<TResult, TError>> {
  const opts = typeof options === "object" && options ? options : {};

  const transformError = opts?.transformError;
  const onFinally = opts?.onFinally;

  try {
    const result = typeof operation === "function" ? operation() : operation;

    if (isPromise(result)) {
      return Promise.resolve(result)
        .then((data) => onSuccess(data))
        .catch((error) => onFailure(error));
    }

    return onSuccess(result);
  } catch (error) {
    const err = error as TError
    debug(err)

    if (typeof transformError === "function") {
      return { error: transformError(err), data: null };
    }

    return onFailure<TError>(err);
  } finally {
    const cleanUp = typeof onFinally === "function" ? onFinally() : onFinally;

    Promise.resolve(cleanUp).then().catch(typeof options?.debugFn === 'function' ? options.debugFn : debug);
  }
}

const onSuccess = <T>(data: T): OperationSuccess<T> => {
  return { data, error: null };
};

const onFailure = <E extends Error>(error: unknown): OperationFailure<E> => {
  const message = String(error) || "Something went wrong";

  const errorParsed = error instanceof Error ? error : new Error(message);

  return { error: errorParsed as E, data: null };
};

const isPromise = <T = unknown>(value: unknown): value is Promise<T> => {
  return (
    !!value &&
    (typeof value === "object" || typeof value === "function") &&
    typeof (value as Promise<T>).then === "function"
  );
};
