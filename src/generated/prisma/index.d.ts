
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AuthProvider
 * 
 */
export type AuthProvider = $Result.DefaultSelection<Prisma.$AuthProviderPayload>
/**
 * Model BlacklistedToken
 * 
 */
export type BlacklistedToken = $Result.DefaultSelection<Prisma.$BlacklistedTokenPayload>
/**
 * Model Media
 * 
 */
export type Media = $Result.DefaultSelection<Prisma.$MediaPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserOIDCAccount
 * 
 */
export type UserOIDCAccount = $Result.DefaultSelection<Prisma.$UserOIDCAccountPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TokenType: {
  RefreshToken: 'RefreshToken',
  ActionToken: 'ActionToken'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const MediaType: {
  IMAGE: 'IMAGE',
  GIF: 'GIF',
  VIDEO: 'VIDEO'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const AccountLevel: {
  DEMO: 'DEMO',
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type AccountLevel = (typeof AccountLevel)[keyof typeof AccountLevel]

}

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type AccountLevel = $Enums.AccountLevel

export const AccountLevel: typeof $Enums.AccountLevel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AuthProviders
 * const authProviders = await prisma.authProvider.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AuthProviders
   * const authProviders = await prisma.authProvider.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Executes a typed SQL query and returns a typed result
   * @example
   * ```
   * import { myQuery } from '@prisma/client/sql'
   * 
   * const result = await prisma.$queryRawTyped(myQuery())
   * ```
   */
  $queryRawTyped<T>(typedSql: runtime.TypedSql<unknown[], T>): Prisma.PrismaPromise<T[]>

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.authProvider`: Exposes CRUD operations for the **AuthProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthProviders
    * const authProviders = await prisma.authProvider.findMany()
    * ```
    */
  get authProvider(): Prisma.AuthProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blacklistedToken`: Exposes CRUD operations for the **BlacklistedToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlacklistedTokens
    * const blacklistedTokens = await prisma.blacklistedToken.findMany()
    * ```
    */
  get blacklistedToken(): Prisma.BlacklistedTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.media`: Exposes CRUD operations for the **Media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.MediaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userOIDCAccount`: Exposes CRUD operations for the **UserOIDCAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOIDCAccounts
    * const userOIDCAccounts = await prisma.userOIDCAccount.findMany()
    * ```
    */
  get userOIDCAccount(): Prisma.UserOIDCAccountDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AuthProvider: 'AuthProvider',
    BlacklistedToken: 'BlacklistedToken',
    Media: 'Media',
    UserProfile: 'UserProfile',
    User: 'User',
    UserOIDCAccount: 'UserOIDCAccount'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "authProvider" | "blacklistedToken" | "media" | "userProfile" | "user" | "userOIDCAccount"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AuthProvider: {
        payload: Prisma.$AuthProviderPayload<ExtArgs>
        fields: Prisma.AuthProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findFirst: {
            args: Prisma.AuthProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findMany: {
            args: Prisma.AuthProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          create: {
            args: Prisma.AuthProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          createMany: {
            args: Prisma.AuthProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          delete: {
            args: Prisma.AuthProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          update: {
            args: Prisma.AuthProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          deleteMany: {
            args: Prisma.AuthProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          upsert: {
            args: Prisma.AuthProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          aggregate: {
            args: Prisma.AuthProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthProvider>
          }
          groupBy: {
            args: Prisma.AuthProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthProviderCountArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderCountAggregateOutputType> | number
          }
        }
      }
      BlacklistedToken: {
        payload: Prisma.$BlacklistedTokenPayload<ExtArgs>
        fields: Prisma.BlacklistedTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlacklistedTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlacklistedTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>
          }
          findFirst: {
            args: Prisma.BlacklistedTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlacklistedTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>
          }
          findMany: {
            args: Prisma.BlacklistedTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>[]
          }
          create: {
            args: Prisma.BlacklistedTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>
          }
          createMany: {
            args: Prisma.BlacklistedTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlacklistedTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>[]
          }
          delete: {
            args: Prisma.BlacklistedTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>
          }
          update: {
            args: Prisma.BlacklistedTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>
          }
          deleteMany: {
            args: Prisma.BlacklistedTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlacklistedTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlacklistedTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>[]
          }
          upsert: {
            args: Prisma.BlacklistedTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlacklistedTokenPayload>
          }
          aggregate: {
            args: Prisma.BlacklistedTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlacklistedToken>
          }
          groupBy: {
            args: Prisma.BlacklistedTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlacklistedTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlacklistedTokenCountArgs<ExtArgs>
            result: $Utils.Optional<BlacklistedTokenCountAggregateOutputType> | number
          }
        }
      }
      Media: {
        payload: Prisma.$MediaPayload<ExtArgs>
        fields: Prisma.MediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findFirst: {
            args: Prisma.MediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findMany: {
            args: Prisma.MediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          create: {
            args: Prisma.MediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          createMany: {
            args: Prisma.MediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          delete: {
            args: Prisma.MediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          update: {
            args: Prisma.MediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          deleteMany: {
            args: Prisma.MediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          upsert: {
            args: Prisma.MediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.MediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserOIDCAccount: {
        payload: Prisma.$UserOIDCAccountPayload<ExtArgs>
        fields: Prisma.UserOIDCAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserOIDCAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOIDCAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>
          }
          findFirst: {
            args: Prisma.UserOIDCAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOIDCAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>
          }
          findMany: {
            args: Prisma.UserOIDCAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>[]
          }
          create: {
            args: Prisma.UserOIDCAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>
          }
          createMany: {
            args: Prisma.UserOIDCAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserOIDCAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>[]
          }
          delete: {
            args: Prisma.UserOIDCAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>
          }
          update: {
            args: Prisma.UserOIDCAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>
          }
          deleteMany: {
            args: Prisma.UserOIDCAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserOIDCAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserOIDCAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>[]
          }
          upsert: {
            args: Prisma.UserOIDCAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOIDCAccountPayload>
          }
          aggregate: {
            args: Prisma.UserOIDCAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserOIDCAccount>
          }
          groupBy: {
            args: Prisma.UserOIDCAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserOIDCAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOIDCAccountCountArgs<ExtArgs>
            result: $Utils.Optional<UserOIDCAccountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRawTyped: {
          args: runtime.UnknownTypedSql,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    authProvider?: AuthProviderOmit
    blacklistedToken?: BlacklistedTokenOmit
    media?: MediaOmit
    userProfile?: UserProfileOmit
    user?: UserOmit
    userOIDCAccount?: UserOIDCAccountOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AuthProviderCountOutputType
   */

  export type AuthProviderCountOutputType = {
    accounts: number
  }

  export type AuthProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | AuthProviderCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * AuthProviderCountOutputType without action
   */
  export type AuthProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProviderCountOutputType
     */
    select?: AuthProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AuthProviderCountOutputType without action
   */
  export type AuthProviderCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOIDCAccountWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    openIds: number
    tokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    openIds?: boolean | UserCountOutputTypeCountOpenIdsArgs
    tokens?: boolean | UserCountOutputTypeCountTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOpenIdsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOIDCAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlacklistedTokenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AuthProvider
   */

  export type AggregateAuthProvider = {
    _count: AuthProviderCountAggregateOutputType | null
    _avg: AuthProviderAvgAggregateOutputType | null
    _sum: AuthProviderSumAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  export type AuthProviderAvgAggregateOutputType = {
    primaryKey: number | null
  }

  export type AuthProviderSumAggregateOutputType = {
    primaryKey: number | null
  }

  export type AuthProviderMinAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    key: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthProviderMaxAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    key: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthProviderCountAggregateOutputType = {
    primaryKey: number
    id: number
    key: number
    name: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthProviderAvgAggregateInputType = {
    primaryKey?: true
  }

  export type AuthProviderSumAggregateInputType = {
    primaryKey?: true
  }

  export type AuthProviderMinAggregateInputType = {
    primaryKey?: true
    id?: true
    key?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthProviderMaxAggregateInputType = {
    primaryKey?: true
    id?: true
    key?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthProviderCountAggregateInputType = {
    primaryKey?: true
    id?: true
    key?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProvider to aggregate.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthProviders
    **/
    _count?: true | AuthProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthProviderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthProviderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthProviderMaxAggregateInputType
  }

  export type GetAuthProviderAggregateType<T extends AuthProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthProvider[P]>
      : GetScalarType<T[P], AggregateAuthProvider[P]>
  }




  export type AuthProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthProviderWhereInput
    orderBy?: AuthProviderOrderByWithAggregationInput | AuthProviderOrderByWithAggregationInput[]
    by: AuthProviderScalarFieldEnum[] | AuthProviderScalarFieldEnum
    having?: AuthProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthProviderCountAggregateInputType | true
    _avg?: AuthProviderAvgAggregateInputType
    _sum?: AuthProviderSumAggregateInputType
    _min?: AuthProviderMinAggregateInputType
    _max?: AuthProviderMaxAggregateInputType
  }

  export type AuthProviderGroupByOutputType = {
    primaryKey: number
    id: string
    key: string
    name: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date | null
    _count: AuthProviderCountAggregateOutputType | null
    _avg: AuthProviderAvgAggregateOutputType | null
    _sum: AuthProviderSumAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  type GetAuthProviderGroupByPayload<T extends AuthProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
            : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
        }
      >
    >


  export type AuthProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | AuthProvider$accountsArgs<ExtArgs>
    _count?: boolean | AuthProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectScalar = {
    primaryKey?: boolean
    id?: boolean
    key?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"primaryKey" | "id" | "key" | "name" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["authProvider"]>
  export type AuthProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | AuthProvider$accountsArgs<ExtArgs>
    _count?: boolean | AuthProviderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AuthProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AuthProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AuthProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthProvider"
    objects: {
      accounts: Prisma.$UserOIDCAccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      primaryKey: number
      id: string
      key: string
      name: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["authProvider"]>
    composites: {}
  }

  type AuthProviderGetPayload<S extends boolean | null | undefined | AuthProviderDefaultArgs> = $Result.GetResult<Prisma.$AuthProviderPayload, S>

  type AuthProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthProviderCountAggregateInputType | true
    }

  export interface AuthProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthProvider'], meta: { name: 'AuthProvider' } }
    /**
     * Find zero or one AuthProvider that matches the filter.
     * @param {AuthProviderFindUniqueArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthProviderFindUniqueArgs>(args: SelectSubset<T, AuthProviderFindUniqueArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthProviderFindUniqueOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthProviderFindFirstArgs>(args?: SelectSubset<T, AuthProviderFindFirstArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthProviders
     * const authProviders = await prisma.authProvider.findMany()
     * 
     * // Get first 10 AuthProviders
     * const authProviders = await prisma.authProvider.findMany({ take: 10 })
     * 
     * // Only select the `primaryKey`
     * const authProviderWithPrimaryKeyOnly = await prisma.authProvider.findMany({ select: { primaryKey: true } })
     * 
     */
    findMany<T extends AuthProviderFindManyArgs>(args?: SelectSubset<T, AuthProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthProvider.
     * @param {AuthProviderCreateArgs} args - Arguments to create a AuthProvider.
     * @example
     * // Create one AuthProvider
     * const AuthProvider = await prisma.authProvider.create({
     *   data: {
     *     // ... data to create a AuthProvider
     *   }
     * })
     * 
     */
    create<T extends AuthProviderCreateArgs>(args: SelectSubset<T, AuthProviderCreateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthProviders.
     * @param {AuthProviderCreateManyArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthProviderCreateManyArgs>(args?: SelectSubset<T, AuthProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthProviders and returns the data saved in the database.
     * @param {AuthProviderCreateManyAndReturnArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthProviders and only return the `primaryKey`
     * const authProviderWithPrimaryKeyOnly = await prisma.authProvider.createManyAndReturn({
     *   select: { primaryKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthProvider.
     * @param {AuthProviderDeleteArgs} args - Arguments to delete one AuthProvider.
     * @example
     * // Delete one AuthProvider
     * const AuthProvider = await prisma.authProvider.delete({
     *   where: {
     *     // ... filter to delete one AuthProvider
     *   }
     * })
     * 
     */
    delete<T extends AuthProviderDeleteArgs>(args: SelectSubset<T, AuthProviderDeleteArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthProvider.
     * @param {AuthProviderUpdateArgs} args - Arguments to update one AuthProvider.
     * @example
     * // Update one AuthProvider
     * const authProvider = await prisma.authProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthProviderUpdateArgs>(args: SelectSubset<T, AuthProviderUpdateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthProviders.
     * @param {AuthProviderDeleteManyArgs} args - Arguments to filter AuthProviders to delete.
     * @example
     * // Delete a few AuthProviders
     * const { count } = await prisma.authProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthProviderDeleteManyArgs>(args?: SelectSubset<T, AuthProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthProviderUpdateManyArgs>(args: SelectSubset<T, AuthProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders and returns the data updated in the database.
     * @param {AuthProviderUpdateManyAndReturnArgs} args - Arguments to update many AuthProviders.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthProviders and only return the `primaryKey`
     * const authProviderWithPrimaryKeyOnly = await prisma.authProvider.updateManyAndReturn({
     *   select: { primaryKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthProvider.
     * @param {AuthProviderUpsertArgs} args - Arguments to update or create a AuthProvider.
     * @example
     * // Update or create a AuthProvider
     * const authProvider = await prisma.authProvider.upsert({
     *   create: {
     *     // ... data to create a AuthProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthProvider we want to update
     *   }
     * })
     */
    upsert<T extends AuthProviderUpsertArgs>(args: SelectSubset<T, AuthProviderUpsertArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderCountArgs} args - Arguments to filter AuthProviders to count.
     * @example
     * // Count the number of AuthProviders
     * const count = await prisma.authProvider.count({
     *   where: {
     *     // ... the filter for the AuthProviders we want to count
     *   }
     * })
    **/
    count<T extends AuthProviderCountArgs>(
      args?: Subset<T, AuthProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthProviderAggregateArgs>(args: Subset<T, AuthProviderAggregateArgs>): Prisma.PrismaPromise<GetAuthProviderAggregateType<T>>

    /**
     * Group by AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthProviderGroupByArgs['orderBy'] }
        : { orderBy?: AuthProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthProvider model
   */
  readonly fields: AuthProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends AuthProvider$accountsArgs<ExtArgs> = {}>(args?: Subset<T, AuthProvider$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthProvider model
   */
  interface AuthProviderFieldRefs {
    readonly primaryKey: FieldRef<"AuthProvider", 'Int'>
    readonly id: FieldRef<"AuthProvider", 'String'>
    readonly key: FieldRef<"AuthProvider", 'String'>
    readonly name: FieldRef<"AuthProvider", 'String'>
    readonly isActive: FieldRef<"AuthProvider", 'Boolean'>
    readonly createdAt: FieldRef<"AuthProvider", 'DateTime'>
    readonly updatedAt: FieldRef<"AuthProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthProvider findUnique
   */
  export type AuthProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findUniqueOrThrow
   */
  export type AuthProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findFirst
   */
  export type AuthProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findFirstOrThrow
   */
  export type AuthProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findMany
   */
  export type AuthProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProviders to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider create
   */
  export type AuthProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthProvider.
     */
    data: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
  }

  /**
   * AuthProvider createMany
   */
  export type AuthProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthProvider createManyAndReturn
   */
  export type AuthProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthProvider update
   */
  export type AuthProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthProvider.
     */
    data: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
    /**
     * Choose, which AuthProvider to update.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider updateMany
   */
  export type AuthProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
  }

  /**
   * AuthProvider updateManyAndReturn
   */
  export type AuthProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
  }

  /**
   * AuthProvider upsert
   */
  export type AuthProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthProvider to update in case it exists.
     */
    where: AuthProviderWhereUniqueInput
    /**
     * In case the AuthProvider found by the `where` argument doesn't exist, create a new AuthProvider with this data.
     */
    create: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
    /**
     * In case the AuthProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
  }

  /**
   * AuthProvider delete
   */
  export type AuthProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter which AuthProvider to delete.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider deleteMany
   */
  export type AuthProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProviders to delete
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to delete.
     */
    limit?: number
  }

  /**
   * AuthProvider.accounts
   */
  export type AuthProvider$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    where?: UserOIDCAccountWhereInput
    orderBy?: UserOIDCAccountOrderByWithRelationInput | UserOIDCAccountOrderByWithRelationInput[]
    cursor?: UserOIDCAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOIDCAccountScalarFieldEnum | UserOIDCAccountScalarFieldEnum[]
  }

  /**
   * AuthProvider without action
   */
  export type AuthProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
  }


  /**
   * Model BlacklistedToken
   */

  export type AggregateBlacklistedToken = {
    _count: BlacklistedTokenCountAggregateOutputType | null
    _avg: BlacklistedTokenAvgAggregateOutputType | null
    _sum: BlacklistedTokenSumAggregateOutputType | null
    _min: BlacklistedTokenMinAggregateOutputType | null
    _max: BlacklistedTokenMaxAggregateOutputType | null
  }

  export type BlacklistedTokenAvgAggregateOutputType = {
    primaryKey: number | null
    userPk: number | null
  }

  export type BlacklistedTokenSumAggregateOutputType = {
    primaryKey: number | null
    userPk: number | null
  }

  export type BlacklistedTokenMinAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    jwtId: string | null
    expiresAt: Date | null
    type: $Enums.TokenType | null
    userPk: number | null
  }

  export type BlacklistedTokenMaxAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    jwtId: string | null
    expiresAt: Date | null
    type: $Enums.TokenType | null
    userPk: number | null
  }

  export type BlacklistedTokenCountAggregateOutputType = {
    primaryKey: number
    id: number
    jwtId: number
    expiresAt: number
    type: number
    userPk: number
    _all: number
  }


  export type BlacklistedTokenAvgAggregateInputType = {
    primaryKey?: true
    userPk?: true
  }

  export type BlacklistedTokenSumAggregateInputType = {
    primaryKey?: true
    userPk?: true
  }

  export type BlacklistedTokenMinAggregateInputType = {
    primaryKey?: true
    id?: true
    jwtId?: true
    expiresAt?: true
    type?: true
    userPk?: true
  }

  export type BlacklistedTokenMaxAggregateInputType = {
    primaryKey?: true
    id?: true
    jwtId?: true
    expiresAt?: true
    type?: true
    userPk?: true
  }

  export type BlacklistedTokenCountAggregateInputType = {
    primaryKey?: true
    id?: true
    jwtId?: true
    expiresAt?: true
    type?: true
    userPk?: true
    _all?: true
  }

  export type BlacklistedTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlacklistedToken to aggregate.
     */
    where?: BlacklistedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlacklistedTokens to fetch.
     */
    orderBy?: BlacklistedTokenOrderByWithRelationInput | BlacklistedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlacklistedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlacklistedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlacklistedTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlacklistedTokens
    **/
    _count?: true | BlacklistedTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlacklistedTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlacklistedTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlacklistedTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlacklistedTokenMaxAggregateInputType
  }

  export type GetBlacklistedTokenAggregateType<T extends BlacklistedTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateBlacklistedToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlacklistedToken[P]>
      : GetScalarType<T[P], AggregateBlacklistedToken[P]>
  }




  export type BlacklistedTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlacklistedTokenWhereInput
    orderBy?: BlacklistedTokenOrderByWithAggregationInput | BlacklistedTokenOrderByWithAggregationInput[]
    by: BlacklistedTokenScalarFieldEnum[] | BlacklistedTokenScalarFieldEnum
    having?: BlacklistedTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlacklistedTokenCountAggregateInputType | true
    _avg?: BlacklistedTokenAvgAggregateInputType
    _sum?: BlacklistedTokenSumAggregateInputType
    _min?: BlacklistedTokenMinAggregateInputType
    _max?: BlacklistedTokenMaxAggregateInputType
  }

  export type BlacklistedTokenGroupByOutputType = {
    primaryKey: number
    id: string
    jwtId: string
    expiresAt: Date
    type: $Enums.TokenType
    userPk: number
    _count: BlacklistedTokenCountAggregateOutputType | null
    _avg: BlacklistedTokenAvgAggregateOutputType | null
    _sum: BlacklistedTokenSumAggregateOutputType | null
    _min: BlacklistedTokenMinAggregateOutputType | null
    _max: BlacklistedTokenMaxAggregateOutputType | null
  }

  type GetBlacklistedTokenGroupByPayload<T extends BlacklistedTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlacklistedTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlacklistedTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlacklistedTokenGroupByOutputType[P]>
            : GetScalarType<T[P], BlacklistedTokenGroupByOutputType[P]>
        }
      >
    >


  export type BlacklistedTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    jwtId?: boolean
    expiresAt?: boolean
    type?: boolean
    userPk?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blacklistedToken"]>

  export type BlacklistedTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    jwtId?: boolean
    expiresAt?: boolean
    type?: boolean
    userPk?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blacklistedToken"]>

  export type BlacklistedTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    jwtId?: boolean
    expiresAt?: boolean
    type?: boolean
    userPk?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blacklistedToken"]>

  export type BlacklistedTokenSelectScalar = {
    primaryKey?: boolean
    id?: boolean
    jwtId?: boolean
    expiresAt?: boolean
    type?: boolean
    userPk?: boolean
  }

  export type BlacklistedTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"primaryKey" | "id" | "jwtId" | "expiresAt" | "type" | "userPk", ExtArgs["result"]["blacklistedToken"]>
  export type BlacklistedTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BlacklistedTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BlacklistedTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BlacklistedTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlacklistedToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      primaryKey: number
      id: string
      jwtId: string
      expiresAt: Date
      type: $Enums.TokenType
      userPk: number
    }, ExtArgs["result"]["blacklistedToken"]>
    composites: {}
  }

  type BlacklistedTokenGetPayload<S extends boolean | null | undefined | BlacklistedTokenDefaultArgs> = $Result.GetResult<Prisma.$BlacklistedTokenPayload, S>

  type BlacklistedTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlacklistedTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlacklistedTokenCountAggregateInputType | true
    }

  export interface BlacklistedTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlacklistedToken'], meta: { name: 'BlacklistedToken' } }
    /**
     * Find zero or one BlacklistedToken that matches the filter.
     * @param {BlacklistedTokenFindUniqueArgs} args - Arguments to find a BlacklistedToken
     * @example
     * // Get one BlacklistedToken
     * const blacklistedToken = await prisma.blacklistedToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlacklistedTokenFindUniqueArgs>(args: SelectSubset<T, BlacklistedTokenFindUniqueArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlacklistedToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlacklistedTokenFindUniqueOrThrowArgs} args - Arguments to find a BlacklistedToken
     * @example
     * // Get one BlacklistedToken
     * const blacklistedToken = await prisma.blacklistedToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlacklistedTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, BlacklistedTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlacklistedToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenFindFirstArgs} args - Arguments to find a BlacklistedToken
     * @example
     * // Get one BlacklistedToken
     * const blacklistedToken = await prisma.blacklistedToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlacklistedTokenFindFirstArgs>(args?: SelectSubset<T, BlacklistedTokenFindFirstArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlacklistedToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenFindFirstOrThrowArgs} args - Arguments to find a BlacklistedToken
     * @example
     * // Get one BlacklistedToken
     * const blacklistedToken = await prisma.blacklistedToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlacklistedTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, BlacklistedTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlacklistedTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlacklistedTokens
     * const blacklistedTokens = await prisma.blacklistedToken.findMany()
     * 
     * // Get first 10 BlacklistedTokens
     * const blacklistedTokens = await prisma.blacklistedToken.findMany({ take: 10 })
     * 
     * // Only select the `primaryKey`
     * const blacklistedTokenWithPrimaryKeyOnly = await prisma.blacklistedToken.findMany({ select: { primaryKey: true } })
     * 
     */
    findMany<T extends BlacklistedTokenFindManyArgs>(args?: SelectSubset<T, BlacklistedTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlacklistedToken.
     * @param {BlacklistedTokenCreateArgs} args - Arguments to create a BlacklistedToken.
     * @example
     * // Create one BlacklistedToken
     * const BlacklistedToken = await prisma.blacklistedToken.create({
     *   data: {
     *     // ... data to create a BlacklistedToken
     *   }
     * })
     * 
     */
    create<T extends BlacklistedTokenCreateArgs>(args: SelectSubset<T, BlacklistedTokenCreateArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlacklistedTokens.
     * @param {BlacklistedTokenCreateManyArgs} args - Arguments to create many BlacklistedTokens.
     * @example
     * // Create many BlacklistedTokens
     * const blacklistedToken = await prisma.blacklistedToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlacklistedTokenCreateManyArgs>(args?: SelectSubset<T, BlacklistedTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlacklistedTokens and returns the data saved in the database.
     * @param {BlacklistedTokenCreateManyAndReturnArgs} args - Arguments to create many BlacklistedTokens.
     * @example
     * // Create many BlacklistedTokens
     * const blacklistedToken = await prisma.blacklistedToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlacklistedTokens and only return the `primaryKey`
     * const blacklistedTokenWithPrimaryKeyOnly = await prisma.blacklistedToken.createManyAndReturn({
     *   select: { primaryKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlacklistedTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, BlacklistedTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlacklistedToken.
     * @param {BlacklistedTokenDeleteArgs} args - Arguments to delete one BlacklistedToken.
     * @example
     * // Delete one BlacklistedToken
     * const BlacklistedToken = await prisma.blacklistedToken.delete({
     *   where: {
     *     // ... filter to delete one BlacklistedToken
     *   }
     * })
     * 
     */
    delete<T extends BlacklistedTokenDeleteArgs>(args: SelectSubset<T, BlacklistedTokenDeleteArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlacklistedToken.
     * @param {BlacklistedTokenUpdateArgs} args - Arguments to update one BlacklistedToken.
     * @example
     * // Update one BlacklistedToken
     * const blacklistedToken = await prisma.blacklistedToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlacklistedTokenUpdateArgs>(args: SelectSubset<T, BlacklistedTokenUpdateArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlacklistedTokens.
     * @param {BlacklistedTokenDeleteManyArgs} args - Arguments to filter BlacklistedTokens to delete.
     * @example
     * // Delete a few BlacklistedTokens
     * const { count } = await prisma.blacklistedToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlacklistedTokenDeleteManyArgs>(args?: SelectSubset<T, BlacklistedTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlacklistedTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlacklistedTokens
     * const blacklistedToken = await prisma.blacklistedToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlacklistedTokenUpdateManyArgs>(args: SelectSubset<T, BlacklistedTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlacklistedTokens and returns the data updated in the database.
     * @param {BlacklistedTokenUpdateManyAndReturnArgs} args - Arguments to update many BlacklistedTokens.
     * @example
     * // Update many BlacklistedTokens
     * const blacklistedToken = await prisma.blacklistedToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlacklistedTokens and only return the `primaryKey`
     * const blacklistedTokenWithPrimaryKeyOnly = await prisma.blacklistedToken.updateManyAndReturn({
     *   select: { primaryKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlacklistedTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, BlacklistedTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlacklistedToken.
     * @param {BlacklistedTokenUpsertArgs} args - Arguments to update or create a BlacklistedToken.
     * @example
     * // Update or create a BlacklistedToken
     * const blacklistedToken = await prisma.blacklistedToken.upsert({
     *   create: {
     *     // ... data to create a BlacklistedToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlacklistedToken we want to update
     *   }
     * })
     */
    upsert<T extends BlacklistedTokenUpsertArgs>(args: SelectSubset<T, BlacklistedTokenUpsertArgs<ExtArgs>>): Prisma__BlacklistedTokenClient<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlacklistedTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenCountArgs} args - Arguments to filter BlacklistedTokens to count.
     * @example
     * // Count the number of BlacklistedTokens
     * const count = await prisma.blacklistedToken.count({
     *   where: {
     *     // ... the filter for the BlacklistedTokens we want to count
     *   }
     * })
    **/
    count<T extends BlacklistedTokenCountArgs>(
      args?: Subset<T, BlacklistedTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlacklistedTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlacklistedToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlacklistedTokenAggregateArgs>(args: Subset<T, BlacklistedTokenAggregateArgs>): Prisma.PrismaPromise<GetBlacklistedTokenAggregateType<T>>

    /**
     * Group by BlacklistedToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlacklistedTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlacklistedTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlacklistedTokenGroupByArgs['orderBy'] }
        : { orderBy?: BlacklistedTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlacklistedTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlacklistedTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlacklistedToken model
   */
  readonly fields: BlacklistedTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlacklistedToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlacklistedTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlacklistedToken model
   */
  interface BlacklistedTokenFieldRefs {
    readonly primaryKey: FieldRef<"BlacklistedToken", 'Int'>
    readonly id: FieldRef<"BlacklistedToken", 'String'>
    readonly jwtId: FieldRef<"BlacklistedToken", 'String'>
    readonly expiresAt: FieldRef<"BlacklistedToken", 'DateTime'>
    readonly type: FieldRef<"BlacklistedToken", 'TokenType'>
    readonly userPk: FieldRef<"BlacklistedToken", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BlacklistedToken findUnique
   */
  export type BlacklistedTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * Filter, which BlacklistedToken to fetch.
     */
    where: BlacklistedTokenWhereUniqueInput
  }

  /**
   * BlacklistedToken findUniqueOrThrow
   */
  export type BlacklistedTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * Filter, which BlacklistedToken to fetch.
     */
    where: BlacklistedTokenWhereUniqueInput
  }

  /**
   * BlacklistedToken findFirst
   */
  export type BlacklistedTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * Filter, which BlacklistedToken to fetch.
     */
    where?: BlacklistedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlacklistedTokens to fetch.
     */
    orderBy?: BlacklistedTokenOrderByWithRelationInput | BlacklistedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlacklistedTokens.
     */
    cursor?: BlacklistedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlacklistedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlacklistedTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlacklistedTokens.
     */
    distinct?: BlacklistedTokenScalarFieldEnum | BlacklistedTokenScalarFieldEnum[]
  }

  /**
   * BlacklistedToken findFirstOrThrow
   */
  export type BlacklistedTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * Filter, which BlacklistedToken to fetch.
     */
    where?: BlacklistedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlacklistedTokens to fetch.
     */
    orderBy?: BlacklistedTokenOrderByWithRelationInput | BlacklistedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlacklistedTokens.
     */
    cursor?: BlacklistedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlacklistedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlacklistedTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlacklistedTokens.
     */
    distinct?: BlacklistedTokenScalarFieldEnum | BlacklistedTokenScalarFieldEnum[]
  }

  /**
   * BlacklistedToken findMany
   */
  export type BlacklistedTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * Filter, which BlacklistedTokens to fetch.
     */
    where?: BlacklistedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlacklistedTokens to fetch.
     */
    orderBy?: BlacklistedTokenOrderByWithRelationInput | BlacklistedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlacklistedTokens.
     */
    cursor?: BlacklistedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlacklistedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlacklistedTokens.
     */
    skip?: number
    distinct?: BlacklistedTokenScalarFieldEnum | BlacklistedTokenScalarFieldEnum[]
  }

  /**
   * BlacklistedToken create
   */
  export type BlacklistedTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a BlacklistedToken.
     */
    data: XOR<BlacklistedTokenCreateInput, BlacklistedTokenUncheckedCreateInput>
  }

  /**
   * BlacklistedToken createMany
   */
  export type BlacklistedTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlacklistedTokens.
     */
    data: BlacklistedTokenCreateManyInput | BlacklistedTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlacklistedToken createManyAndReturn
   */
  export type BlacklistedTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * The data used to create many BlacklistedTokens.
     */
    data: BlacklistedTokenCreateManyInput | BlacklistedTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlacklistedToken update
   */
  export type BlacklistedTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a BlacklistedToken.
     */
    data: XOR<BlacklistedTokenUpdateInput, BlacklistedTokenUncheckedUpdateInput>
    /**
     * Choose, which BlacklistedToken to update.
     */
    where: BlacklistedTokenWhereUniqueInput
  }

  /**
   * BlacklistedToken updateMany
   */
  export type BlacklistedTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlacklistedTokens.
     */
    data: XOR<BlacklistedTokenUpdateManyMutationInput, BlacklistedTokenUncheckedUpdateManyInput>
    /**
     * Filter which BlacklistedTokens to update
     */
    where?: BlacklistedTokenWhereInput
    /**
     * Limit how many BlacklistedTokens to update.
     */
    limit?: number
  }

  /**
   * BlacklistedToken updateManyAndReturn
   */
  export type BlacklistedTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * The data used to update BlacklistedTokens.
     */
    data: XOR<BlacklistedTokenUpdateManyMutationInput, BlacklistedTokenUncheckedUpdateManyInput>
    /**
     * Filter which BlacklistedTokens to update
     */
    where?: BlacklistedTokenWhereInput
    /**
     * Limit how many BlacklistedTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlacklistedToken upsert
   */
  export type BlacklistedTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the BlacklistedToken to update in case it exists.
     */
    where: BlacklistedTokenWhereUniqueInput
    /**
     * In case the BlacklistedToken found by the `where` argument doesn't exist, create a new BlacklistedToken with this data.
     */
    create: XOR<BlacklistedTokenCreateInput, BlacklistedTokenUncheckedCreateInput>
    /**
     * In case the BlacklistedToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlacklistedTokenUpdateInput, BlacklistedTokenUncheckedUpdateInput>
  }

  /**
   * BlacklistedToken delete
   */
  export type BlacklistedTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    /**
     * Filter which BlacklistedToken to delete.
     */
    where: BlacklistedTokenWhereUniqueInput
  }

  /**
   * BlacklistedToken deleteMany
   */
  export type BlacklistedTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlacklistedTokens to delete
     */
    where?: BlacklistedTokenWhereInput
    /**
     * Limit how many BlacklistedTokens to delete.
     */
    limit?: number
  }

  /**
   * BlacklistedToken without action
   */
  export type BlacklistedTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
  }


  /**
   * Model Media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaAvgAggregateOutputType = {
    primaryKey: number | null
    bytes: number | null
  }

  export type MediaSumAggregateOutputType = {
    primaryKey: number | null
    bytes: number | null
  }

  export type MediaMinAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    type: $Enums.MediaType | null
    filePath: string | null
    bytes: number | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type MediaMaxAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    type: $Enums.MediaType | null
    filePath: string | null
    bytes: number | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type MediaCountAggregateOutputType = {
    primaryKey: number
    id: number
    type: number
    filePath: number
    bytes: number
    url: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type MediaAvgAggregateInputType = {
    primaryKey?: true
    bytes?: true
  }

  export type MediaSumAggregateInputType = {
    primaryKey?: true
    bytes?: true
  }

  export type MediaMinAggregateInputType = {
    primaryKey?: true
    id?: true
    type?: true
    filePath?: true
    bytes?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type MediaMaxAggregateInputType = {
    primaryKey?: true
    id?: true
    type?: true
    filePath?: true
    bytes?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type MediaCountAggregateInputType = {
    primaryKey?: true
    id?: true
    type?: true
    filePath?: true
    bytes?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to aggregate.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type MediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithAggregationInput | MediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: MediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _avg?: MediaAvgAggregateInputType
    _sum?: MediaSumAggregateInputType
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    primaryKey: number
    id: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type MediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    type?: boolean
    filePath?: boolean
    bytes?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    userProfileAvatar?: boolean | Media$userProfileAvatarArgs<ExtArgs>
    userProfileBanner?: boolean | Media$userProfileBannerArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    type?: boolean
    filePath?: boolean
    bytes?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["media"]>

  export type MediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    type?: boolean
    filePath?: boolean
    bytes?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["media"]>

  export type MediaSelectScalar = {
    primaryKey?: boolean
    id?: boolean
    type?: boolean
    filePath?: boolean
    bytes?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type MediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"primaryKey" | "id" | "type" | "filePath" | "bytes" | "url" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["media"]>
  export type MediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userProfileAvatar?: boolean | Media$userProfileAvatarArgs<ExtArgs>
    userProfileBanner?: boolean | Media$userProfileBannerArgs<ExtArgs>
  }
  export type MediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Media"
    objects: {
      userProfileAvatar: Prisma.$UserProfilePayload<ExtArgs> | null
      userProfileBanner: Prisma.$UserProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      primaryKey: number
      id: string
      type: $Enums.MediaType
      filePath: string
      bytes: number
      url: string
      createdAt: Date
      updatedAt: Date | null
      deletedAt: Date | null
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = $Result.GetResult<Prisma.$MediaPayload, S>

  type MediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface MediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Media'], meta: { name: 'Media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {MediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFindUniqueArgs>(args: SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFindFirstArgs>(args?: SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `primaryKey`
     * const mediaWithPrimaryKeyOnly = await prisma.media.findMany({ select: { primaryKey: true } })
     * 
     */
    findMany<T extends MediaFindManyArgs>(args?: SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Media.
     * @param {MediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends MediaCreateArgs>(args: SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Media.
     * @param {MediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaCreateManyArgs>(args?: SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Media and returns the data saved in the database.
     * @param {MediaCreateManyAndReturnArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Media and only return the `primaryKey`
     * const mediaWithPrimaryKeyOnly = await prisma.media.createManyAndReturn({
     *   select: { primaryKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Media.
     * @param {MediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends MediaDeleteArgs>(args: SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Media.
     * @param {MediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUpdateArgs>(args: SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Media.
     * @param {MediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaDeleteManyArgs>(args?: SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUpdateManyArgs>(args: SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media and returns the data updated in the database.
     * @param {MediaUpdateManyAndReturnArgs} args - Arguments to update many Media.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Media and only return the `primaryKey`
     * const mediaWithPrimaryKeyOnly = await prisma.media.updateManyAndReturn({
     *   select: { primaryKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Media.
     * @param {MediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends MediaUpsertArgs>(args: SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends MediaCountArgs>(
      args?: Subset<T, MediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaGroupByArgs['orderBy'] }
        : { orderBy?: MediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Media model
   */
  readonly fields: MediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userProfileAvatar<T extends Media$userProfileAvatarArgs<ExtArgs> = {}>(args?: Subset<T, Media$userProfileAvatarArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    userProfileBanner<T extends Media$userProfileBannerArgs<ExtArgs> = {}>(args?: Subset<T, Media$userProfileBannerArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Media model
   */
  interface MediaFieldRefs {
    readonly primaryKey: FieldRef<"Media", 'Int'>
    readonly id: FieldRef<"Media", 'String'>
    readonly type: FieldRef<"Media", 'MediaType'>
    readonly filePath: FieldRef<"Media", 'String'>
    readonly bytes: FieldRef<"Media", 'Int'>
    readonly url: FieldRef<"Media", 'String'>
    readonly createdAt: FieldRef<"Media", 'DateTime'>
    readonly updatedAt: FieldRef<"Media", 'DateTime'>
    readonly deletedAt: FieldRef<"Media", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Media findUnique
   */
  export type MediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findUniqueOrThrow
   */
  export type MediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findFirst
   */
  export type MediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findFirstOrThrow
   */
  export type MediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findMany
   */
  export type MediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media create
   */
  export type MediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to create a Media.
     */
    data: XOR<MediaCreateInput, MediaUncheckedCreateInput>
  }

  /**
   * Media createMany
   */
  export type MediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Media createManyAndReturn
   */
  export type MediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Media update
   */
  export type MediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to update a Media.
     */
    data: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
    /**
     * Choose, which Media to update.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media updateMany
   */
  export type MediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
  }

  /**
   * Media updateManyAndReturn
   */
  export type MediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
  }

  /**
   * Media upsert
   */
  export type MediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The filter to search for the Media to update in case it exists.
     */
    where: MediaWhereUniqueInput
    /**
     * In case the Media found by the `where` argument doesn't exist, create a new Media with this data.
     */
    create: XOR<MediaCreateInput, MediaUncheckedCreateInput>
    /**
     * In case the Media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
  }

  /**
   * Media delete
   */
  export type MediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter which Media to delete.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media deleteMany
   */
  export type MediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to delete
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to delete.
     */
    limit?: number
  }

  /**
   * Media.userProfileAvatar
   */
  export type Media$userProfileAvatarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * Media.userProfileBanner
   */
  export type Media$userProfileBannerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * Media without action
   */
  export type MediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    primaryKey: number | null
    avatar_media_pk: number | null
    banner_media_pk: number | null
    userPk: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    primaryKey: number | null
    avatar_media_pk: number | null
    banner_media_pk: number | null
    userPk: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    displayName: string | null
    bio: string | null
    location: string | null
    birthday: Date | null
    website: string | null
    avatar_media_pk: number | null
    banner_media_pk: number | null
    userPk: number | null
  }

  export type UserProfileMaxAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    displayName: string | null
    bio: string | null
    location: string | null
    birthday: Date | null
    website: string | null
    avatar_media_pk: number | null
    banner_media_pk: number | null
    userPk: number | null
  }

  export type UserProfileCountAggregateOutputType = {
    primaryKey: number
    id: number
    displayName: number
    bio: number
    location: number
    birthday: number
    website: number
    avatar_media_pk: number
    banner_media_pk: number
    userPk: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    primaryKey?: true
    avatar_media_pk?: true
    banner_media_pk?: true
    userPk?: true
  }

  export type UserProfileSumAggregateInputType = {
    primaryKey?: true
    avatar_media_pk?: true
    banner_media_pk?: true
    userPk?: true
  }

  export type UserProfileMinAggregateInputType = {
    primaryKey?: true
    id?: true
    displayName?: true
    bio?: true
    location?: true
    birthday?: true
    website?: true
    avatar_media_pk?: true
    banner_media_pk?: true
    userPk?: true
  }

  export type UserProfileMaxAggregateInputType = {
    primaryKey?: true
    id?: true
    displayName?: true
    bio?: true
    location?: true
    birthday?: true
    website?: true
    avatar_media_pk?: true
    banner_media_pk?: true
    userPk?: true
  }

  export type UserProfileCountAggregateInputType = {
    primaryKey?: true
    id?: true
    displayName?: true
    bio?: true
    location?: true
    birthday?: true
    website?: true
    avatar_media_pk?: true
    banner_media_pk?: true
    userPk?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    primaryKey: number
    id: string
    displayName: string | null
    bio: string | null
    location: string | null
    birthday: Date | null
    website: string | null
    avatar_media_pk: number | null
    banner_media_pk: number | null
    userPk: number
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    displayName?: boolean
    bio?: boolean
    location?: boolean
    birthday?: boolean
    website?: boolean
    avatar_media_pk?: boolean
    banner_media_pk?: boolean
    userPk?: boolean
    avatar?: boolean | UserProfile$avatarArgs<ExtArgs>
    banner?: boolean | UserProfile$bannerArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    displayName?: boolean
    bio?: boolean
    location?: boolean
    birthday?: boolean
    website?: boolean
    avatar_media_pk?: boolean
    banner_media_pk?: boolean
    userPk?: boolean
    avatar?: boolean | UserProfile$avatarArgs<ExtArgs>
    banner?: boolean | UserProfile$bannerArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    displayName?: boolean
    bio?: boolean
    location?: boolean
    birthday?: boolean
    website?: boolean
    avatar_media_pk?: boolean
    banner_media_pk?: boolean
    userPk?: boolean
    avatar?: boolean | UserProfile$avatarArgs<ExtArgs>
    banner?: boolean | UserProfile$bannerArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    primaryKey?: boolean
    id?: boolean
    displayName?: boolean
    bio?: boolean
    location?: boolean
    birthday?: boolean
    website?: boolean
    avatar_media_pk?: boolean
    banner_media_pk?: boolean
    userPk?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"primaryKey" | "id" | "displayName" | "bio" | "location" | "birthday" | "website" | "avatar_media_pk" | "banner_media_pk" | "userPk", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | UserProfile$avatarArgs<ExtArgs>
    banner?: boolean | UserProfile$bannerArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | UserProfile$avatarArgs<ExtArgs>
    banner?: boolean | UserProfile$bannerArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | UserProfile$avatarArgs<ExtArgs>
    banner?: boolean | UserProfile$bannerArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      avatar: Prisma.$MediaPayload<ExtArgs> | null
      banner: Prisma.$MediaPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      primaryKey: number
      id: string
      displayName: string | null
      bio: string | null
      location: string | null
      birthday: Date | null
      website: string | null
      avatar_media_pk: number | null
      banner_media_pk: number | null
      userPk: number
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `primaryKey`
     * const userProfileWithPrimaryKeyOnly = await prisma.userProfile.findMany({ select: { primaryKey: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `primaryKey`
     * const userProfileWithPrimaryKeyOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { primaryKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `primaryKey`
     * const userProfileWithPrimaryKeyOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { primaryKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avatar<T extends UserProfile$avatarArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$avatarArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    banner<T extends UserProfile$bannerArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$bannerArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly primaryKey: FieldRef<"UserProfile", 'Int'>
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly displayName: FieldRef<"UserProfile", 'String'>
    readonly bio: FieldRef<"UserProfile", 'String'>
    readonly location: FieldRef<"UserProfile", 'String'>
    readonly birthday: FieldRef<"UserProfile", 'DateTime'>
    readonly website: FieldRef<"UserProfile", 'String'>
    readonly avatar_media_pk: FieldRef<"UserProfile", 'Int'>
    readonly banner_media_pk: FieldRef<"UserProfile", 'Int'>
    readonly userPk: FieldRef<"UserProfile", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile.avatar
   */
  export type UserProfile$avatarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
  }

  /**
   * UserProfile.banner
   */
  export type UserProfile$bannerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    primaryKey: number | null
  }

  export type UserSumAggregateOutputType = {
    primaryKey: number | null
  }

  export type UserMinAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    accountLevel: $Enums.AccountLevel | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    accountLevel: $Enums.AccountLevel | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    primaryKey: number
    id: number
    email: number
    username: number
    password: number
    accountLevel: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    primaryKey?: true
  }

  export type UserSumAggregateInputType = {
    primaryKey?: true
  }

  export type UserMinAggregateInputType = {
    primaryKey?: true
    id?: true
    email?: true
    username?: true
    password?: true
    accountLevel?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    primaryKey?: true
    id?: true
    email?: true
    username?: true
    password?: true
    accountLevel?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    primaryKey?: true
    id?: true
    email?: true
    username?: true
    password?: true
    accountLevel?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    primaryKey: number
    id: string
    email: string
    username: string
    password: string | null
    accountLevel: $Enums.AccountLevel
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    accountLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    openIds?: boolean | User$openIdsArgs<ExtArgs>
    tokens?: boolean | User$tokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    accountLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    accountLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    primaryKey?: boolean
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    accountLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"primaryKey" | "id" | "email" | "username" | "password" | "accountLevel" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    openIds?: boolean | User$openIdsArgs<ExtArgs>
    tokens?: boolean | User$tokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$UserProfilePayload<ExtArgs> | null
      openIds: Prisma.$UserOIDCAccountPayload<ExtArgs>[]
      tokens: Prisma.$BlacklistedTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      primaryKey: number
      id: string
      email: string
      username: string
      password: string | null
      accountLevel: $Enums.AccountLevel
      createdAt: Date
      updatedAt: Date | null
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `primaryKey`
     * const userWithPrimaryKeyOnly = await prisma.user.findMany({ select: { primaryKey: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `primaryKey`
     * const userWithPrimaryKeyOnly = await prisma.user.createManyAndReturn({
     *   select: { primaryKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `primaryKey`
     * const userWithPrimaryKeyOnly = await prisma.user.updateManyAndReturn({
     *   select: { primaryKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    openIds<T extends User$openIdsArgs<ExtArgs> = {}>(args?: Subset<T, User$openIdsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tokens<T extends User$tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlacklistedTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly primaryKey: FieldRef<"User", 'Int'>
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly accountLevel: FieldRef<"User", 'AccountLevel'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * User.openIds
   */
  export type User$openIdsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    where?: UserOIDCAccountWhereInput
    orderBy?: UserOIDCAccountOrderByWithRelationInput | UserOIDCAccountOrderByWithRelationInput[]
    cursor?: UserOIDCAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOIDCAccountScalarFieldEnum | UserOIDCAccountScalarFieldEnum[]
  }

  /**
   * User.tokens
   */
  export type User$tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlacklistedToken
     */
    select?: BlacklistedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlacklistedToken
     */
    omit?: BlacklistedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlacklistedTokenInclude<ExtArgs> | null
    where?: BlacklistedTokenWhereInput
    orderBy?: BlacklistedTokenOrderByWithRelationInput | BlacklistedTokenOrderByWithRelationInput[]
    cursor?: BlacklistedTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlacklistedTokenScalarFieldEnum | BlacklistedTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserOIDCAccount
   */

  export type AggregateUserOIDCAccount = {
    _count: UserOIDCAccountCountAggregateOutputType | null
    _avg: UserOIDCAccountAvgAggregateOutputType | null
    _sum: UserOIDCAccountSumAggregateOutputType | null
    _min: UserOIDCAccountMinAggregateOutputType | null
    _max: UserOIDCAccountMaxAggregateOutputType | null
  }

  export type UserOIDCAccountAvgAggregateOutputType = {
    primaryKey: number | null
    providerPk: number | null
    userPk: number | null
  }

  export type UserOIDCAccountSumAggregateOutputType = {
    primaryKey: number | null
    providerPk: number | null
    userPk: number | null
  }

  export type UserOIDCAccountMinAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    sub: string | null
    accessToken: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    providerPk: number | null
    userPk: number | null
  }

  export type UserOIDCAccountMaxAggregateOutputType = {
    primaryKey: number | null
    id: string | null
    sub: string | null
    accessToken: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    providerPk: number | null
    userPk: number | null
  }

  export type UserOIDCAccountCountAggregateOutputType = {
    primaryKey: number
    id: number
    sub: number
    accessToken: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    providerPk: number
    userPk: number
    _all: number
  }


  export type UserOIDCAccountAvgAggregateInputType = {
    primaryKey?: true
    providerPk?: true
    userPk?: true
  }

  export type UserOIDCAccountSumAggregateInputType = {
    primaryKey?: true
    providerPk?: true
    userPk?: true
  }

  export type UserOIDCAccountMinAggregateInputType = {
    primaryKey?: true
    id?: true
    sub?: true
    accessToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    providerPk?: true
    userPk?: true
  }

  export type UserOIDCAccountMaxAggregateInputType = {
    primaryKey?: true
    id?: true
    sub?: true
    accessToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    providerPk?: true
    userPk?: true
  }

  export type UserOIDCAccountCountAggregateInputType = {
    primaryKey?: true
    id?: true
    sub?: true
    accessToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    providerPk?: true
    userPk?: true
    _all?: true
  }

  export type UserOIDCAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOIDCAccount to aggregate.
     */
    where?: UserOIDCAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOIDCAccounts to fetch.
     */
    orderBy?: UserOIDCAccountOrderByWithRelationInput | UserOIDCAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOIDCAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOIDCAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOIDCAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOIDCAccounts
    **/
    _count?: true | UserOIDCAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserOIDCAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserOIDCAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOIDCAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOIDCAccountMaxAggregateInputType
  }

  export type GetUserOIDCAccountAggregateType<T extends UserOIDCAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOIDCAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOIDCAccount[P]>
      : GetScalarType<T[P], AggregateUserOIDCAccount[P]>
  }




  export type UserOIDCAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOIDCAccountWhereInput
    orderBy?: UserOIDCAccountOrderByWithAggregationInput | UserOIDCAccountOrderByWithAggregationInput[]
    by: UserOIDCAccountScalarFieldEnum[] | UserOIDCAccountScalarFieldEnum
    having?: UserOIDCAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOIDCAccountCountAggregateInputType | true
    _avg?: UserOIDCAccountAvgAggregateInputType
    _sum?: UserOIDCAccountSumAggregateInputType
    _min?: UserOIDCAccountMinAggregateInputType
    _max?: UserOIDCAccountMaxAggregateInputType
  }

  export type UserOIDCAccountGroupByOutputType = {
    primaryKey: number
    id: string
    sub: string
    accessToken: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date | null
    providerPk: number
    userPk: number
    _count: UserOIDCAccountCountAggregateOutputType | null
    _avg: UserOIDCAccountAvgAggregateOutputType | null
    _sum: UserOIDCAccountSumAggregateOutputType | null
    _min: UserOIDCAccountMinAggregateOutputType | null
    _max: UserOIDCAccountMaxAggregateOutputType | null
  }

  type GetUserOIDCAccountGroupByPayload<T extends UserOIDCAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserOIDCAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOIDCAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOIDCAccountGroupByOutputType[P]>
            : GetScalarType<T[P], UserOIDCAccountGroupByOutputType[P]>
        }
      >
    >


  export type UserOIDCAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    sub?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    providerPk?: boolean
    userPk?: boolean
    provider?: boolean | AuthProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOIDCAccount"]>

  export type UserOIDCAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    sub?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    providerPk?: boolean
    userPk?: boolean
    provider?: boolean | AuthProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOIDCAccount"]>

  export type UserOIDCAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    primaryKey?: boolean
    id?: boolean
    sub?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    providerPk?: boolean
    userPk?: boolean
    provider?: boolean | AuthProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOIDCAccount"]>

  export type UserOIDCAccountSelectScalar = {
    primaryKey?: boolean
    id?: boolean
    sub?: boolean
    accessToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    providerPk?: boolean
    userPk?: boolean
  }

  export type UserOIDCAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"primaryKey" | "id" | "sub" | "accessToken" | "avatarUrl" | "createdAt" | "updatedAt" | "providerPk" | "userPk", ExtArgs["result"]["userOIDCAccount"]>
  export type UserOIDCAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | AuthProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserOIDCAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | AuthProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserOIDCAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | AuthProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserOIDCAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserOIDCAccount"
    objects: {
      provider: Prisma.$AuthProviderPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      primaryKey: number
      id: string
      sub: string
      accessToken: string
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date | null
      providerPk: number
      userPk: number
    }, ExtArgs["result"]["userOIDCAccount"]>
    composites: {}
  }

  type UserOIDCAccountGetPayload<S extends boolean | null | undefined | UserOIDCAccountDefaultArgs> = $Result.GetResult<Prisma.$UserOIDCAccountPayload, S>

  type UserOIDCAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserOIDCAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserOIDCAccountCountAggregateInputType | true
    }

  export interface UserOIDCAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOIDCAccount'], meta: { name: 'UserOIDCAccount' } }
    /**
     * Find zero or one UserOIDCAccount that matches the filter.
     * @param {UserOIDCAccountFindUniqueArgs} args - Arguments to find a UserOIDCAccount
     * @example
     * // Get one UserOIDCAccount
     * const userOIDCAccount = await prisma.userOIDCAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserOIDCAccountFindUniqueArgs>(args: SelectSubset<T, UserOIDCAccountFindUniqueArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserOIDCAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserOIDCAccountFindUniqueOrThrowArgs} args - Arguments to find a UserOIDCAccount
     * @example
     * // Get one UserOIDCAccount
     * const userOIDCAccount = await prisma.userOIDCAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserOIDCAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, UserOIDCAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOIDCAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountFindFirstArgs} args - Arguments to find a UserOIDCAccount
     * @example
     * // Get one UserOIDCAccount
     * const userOIDCAccount = await prisma.userOIDCAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserOIDCAccountFindFirstArgs>(args?: SelectSubset<T, UserOIDCAccountFindFirstArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOIDCAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountFindFirstOrThrowArgs} args - Arguments to find a UserOIDCAccount
     * @example
     * // Get one UserOIDCAccount
     * const userOIDCAccount = await prisma.userOIDCAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserOIDCAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, UserOIDCAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserOIDCAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOIDCAccounts
     * const userOIDCAccounts = await prisma.userOIDCAccount.findMany()
     * 
     * // Get first 10 UserOIDCAccounts
     * const userOIDCAccounts = await prisma.userOIDCAccount.findMany({ take: 10 })
     * 
     * // Only select the `primaryKey`
     * const userOIDCAccountWithPrimaryKeyOnly = await prisma.userOIDCAccount.findMany({ select: { primaryKey: true } })
     * 
     */
    findMany<T extends UserOIDCAccountFindManyArgs>(args?: SelectSubset<T, UserOIDCAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserOIDCAccount.
     * @param {UserOIDCAccountCreateArgs} args - Arguments to create a UserOIDCAccount.
     * @example
     * // Create one UserOIDCAccount
     * const UserOIDCAccount = await prisma.userOIDCAccount.create({
     *   data: {
     *     // ... data to create a UserOIDCAccount
     *   }
     * })
     * 
     */
    create<T extends UserOIDCAccountCreateArgs>(args: SelectSubset<T, UserOIDCAccountCreateArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserOIDCAccounts.
     * @param {UserOIDCAccountCreateManyArgs} args - Arguments to create many UserOIDCAccounts.
     * @example
     * // Create many UserOIDCAccounts
     * const userOIDCAccount = await prisma.userOIDCAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserOIDCAccountCreateManyArgs>(args?: SelectSubset<T, UserOIDCAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserOIDCAccounts and returns the data saved in the database.
     * @param {UserOIDCAccountCreateManyAndReturnArgs} args - Arguments to create many UserOIDCAccounts.
     * @example
     * // Create many UserOIDCAccounts
     * const userOIDCAccount = await prisma.userOIDCAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserOIDCAccounts and only return the `primaryKey`
     * const userOIDCAccountWithPrimaryKeyOnly = await prisma.userOIDCAccount.createManyAndReturn({
     *   select: { primaryKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserOIDCAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, UserOIDCAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserOIDCAccount.
     * @param {UserOIDCAccountDeleteArgs} args - Arguments to delete one UserOIDCAccount.
     * @example
     * // Delete one UserOIDCAccount
     * const UserOIDCAccount = await prisma.userOIDCAccount.delete({
     *   where: {
     *     // ... filter to delete one UserOIDCAccount
     *   }
     * })
     * 
     */
    delete<T extends UserOIDCAccountDeleteArgs>(args: SelectSubset<T, UserOIDCAccountDeleteArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserOIDCAccount.
     * @param {UserOIDCAccountUpdateArgs} args - Arguments to update one UserOIDCAccount.
     * @example
     * // Update one UserOIDCAccount
     * const userOIDCAccount = await prisma.userOIDCAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserOIDCAccountUpdateArgs>(args: SelectSubset<T, UserOIDCAccountUpdateArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserOIDCAccounts.
     * @param {UserOIDCAccountDeleteManyArgs} args - Arguments to filter UserOIDCAccounts to delete.
     * @example
     * // Delete a few UserOIDCAccounts
     * const { count } = await prisma.userOIDCAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserOIDCAccountDeleteManyArgs>(args?: SelectSubset<T, UserOIDCAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOIDCAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOIDCAccounts
     * const userOIDCAccount = await prisma.userOIDCAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserOIDCAccountUpdateManyArgs>(args: SelectSubset<T, UserOIDCAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOIDCAccounts and returns the data updated in the database.
     * @param {UserOIDCAccountUpdateManyAndReturnArgs} args - Arguments to update many UserOIDCAccounts.
     * @example
     * // Update many UserOIDCAccounts
     * const userOIDCAccount = await prisma.userOIDCAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserOIDCAccounts and only return the `primaryKey`
     * const userOIDCAccountWithPrimaryKeyOnly = await prisma.userOIDCAccount.updateManyAndReturn({
     *   select: { primaryKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserOIDCAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, UserOIDCAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserOIDCAccount.
     * @param {UserOIDCAccountUpsertArgs} args - Arguments to update or create a UserOIDCAccount.
     * @example
     * // Update or create a UserOIDCAccount
     * const userOIDCAccount = await prisma.userOIDCAccount.upsert({
     *   create: {
     *     // ... data to create a UserOIDCAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOIDCAccount we want to update
     *   }
     * })
     */
    upsert<T extends UserOIDCAccountUpsertArgs>(args: SelectSubset<T, UserOIDCAccountUpsertArgs<ExtArgs>>): Prisma__UserOIDCAccountClient<$Result.GetResult<Prisma.$UserOIDCAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserOIDCAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountCountArgs} args - Arguments to filter UserOIDCAccounts to count.
     * @example
     * // Count the number of UserOIDCAccounts
     * const count = await prisma.userOIDCAccount.count({
     *   where: {
     *     // ... the filter for the UserOIDCAccounts we want to count
     *   }
     * })
    **/
    count<T extends UserOIDCAccountCountArgs>(
      args?: Subset<T, UserOIDCAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOIDCAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOIDCAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserOIDCAccountAggregateArgs>(args: Subset<T, UserOIDCAccountAggregateArgs>): Prisma.PrismaPromise<GetUserOIDCAccountAggregateType<T>>

    /**
     * Group by UserOIDCAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOIDCAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserOIDCAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOIDCAccountGroupByArgs['orderBy'] }
        : { orderBy?: UserOIDCAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserOIDCAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOIDCAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserOIDCAccount model
   */
  readonly fields: UserOIDCAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOIDCAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserOIDCAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provider<T extends AuthProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthProviderDefaultArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserOIDCAccount model
   */
  interface UserOIDCAccountFieldRefs {
    readonly primaryKey: FieldRef<"UserOIDCAccount", 'Int'>
    readonly id: FieldRef<"UserOIDCAccount", 'String'>
    readonly sub: FieldRef<"UserOIDCAccount", 'String'>
    readonly accessToken: FieldRef<"UserOIDCAccount", 'String'>
    readonly avatarUrl: FieldRef<"UserOIDCAccount", 'String'>
    readonly createdAt: FieldRef<"UserOIDCAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"UserOIDCAccount", 'DateTime'>
    readonly providerPk: FieldRef<"UserOIDCAccount", 'Int'>
    readonly userPk: FieldRef<"UserOIDCAccount", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserOIDCAccount findUnique
   */
  export type UserOIDCAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserOIDCAccount to fetch.
     */
    where: UserOIDCAccountWhereUniqueInput
  }

  /**
   * UserOIDCAccount findUniqueOrThrow
   */
  export type UserOIDCAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserOIDCAccount to fetch.
     */
    where: UserOIDCAccountWhereUniqueInput
  }

  /**
   * UserOIDCAccount findFirst
   */
  export type UserOIDCAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserOIDCAccount to fetch.
     */
    where?: UserOIDCAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOIDCAccounts to fetch.
     */
    orderBy?: UserOIDCAccountOrderByWithRelationInput | UserOIDCAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOIDCAccounts.
     */
    cursor?: UserOIDCAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOIDCAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOIDCAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOIDCAccounts.
     */
    distinct?: UserOIDCAccountScalarFieldEnum | UserOIDCAccountScalarFieldEnum[]
  }

  /**
   * UserOIDCAccount findFirstOrThrow
   */
  export type UserOIDCAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserOIDCAccount to fetch.
     */
    where?: UserOIDCAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOIDCAccounts to fetch.
     */
    orderBy?: UserOIDCAccountOrderByWithRelationInput | UserOIDCAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOIDCAccounts.
     */
    cursor?: UserOIDCAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOIDCAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOIDCAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOIDCAccounts.
     */
    distinct?: UserOIDCAccountScalarFieldEnum | UserOIDCAccountScalarFieldEnum[]
  }

  /**
   * UserOIDCAccount findMany
   */
  export type UserOIDCAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserOIDCAccounts to fetch.
     */
    where?: UserOIDCAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOIDCAccounts to fetch.
     */
    orderBy?: UserOIDCAccountOrderByWithRelationInput | UserOIDCAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOIDCAccounts.
     */
    cursor?: UserOIDCAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOIDCAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOIDCAccounts.
     */
    skip?: number
    distinct?: UserOIDCAccountScalarFieldEnum | UserOIDCAccountScalarFieldEnum[]
  }

  /**
   * UserOIDCAccount create
   */
  export type UserOIDCAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOIDCAccount.
     */
    data: XOR<UserOIDCAccountCreateInput, UserOIDCAccountUncheckedCreateInput>
  }

  /**
   * UserOIDCAccount createMany
   */
  export type UserOIDCAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOIDCAccounts.
     */
    data: UserOIDCAccountCreateManyInput | UserOIDCAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserOIDCAccount createManyAndReturn
   */
  export type UserOIDCAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * The data used to create many UserOIDCAccounts.
     */
    data: UserOIDCAccountCreateManyInput | UserOIDCAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserOIDCAccount update
   */
  export type UserOIDCAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOIDCAccount.
     */
    data: XOR<UserOIDCAccountUpdateInput, UserOIDCAccountUncheckedUpdateInput>
    /**
     * Choose, which UserOIDCAccount to update.
     */
    where: UserOIDCAccountWhereUniqueInput
  }

  /**
   * UserOIDCAccount updateMany
   */
  export type UserOIDCAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOIDCAccounts.
     */
    data: XOR<UserOIDCAccountUpdateManyMutationInput, UserOIDCAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserOIDCAccounts to update
     */
    where?: UserOIDCAccountWhereInput
    /**
     * Limit how many UserOIDCAccounts to update.
     */
    limit?: number
  }

  /**
   * UserOIDCAccount updateManyAndReturn
   */
  export type UserOIDCAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * The data used to update UserOIDCAccounts.
     */
    data: XOR<UserOIDCAccountUpdateManyMutationInput, UserOIDCAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserOIDCAccounts to update
     */
    where?: UserOIDCAccountWhereInput
    /**
     * Limit how many UserOIDCAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserOIDCAccount upsert
   */
  export type UserOIDCAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOIDCAccount to update in case it exists.
     */
    where: UserOIDCAccountWhereUniqueInput
    /**
     * In case the UserOIDCAccount found by the `where` argument doesn't exist, create a new UserOIDCAccount with this data.
     */
    create: XOR<UserOIDCAccountCreateInput, UserOIDCAccountUncheckedCreateInput>
    /**
     * In case the UserOIDCAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOIDCAccountUpdateInput, UserOIDCAccountUncheckedUpdateInput>
  }

  /**
   * UserOIDCAccount delete
   */
  export type UserOIDCAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
    /**
     * Filter which UserOIDCAccount to delete.
     */
    where: UserOIDCAccountWhereUniqueInput
  }

  /**
   * UserOIDCAccount deleteMany
   */
  export type UserOIDCAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOIDCAccounts to delete
     */
    where?: UserOIDCAccountWhereInput
    /**
     * Limit how many UserOIDCAccounts to delete.
     */
    limit?: number
  }

  /**
   * UserOIDCAccount without action
   */
  export type UserOIDCAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOIDCAccount
     */
    select?: UserOIDCAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOIDCAccount
     */
    omit?: UserOIDCAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOIDCAccountInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AuthProviderScalarFieldEnum: {
    primaryKey: 'primaryKey',
    id: 'id',
    key: 'key',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthProviderScalarFieldEnum = (typeof AuthProviderScalarFieldEnum)[keyof typeof AuthProviderScalarFieldEnum]


  export const BlacklistedTokenScalarFieldEnum: {
    primaryKey: 'primaryKey',
    id: 'id',
    jwtId: 'jwtId',
    expiresAt: 'expiresAt',
    type: 'type',
    userPk: 'userPk'
  };

  export type BlacklistedTokenScalarFieldEnum = (typeof BlacklistedTokenScalarFieldEnum)[keyof typeof BlacklistedTokenScalarFieldEnum]


  export const MediaScalarFieldEnum: {
    primaryKey: 'primaryKey',
    id: 'id',
    type: 'type',
    filePath: 'filePath',
    bytes: 'bytes',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    primaryKey: 'primaryKey',
    id: 'id',
    displayName: 'displayName',
    bio: 'bio',
    location: 'location',
    birthday: 'birthday',
    website: 'website',
    avatar_media_pk: 'avatar_media_pk',
    banner_media_pk: 'banner_media_pk',
    userPk: 'userPk'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const UserScalarFieldEnum: {
    primaryKey: 'primaryKey',
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    accountLevel: 'accountLevel',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserOIDCAccountScalarFieldEnum: {
    primaryKey: 'primaryKey',
    id: 'id',
    sub: 'sub',
    accessToken: 'accessToken',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    providerPk: 'providerPk',
    userPk: 'userPk'
  };

  export type UserOIDCAccountScalarFieldEnum = (typeof UserOIDCAccountScalarFieldEnum)[keyof typeof UserOIDCAccountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    


  /**
   * Reference to a field of type 'AccountLevel'
   */
  export type EnumAccountLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountLevel'>
    


  /**
   * Reference to a field of type 'AccountLevel[]'
   */
  export type ListEnumAccountLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountLevel[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AuthProviderWhereInput = {
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    primaryKey?: IntFilter<"AuthProvider"> | number
    id?: UuidFilter<"AuthProvider"> | string
    key?: StringFilter<"AuthProvider"> | string
    name?: StringFilter<"AuthProvider"> | string
    isActive?: BoolFilter<"AuthProvider"> | boolean
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    updatedAt?: DateTimeNullableFilter<"AuthProvider"> | Date | string | null
    accounts?: UserOIDCAccountListRelationFilter
  }

  export type AuthProviderOrderByWithRelationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    accounts?: UserOIDCAccountOrderByRelationAggregateInput
  }

  export type AuthProviderWhereUniqueInput = Prisma.AtLeast<{
    primaryKey?: number
    id?: string
    key?: string
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    name?: StringFilter<"AuthProvider"> | string
    isActive?: BoolFilter<"AuthProvider"> | boolean
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    updatedAt?: DateTimeNullableFilter<"AuthProvider"> | Date | string | null
    accounts?: UserOIDCAccountListRelationFilter
  }, "primaryKey" | "id" | "key">

  export type AuthProviderOrderByWithAggregationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: AuthProviderCountOrderByAggregateInput
    _avg?: AuthProviderAvgOrderByAggregateInput
    _max?: AuthProviderMaxOrderByAggregateInput
    _min?: AuthProviderMinOrderByAggregateInput
    _sum?: AuthProviderSumOrderByAggregateInput
  }

  export type AuthProviderScalarWhereWithAggregatesInput = {
    AND?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    OR?: AuthProviderScalarWhereWithAggregatesInput[]
    NOT?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    primaryKey?: IntWithAggregatesFilter<"AuthProvider"> | number
    id?: UuidWithAggregatesFilter<"AuthProvider"> | string
    key?: StringWithAggregatesFilter<"AuthProvider"> | string
    name?: StringWithAggregatesFilter<"AuthProvider"> | string
    isActive?: BoolWithAggregatesFilter<"AuthProvider"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"AuthProvider"> | Date | string | null
  }

  export type BlacklistedTokenWhereInput = {
    AND?: BlacklistedTokenWhereInput | BlacklistedTokenWhereInput[]
    OR?: BlacklistedTokenWhereInput[]
    NOT?: BlacklistedTokenWhereInput | BlacklistedTokenWhereInput[]
    primaryKey?: IntFilter<"BlacklistedToken"> | number
    id?: UuidFilter<"BlacklistedToken"> | string
    jwtId?: StringFilter<"BlacklistedToken"> | string
    expiresAt?: DateTimeFilter<"BlacklistedToken"> | Date | string
    type?: EnumTokenTypeFilter<"BlacklistedToken"> | $Enums.TokenType
    userPk?: IntFilter<"BlacklistedToken"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BlacklistedTokenOrderByWithRelationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    jwtId?: SortOrder
    expiresAt?: SortOrder
    type?: SortOrder
    userPk?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BlacklistedTokenWhereUniqueInput = Prisma.AtLeast<{
    primaryKey?: number
    id?: string
    jwtId?: string
    AND?: BlacklistedTokenWhereInput | BlacklistedTokenWhereInput[]
    OR?: BlacklistedTokenWhereInput[]
    NOT?: BlacklistedTokenWhereInput | BlacklistedTokenWhereInput[]
    expiresAt?: DateTimeFilter<"BlacklistedToken"> | Date | string
    type?: EnumTokenTypeFilter<"BlacklistedToken"> | $Enums.TokenType
    userPk?: IntFilter<"BlacklistedToken"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "primaryKey" | "id" | "jwtId">

  export type BlacklistedTokenOrderByWithAggregationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    jwtId?: SortOrder
    expiresAt?: SortOrder
    type?: SortOrder
    userPk?: SortOrder
    _count?: BlacklistedTokenCountOrderByAggregateInput
    _avg?: BlacklistedTokenAvgOrderByAggregateInput
    _max?: BlacklistedTokenMaxOrderByAggregateInput
    _min?: BlacklistedTokenMinOrderByAggregateInput
    _sum?: BlacklistedTokenSumOrderByAggregateInput
  }

  export type BlacklistedTokenScalarWhereWithAggregatesInput = {
    AND?: BlacklistedTokenScalarWhereWithAggregatesInput | BlacklistedTokenScalarWhereWithAggregatesInput[]
    OR?: BlacklistedTokenScalarWhereWithAggregatesInput[]
    NOT?: BlacklistedTokenScalarWhereWithAggregatesInput | BlacklistedTokenScalarWhereWithAggregatesInput[]
    primaryKey?: IntWithAggregatesFilter<"BlacklistedToken"> | number
    id?: UuidWithAggregatesFilter<"BlacklistedToken"> | string
    jwtId?: StringWithAggregatesFilter<"BlacklistedToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"BlacklistedToken"> | Date | string
    type?: EnumTokenTypeWithAggregatesFilter<"BlacklistedToken"> | $Enums.TokenType
    userPk?: IntWithAggregatesFilter<"BlacklistedToken"> | number
  }

  export type MediaWhereInput = {
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    primaryKey?: IntFilter<"Media"> | number
    id?: UuidFilter<"Media"> | string
    type?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    filePath?: StringFilter<"Media"> | string
    bytes?: IntFilter<"Media"> | number
    url?: StringFilter<"Media"> | string
    createdAt?: DateTimeFilter<"Media"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Media"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Media"> | Date | string | null
    userProfileAvatar?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    userProfileBanner?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
  }

  export type MediaOrderByWithRelationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    type?: SortOrder
    filePath?: SortOrder
    bytes?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    userProfileAvatar?: UserProfileOrderByWithRelationInput
    userProfileBanner?: UserProfileOrderByWithRelationInput
  }

  export type MediaWhereUniqueInput = Prisma.AtLeast<{
    primaryKey?: number
    id?: string
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    type?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    filePath?: StringFilter<"Media"> | string
    bytes?: IntFilter<"Media"> | number
    url?: StringFilter<"Media"> | string
    createdAt?: DateTimeFilter<"Media"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Media"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Media"> | Date | string | null
    userProfileAvatar?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    userProfileBanner?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
  }, "primaryKey" | "id">

  export type MediaOrderByWithAggregationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    type?: SortOrder
    filePath?: SortOrder
    bytes?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: MediaCountOrderByAggregateInput
    _avg?: MediaAvgOrderByAggregateInput
    _max?: MediaMaxOrderByAggregateInput
    _min?: MediaMinOrderByAggregateInput
    _sum?: MediaSumOrderByAggregateInput
  }

  export type MediaScalarWhereWithAggregatesInput = {
    AND?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    OR?: MediaScalarWhereWithAggregatesInput[]
    NOT?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    primaryKey?: IntWithAggregatesFilter<"Media"> | number
    id?: UuidWithAggregatesFilter<"Media"> | string
    type?: EnumMediaTypeWithAggregatesFilter<"Media"> | $Enums.MediaType
    filePath?: StringWithAggregatesFilter<"Media"> | string
    bytes?: IntWithAggregatesFilter<"Media"> | number
    url?: StringWithAggregatesFilter<"Media"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Media"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Media"> | Date | string | null
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    primaryKey?: IntFilter<"UserProfile"> | number
    id?: UuidFilter<"UserProfile"> | string
    displayName?: StringNullableFilter<"UserProfile"> | string | null
    bio?: StringNullableFilter<"UserProfile"> | string | null
    location?: StringNullableFilter<"UserProfile"> | string | null
    birthday?: DateTimeNullableFilter<"UserProfile"> | Date | string | null
    website?: StringNullableFilter<"UserProfile"> | string | null
    avatar_media_pk?: IntNullableFilter<"UserProfile"> | number | null
    banner_media_pk?: IntNullableFilter<"UserProfile"> | number | null
    userPk?: IntFilter<"UserProfile"> | number
    avatar?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    banner?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserProfileOrderByWithRelationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    displayName?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    avatar_media_pk?: SortOrderInput | SortOrder
    banner_media_pk?: SortOrderInput | SortOrder
    userPk?: SortOrder
    avatar?: MediaOrderByWithRelationInput
    banner?: MediaOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    primaryKey?: number
    id?: string
    avatar_media_pk?: number
    banner_media_pk?: number
    userPk?: number
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    displayName?: StringNullableFilter<"UserProfile"> | string | null
    bio?: StringNullableFilter<"UserProfile"> | string | null
    location?: StringNullableFilter<"UserProfile"> | string | null
    birthday?: DateTimeNullableFilter<"UserProfile"> | Date | string | null
    website?: StringNullableFilter<"UserProfile"> | string | null
    avatar?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    banner?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "primaryKey" | "id" | "avatar_media_pk" | "banner_media_pk" | "userPk">

  export type UserProfileOrderByWithAggregationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    displayName?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    avatar_media_pk?: SortOrderInput | SortOrder
    banner_media_pk?: SortOrderInput | SortOrder
    userPk?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    primaryKey?: IntWithAggregatesFilter<"UserProfile"> | number
    id?: UuidWithAggregatesFilter<"UserProfile"> | string
    displayName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    location?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    birthday?: DateTimeNullableWithAggregatesFilter<"UserProfile"> | Date | string | null
    website?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    avatar_media_pk?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    banner_media_pk?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    userPk?: IntWithAggregatesFilter<"UserProfile"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    primaryKey?: IntFilter<"User"> | number
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    accountLevel?: EnumAccountLevelFilter<"User"> | $Enums.AccountLevel
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    profile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    openIds?: UserOIDCAccountListRelationFilter
    tokens?: BlacklistedTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrderInput | SortOrder
    accountLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    profile?: UserProfileOrderByWithRelationInput
    openIds?: UserOIDCAccountOrderByRelationAggregateInput
    tokens?: BlacklistedTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    primaryKey?: number
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    accountLevel?: EnumAccountLevelFilter<"User"> | $Enums.AccountLevel
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    profile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    openIds?: UserOIDCAccountListRelationFilter
    tokens?: BlacklistedTokenListRelationFilter
  }, "primaryKey" | "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrderInput | SortOrder
    accountLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    primaryKey?: IntWithAggregatesFilter<"User"> | number
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    accountLevel?: EnumAccountLevelWithAggregatesFilter<"User"> | $Enums.AccountLevel
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type UserOIDCAccountWhereInput = {
    AND?: UserOIDCAccountWhereInput | UserOIDCAccountWhereInput[]
    OR?: UserOIDCAccountWhereInput[]
    NOT?: UserOIDCAccountWhereInput | UserOIDCAccountWhereInput[]
    primaryKey?: IntFilter<"UserOIDCAccount"> | number
    id?: UuidFilter<"UserOIDCAccount"> | string
    sub?: StringFilter<"UserOIDCAccount"> | string
    accessToken?: StringFilter<"UserOIDCAccount"> | string
    avatarUrl?: StringNullableFilter<"UserOIDCAccount"> | string | null
    createdAt?: DateTimeFilter<"UserOIDCAccount"> | Date | string
    updatedAt?: DateTimeNullableFilter<"UserOIDCAccount"> | Date | string | null
    providerPk?: IntFilter<"UserOIDCAccount"> | number
    userPk?: IntFilter<"UserOIDCAccount"> | number
    provider?: XOR<AuthProviderScalarRelationFilter, AuthProviderWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserOIDCAccountOrderByWithRelationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    sub?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
    provider?: AuthProviderOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserOIDCAccountWhereUniqueInput = Prisma.AtLeast<{
    primaryKey?: number
    id?: string
    providerPk_userPk?: UserOIDCAccountProviderPkUserPkCompoundUniqueInput
    providerPk_sub?: UserOIDCAccountProviderPkSubCompoundUniqueInput
    AND?: UserOIDCAccountWhereInput | UserOIDCAccountWhereInput[]
    OR?: UserOIDCAccountWhereInput[]
    NOT?: UserOIDCAccountWhereInput | UserOIDCAccountWhereInput[]
    sub?: StringFilter<"UserOIDCAccount"> | string
    accessToken?: StringFilter<"UserOIDCAccount"> | string
    avatarUrl?: StringNullableFilter<"UserOIDCAccount"> | string | null
    createdAt?: DateTimeFilter<"UserOIDCAccount"> | Date | string
    updatedAt?: DateTimeNullableFilter<"UserOIDCAccount"> | Date | string | null
    providerPk?: IntFilter<"UserOIDCAccount"> | number
    userPk?: IntFilter<"UserOIDCAccount"> | number
    provider?: XOR<AuthProviderScalarRelationFilter, AuthProviderWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "primaryKey" | "id" | "providerPk_userPk" | "providerPk_sub">

  export type UserOIDCAccountOrderByWithAggregationInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    sub?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
    _count?: UserOIDCAccountCountOrderByAggregateInput
    _avg?: UserOIDCAccountAvgOrderByAggregateInput
    _max?: UserOIDCAccountMaxOrderByAggregateInput
    _min?: UserOIDCAccountMinOrderByAggregateInput
    _sum?: UserOIDCAccountSumOrderByAggregateInput
  }

  export type UserOIDCAccountScalarWhereWithAggregatesInput = {
    AND?: UserOIDCAccountScalarWhereWithAggregatesInput | UserOIDCAccountScalarWhereWithAggregatesInput[]
    OR?: UserOIDCAccountScalarWhereWithAggregatesInput[]
    NOT?: UserOIDCAccountScalarWhereWithAggregatesInput | UserOIDCAccountScalarWhereWithAggregatesInput[]
    primaryKey?: IntWithAggregatesFilter<"UserOIDCAccount"> | number
    id?: UuidWithAggregatesFilter<"UserOIDCAccount"> | string
    sub?: StringWithAggregatesFilter<"UserOIDCAccount"> | string
    accessToken?: StringWithAggregatesFilter<"UserOIDCAccount"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"UserOIDCAccount"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserOIDCAccount"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"UserOIDCAccount"> | Date | string | null
    providerPk?: IntWithAggregatesFilter<"UserOIDCAccount"> | number
    userPk?: IntWithAggregatesFilter<"UserOIDCAccount"> | number
  }

  export type AuthProviderCreateInput = {
    id?: string
    key: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    accounts?: UserOIDCAccountCreateNestedManyWithoutProviderInput
  }

  export type AuthProviderUncheckedCreateInput = {
    primaryKey?: number
    id?: string
    key: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    accounts?: UserOIDCAccountUncheckedCreateNestedManyWithoutProviderInput
  }

  export type AuthProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: UserOIDCAccountUpdateManyWithoutProviderNestedInput
  }

  export type AuthProviderUncheckedUpdateInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: UserOIDCAccountUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type AuthProviderCreateManyInput = {
    primaryKey?: number
    id?: string
    key: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type AuthProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthProviderUncheckedUpdateManyInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlacklistedTokenCreateInput = {
    id?: string
    jwtId: string
    expiresAt: Date | string
    type: $Enums.TokenType
    user: UserCreateNestedOneWithoutTokensInput
  }

  export type BlacklistedTokenUncheckedCreateInput = {
    primaryKey?: number
    id?: string
    jwtId: string
    expiresAt: Date | string
    type: $Enums.TokenType
    userPk: number
  }

  export type BlacklistedTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    user?: UserUpdateOneRequiredWithoutTokensNestedInput
  }

  export type BlacklistedTokenUncheckedUpdateInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type BlacklistedTokenCreateManyInput = {
    primaryKey?: number
    id?: string
    jwtId: string
    expiresAt: Date | string
    type: $Enums.TokenType
    userPk: number
  }

  export type BlacklistedTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
  }

  export type BlacklistedTokenUncheckedUpdateManyInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type MediaCreateInput = {
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userProfileAvatar?: UserProfileCreateNestedOneWithoutAvatarInput
    userProfileBanner?: UserProfileCreateNestedOneWithoutBannerInput
  }

  export type MediaUncheckedCreateInput = {
    primaryKey?: number
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userProfileAvatar?: UserProfileUncheckedCreateNestedOneWithoutAvatarInput
    userProfileBanner?: UserProfileUncheckedCreateNestedOneWithoutBannerInput
  }

  export type MediaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userProfileAvatar?: UserProfileUpdateOneWithoutAvatarNestedInput
    userProfileBanner?: UserProfileUpdateOneWithoutBannerNestedInput
  }

  export type MediaUncheckedUpdateInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userProfileAvatar?: UserProfileUncheckedUpdateOneWithoutAvatarNestedInput
    userProfileBanner?: UserProfileUncheckedUpdateOneWithoutBannerNestedInput
  }

  export type MediaCreateManyInput = {
    primaryKey?: number
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
  }

  export type MediaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MediaUncheckedUpdateManyInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProfileCreateInput = {
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar?: MediaCreateNestedOneWithoutUserProfileAvatarInput
    banner?: MediaCreateNestedOneWithoutUserProfileBannerInput
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type UserProfileUncheckedCreateInput = {
    primaryKey?: number
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar_media_pk?: number | null
    banner_media_pk?: number | null
    userPk: number
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: MediaUpdateOneWithoutUserProfileAvatarNestedInput
    banner?: MediaUpdateOneWithoutUserProfileBannerNestedInput
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    banner_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserProfileCreateManyInput = {
    primaryKey?: number
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar_media_pk?: number | null
    banner_media_pk?: number | null
    userPk: number
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileUncheckedUpdateManyInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    banner_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    profile?: UserProfileCreateNestedOneWithoutUserInput
    openIds?: UserOIDCAccountCreateNestedManyWithoutUserInput
    tokens?: BlacklistedTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    primaryKey?: number
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    openIds?: UserOIDCAccountUncheckedCreateNestedManyWithoutUserInput
    tokens?: BlacklistedTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: UserProfileUpdateOneWithoutUserNestedInput
    openIds?: UserOIDCAccountUpdateManyWithoutUserNestedInput
    tokens?: BlacklistedTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    openIds?: UserOIDCAccountUncheckedUpdateManyWithoutUserNestedInput
    tokens?: BlacklistedTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    primaryKey?: number
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserOIDCAccountCreateInput = {
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    provider: AuthProviderCreateNestedOneWithoutAccountsInput
    user: UserCreateNestedOneWithoutOpenIdsInput
  }

  export type UserOIDCAccountUncheckedCreateInput = {
    primaryKey?: number
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    providerPk: number
    userPk: number
  }

  export type UserOIDCAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    provider?: AuthProviderUpdateOneRequiredWithoutAccountsNestedInput
    user?: UserUpdateOneRequiredWithoutOpenIdsNestedInput
  }

  export type UserOIDCAccountUncheckedUpdateInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerPk?: IntFieldUpdateOperationsInput | number
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserOIDCAccountCreateManyInput = {
    primaryKey?: number
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    providerPk: number
    userPk: number
  }

  export type UserOIDCAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserOIDCAccountUncheckedUpdateManyInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerPk?: IntFieldUpdateOperationsInput | number
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserOIDCAccountListRelationFilter = {
    every?: UserOIDCAccountWhereInput
    some?: UserOIDCAccountWhereInput
    none?: UserOIDCAccountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOIDCAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthProviderCountOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthProviderAvgOrderByAggregateInput = {
    primaryKey?: SortOrder
  }

  export type AuthProviderMaxOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthProviderMinOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthProviderSumOrderByAggregateInput = {
    primaryKey?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BlacklistedTokenCountOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    jwtId?: SortOrder
    expiresAt?: SortOrder
    type?: SortOrder
    userPk?: SortOrder
  }

  export type BlacklistedTokenAvgOrderByAggregateInput = {
    primaryKey?: SortOrder
    userPk?: SortOrder
  }

  export type BlacklistedTokenMaxOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    jwtId?: SortOrder
    expiresAt?: SortOrder
    type?: SortOrder
    userPk?: SortOrder
  }

  export type BlacklistedTokenMinOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    jwtId?: SortOrder
    expiresAt?: SortOrder
    type?: SortOrder
    userPk?: SortOrder
  }

  export type BlacklistedTokenSumOrderByAggregateInput = {
    primaryKey?: SortOrder
    userPk?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type MediaCountOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    type?: SortOrder
    filePath?: SortOrder
    bytes?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MediaAvgOrderByAggregateInput = {
    primaryKey?: SortOrder
    bytes?: SortOrder
  }

  export type MediaMaxOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    type?: SortOrder
    filePath?: SortOrder
    bytes?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MediaMinOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    type?: SortOrder
    filePath?: SortOrder
    bytes?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MediaSumOrderByAggregateInput = {
    primaryKey?: SortOrder
    bytes?: SortOrder
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MediaNullableScalarRelationFilter = {
    is?: MediaWhereInput | null
    isNot?: MediaWhereInput | null
  }

  export type UserProfileCountOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    displayName?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    birthday?: SortOrder
    website?: SortOrder
    avatar_media_pk?: SortOrder
    banner_media_pk?: SortOrder
    userPk?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    primaryKey?: SortOrder
    avatar_media_pk?: SortOrder
    banner_media_pk?: SortOrder
    userPk?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    displayName?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    birthday?: SortOrder
    website?: SortOrder
    avatar_media_pk?: SortOrder
    banner_media_pk?: SortOrder
    userPk?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    displayName?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    birthday?: SortOrder
    website?: SortOrder
    avatar_media_pk?: SortOrder
    banner_media_pk?: SortOrder
    userPk?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    primaryKey?: SortOrder
    avatar_media_pk?: SortOrder
    banner_media_pk?: SortOrder
    userPk?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumAccountLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountLevel | EnumAccountLevelFieldRefInput<$PrismaModel>
    in?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountLevelFilter<$PrismaModel> | $Enums.AccountLevel
  }

  export type BlacklistedTokenListRelationFilter = {
    every?: BlacklistedTokenWhereInput
    some?: BlacklistedTokenWhereInput
    none?: BlacklistedTokenWhereInput
  }

  export type BlacklistedTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    accountLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    primaryKey?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    accountLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    accountLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    primaryKey?: SortOrder
  }

  export type EnumAccountLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountLevel | EnumAccountLevelFieldRefInput<$PrismaModel>
    in?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountLevelWithAggregatesFilter<$PrismaModel> | $Enums.AccountLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountLevelFilter<$PrismaModel>
    _max?: NestedEnumAccountLevelFilter<$PrismaModel>
  }

  export type AuthProviderScalarRelationFilter = {
    is?: AuthProviderWhereInput
    isNot?: AuthProviderWhereInput
  }

  export type UserOIDCAccountProviderPkUserPkCompoundUniqueInput = {
    providerPk: number
    userPk: number
  }

  export type UserOIDCAccountProviderPkSubCompoundUniqueInput = {
    providerPk: number
    sub: string
  }

  export type UserOIDCAccountCountOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    sub?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
  }

  export type UserOIDCAccountAvgOrderByAggregateInput = {
    primaryKey?: SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
  }

  export type UserOIDCAccountMaxOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    sub?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
  }

  export type UserOIDCAccountMinOrderByAggregateInput = {
    primaryKey?: SortOrder
    id?: SortOrder
    sub?: SortOrder
    accessToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
  }

  export type UserOIDCAccountSumOrderByAggregateInput = {
    primaryKey?: SortOrder
    providerPk?: SortOrder
    userPk?: SortOrder
  }

  export type UserOIDCAccountCreateNestedManyWithoutProviderInput = {
    create?: XOR<UserOIDCAccountCreateWithoutProviderInput, UserOIDCAccountUncheckedCreateWithoutProviderInput> | UserOIDCAccountCreateWithoutProviderInput[] | UserOIDCAccountUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutProviderInput | UserOIDCAccountCreateOrConnectWithoutProviderInput[]
    createMany?: UserOIDCAccountCreateManyProviderInputEnvelope
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
  }

  export type UserOIDCAccountUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<UserOIDCAccountCreateWithoutProviderInput, UserOIDCAccountUncheckedCreateWithoutProviderInput> | UserOIDCAccountCreateWithoutProviderInput[] | UserOIDCAccountUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutProviderInput | UserOIDCAccountCreateOrConnectWithoutProviderInput[]
    createMany?: UserOIDCAccountCreateManyProviderInputEnvelope
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserOIDCAccountUpdateManyWithoutProviderNestedInput = {
    create?: XOR<UserOIDCAccountCreateWithoutProviderInput, UserOIDCAccountUncheckedCreateWithoutProviderInput> | UserOIDCAccountCreateWithoutProviderInput[] | UserOIDCAccountUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutProviderInput | UserOIDCAccountCreateOrConnectWithoutProviderInput[]
    upsert?: UserOIDCAccountUpsertWithWhereUniqueWithoutProviderInput | UserOIDCAccountUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: UserOIDCAccountCreateManyProviderInputEnvelope
    set?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    disconnect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    delete?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    update?: UserOIDCAccountUpdateWithWhereUniqueWithoutProviderInput | UserOIDCAccountUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: UserOIDCAccountUpdateManyWithWhereWithoutProviderInput | UserOIDCAccountUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: UserOIDCAccountScalarWhereInput | UserOIDCAccountScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserOIDCAccountUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<UserOIDCAccountCreateWithoutProviderInput, UserOIDCAccountUncheckedCreateWithoutProviderInput> | UserOIDCAccountCreateWithoutProviderInput[] | UserOIDCAccountUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutProviderInput | UserOIDCAccountCreateOrConnectWithoutProviderInput[]
    upsert?: UserOIDCAccountUpsertWithWhereUniqueWithoutProviderInput | UserOIDCAccountUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: UserOIDCAccountCreateManyProviderInputEnvelope
    set?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    disconnect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    delete?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    update?: UserOIDCAccountUpdateWithWhereUniqueWithoutProviderInput | UserOIDCAccountUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: UserOIDCAccountUpdateManyWithWhereWithoutProviderInput | UserOIDCAccountUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: UserOIDCAccountScalarWhereInput | UserOIDCAccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTokensInput = {
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type UserUpdateOneRequiredWithoutTokensNestedInput = {
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    upsert?: UserUpsertWithoutTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTokensInput, UserUpdateWithoutTokensInput>, UserUncheckedUpdateWithoutTokensInput>
  }

  export type UserProfileCreateNestedOneWithoutAvatarInput = {
    create?: XOR<UserProfileCreateWithoutAvatarInput, UserProfileUncheckedCreateWithoutAvatarInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutAvatarInput
    connect?: UserProfileWhereUniqueInput
  }

  export type UserProfileCreateNestedOneWithoutBannerInput = {
    create?: XOR<UserProfileCreateWithoutBannerInput, UserProfileUncheckedCreateWithoutBannerInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBannerInput
    connect?: UserProfileWhereUniqueInput
  }

  export type UserProfileUncheckedCreateNestedOneWithoutAvatarInput = {
    create?: XOR<UserProfileCreateWithoutAvatarInput, UserProfileUncheckedCreateWithoutAvatarInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutAvatarInput
    connect?: UserProfileWhereUniqueInput
  }

  export type UserProfileUncheckedCreateNestedOneWithoutBannerInput = {
    create?: XOR<UserProfileCreateWithoutBannerInput, UserProfileUncheckedCreateWithoutBannerInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBannerInput
    connect?: UserProfileWhereUniqueInput
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type UserProfileUpdateOneWithoutAvatarNestedInput = {
    create?: XOR<UserProfileCreateWithoutAvatarInput, UserProfileUncheckedCreateWithoutAvatarInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutAvatarInput
    upsert?: UserProfileUpsertWithoutAvatarInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutAvatarInput, UserProfileUpdateWithoutAvatarInput>, UserProfileUncheckedUpdateWithoutAvatarInput>
  }

  export type UserProfileUpdateOneWithoutBannerNestedInput = {
    create?: XOR<UserProfileCreateWithoutBannerInput, UserProfileUncheckedCreateWithoutBannerInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBannerInput
    upsert?: UserProfileUpsertWithoutBannerInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutBannerInput, UserProfileUpdateWithoutBannerInput>, UserProfileUncheckedUpdateWithoutBannerInput>
  }

  export type UserProfileUncheckedUpdateOneWithoutAvatarNestedInput = {
    create?: XOR<UserProfileCreateWithoutAvatarInput, UserProfileUncheckedCreateWithoutAvatarInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutAvatarInput
    upsert?: UserProfileUpsertWithoutAvatarInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutAvatarInput, UserProfileUpdateWithoutAvatarInput>, UserProfileUncheckedUpdateWithoutAvatarInput>
  }

  export type UserProfileUncheckedUpdateOneWithoutBannerNestedInput = {
    create?: XOR<UserProfileCreateWithoutBannerInput, UserProfileUncheckedCreateWithoutBannerInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBannerInput
    upsert?: UserProfileUpsertWithoutBannerInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutBannerInput, UserProfileUpdateWithoutBannerInput>, UserProfileUncheckedUpdateWithoutBannerInput>
  }

  export type MediaCreateNestedOneWithoutUserProfileAvatarInput = {
    create?: XOR<MediaCreateWithoutUserProfileAvatarInput, MediaUncheckedCreateWithoutUserProfileAvatarInput>
    connectOrCreate?: MediaCreateOrConnectWithoutUserProfileAvatarInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaCreateNestedOneWithoutUserProfileBannerInput = {
    create?: XOR<MediaCreateWithoutUserProfileBannerInput, MediaUncheckedCreateWithoutUserProfileBannerInput>
    connectOrCreate?: MediaCreateOrConnectWithoutUserProfileBannerInput
    connect?: MediaWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MediaUpdateOneWithoutUserProfileAvatarNestedInput = {
    create?: XOR<MediaCreateWithoutUserProfileAvatarInput, MediaUncheckedCreateWithoutUserProfileAvatarInput>
    connectOrCreate?: MediaCreateOrConnectWithoutUserProfileAvatarInput
    upsert?: MediaUpsertWithoutUserProfileAvatarInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutUserProfileAvatarInput, MediaUpdateWithoutUserProfileAvatarInput>, MediaUncheckedUpdateWithoutUserProfileAvatarInput>
  }

  export type MediaUpdateOneWithoutUserProfileBannerNestedInput = {
    create?: XOR<MediaCreateWithoutUserProfileBannerInput, MediaUncheckedCreateWithoutUserProfileBannerInput>
    connectOrCreate?: MediaCreateOrConnectWithoutUserProfileBannerInput
    upsert?: MediaUpsertWithoutUserProfileBannerInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutUserProfileBannerInput, MediaUpdateWithoutUserProfileBannerInput>, MediaUncheckedUpdateWithoutUserProfileBannerInput>
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type UserOIDCAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOIDCAccountCreateWithoutUserInput, UserOIDCAccountUncheckedCreateWithoutUserInput> | UserOIDCAccountCreateWithoutUserInput[] | UserOIDCAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutUserInput | UserOIDCAccountCreateOrConnectWithoutUserInput[]
    createMany?: UserOIDCAccountCreateManyUserInputEnvelope
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
  }

  export type BlacklistedTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<BlacklistedTokenCreateWithoutUserInput, BlacklistedTokenUncheckedCreateWithoutUserInput> | BlacklistedTokenCreateWithoutUserInput[] | BlacklistedTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlacklistedTokenCreateOrConnectWithoutUserInput | BlacklistedTokenCreateOrConnectWithoutUserInput[]
    createMany?: BlacklistedTokenCreateManyUserInputEnvelope
    connect?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
  }

  export type UserProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type UserOIDCAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOIDCAccountCreateWithoutUserInput, UserOIDCAccountUncheckedCreateWithoutUserInput> | UserOIDCAccountCreateWithoutUserInput[] | UserOIDCAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutUserInput | UserOIDCAccountCreateOrConnectWithoutUserInput[]
    createMany?: UserOIDCAccountCreateManyUserInputEnvelope
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
  }

  export type BlacklistedTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BlacklistedTokenCreateWithoutUserInput, BlacklistedTokenUncheckedCreateWithoutUserInput> | BlacklistedTokenCreateWithoutUserInput[] | BlacklistedTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlacklistedTokenCreateOrConnectWithoutUserInput | BlacklistedTokenCreateOrConnectWithoutUserInput[]
    createMany?: BlacklistedTokenCreateManyUserInputEnvelope
    connect?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
  }

  export type EnumAccountLevelFieldUpdateOperationsInput = {
    set?: $Enums.AccountLevel
  }

  export type UserProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserOIDCAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOIDCAccountCreateWithoutUserInput, UserOIDCAccountUncheckedCreateWithoutUserInput> | UserOIDCAccountCreateWithoutUserInput[] | UserOIDCAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutUserInput | UserOIDCAccountCreateOrConnectWithoutUserInput[]
    upsert?: UserOIDCAccountUpsertWithWhereUniqueWithoutUserInput | UserOIDCAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOIDCAccountCreateManyUserInputEnvelope
    set?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    disconnect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    delete?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    update?: UserOIDCAccountUpdateWithWhereUniqueWithoutUserInput | UserOIDCAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOIDCAccountUpdateManyWithWhereWithoutUserInput | UserOIDCAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOIDCAccountScalarWhereInput | UserOIDCAccountScalarWhereInput[]
  }

  export type BlacklistedTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<BlacklistedTokenCreateWithoutUserInput, BlacklistedTokenUncheckedCreateWithoutUserInput> | BlacklistedTokenCreateWithoutUserInput[] | BlacklistedTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlacklistedTokenCreateOrConnectWithoutUserInput | BlacklistedTokenCreateOrConnectWithoutUserInput[]
    upsert?: BlacklistedTokenUpsertWithWhereUniqueWithoutUserInput | BlacklistedTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BlacklistedTokenCreateManyUserInputEnvelope
    set?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    disconnect?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    delete?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    connect?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    update?: BlacklistedTokenUpdateWithWhereUniqueWithoutUserInput | BlacklistedTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BlacklistedTokenUpdateManyWithWhereWithoutUserInput | BlacklistedTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BlacklistedTokenScalarWhereInput | BlacklistedTokenScalarWhereInput[]
  }

  export type UserProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserOIDCAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOIDCAccountCreateWithoutUserInput, UserOIDCAccountUncheckedCreateWithoutUserInput> | UserOIDCAccountCreateWithoutUserInput[] | UserOIDCAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOIDCAccountCreateOrConnectWithoutUserInput | UserOIDCAccountCreateOrConnectWithoutUserInput[]
    upsert?: UserOIDCAccountUpsertWithWhereUniqueWithoutUserInput | UserOIDCAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOIDCAccountCreateManyUserInputEnvelope
    set?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    disconnect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    delete?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    connect?: UserOIDCAccountWhereUniqueInput | UserOIDCAccountWhereUniqueInput[]
    update?: UserOIDCAccountUpdateWithWhereUniqueWithoutUserInput | UserOIDCAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOIDCAccountUpdateManyWithWhereWithoutUserInput | UserOIDCAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOIDCAccountScalarWhereInput | UserOIDCAccountScalarWhereInput[]
  }

  export type BlacklistedTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BlacklistedTokenCreateWithoutUserInput, BlacklistedTokenUncheckedCreateWithoutUserInput> | BlacklistedTokenCreateWithoutUserInput[] | BlacklistedTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlacklistedTokenCreateOrConnectWithoutUserInput | BlacklistedTokenCreateOrConnectWithoutUserInput[]
    upsert?: BlacklistedTokenUpsertWithWhereUniqueWithoutUserInput | BlacklistedTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BlacklistedTokenCreateManyUserInputEnvelope
    set?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    disconnect?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    delete?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    connect?: BlacklistedTokenWhereUniqueInput | BlacklistedTokenWhereUniqueInput[]
    update?: BlacklistedTokenUpdateWithWhereUniqueWithoutUserInput | BlacklistedTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BlacklistedTokenUpdateManyWithWhereWithoutUserInput | BlacklistedTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BlacklistedTokenScalarWhereInput | BlacklistedTokenScalarWhereInput[]
  }

  export type AuthProviderCreateNestedOneWithoutAccountsInput = {
    create?: XOR<AuthProviderCreateWithoutAccountsInput, AuthProviderUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutAccountsInput
    connect?: AuthProviderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOpenIdsInput = {
    create?: XOR<UserCreateWithoutOpenIdsInput, UserUncheckedCreateWithoutOpenIdsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOpenIdsInput
    connect?: UserWhereUniqueInput
  }

  export type AuthProviderUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<AuthProviderCreateWithoutAccountsInput, AuthProviderUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutAccountsInput
    upsert?: AuthProviderUpsertWithoutAccountsInput
    connect?: AuthProviderWhereUniqueInput
    update?: XOR<XOR<AuthProviderUpdateToOneWithWhereWithoutAccountsInput, AuthProviderUpdateWithoutAccountsInput>, AuthProviderUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateOneRequiredWithoutOpenIdsNestedInput = {
    create?: XOR<UserCreateWithoutOpenIdsInput, UserUncheckedCreateWithoutOpenIdsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOpenIdsInput
    upsert?: UserUpsertWithoutOpenIdsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOpenIdsInput, UserUpdateWithoutOpenIdsInput>, UserUncheckedUpdateWithoutOpenIdsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAccountLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountLevel | EnumAccountLevelFieldRefInput<$PrismaModel>
    in?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountLevelFilter<$PrismaModel> | $Enums.AccountLevel
  }

  export type NestedEnumAccountLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountLevel | EnumAccountLevelFieldRefInput<$PrismaModel>
    in?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountLevel[] | ListEnumAccountLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountLevelWithAggregatesFilter<$PrismaModel> | $Enums.AccountLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountLevelFilter<$PrismaModel>
    _max?: NestedEnumAccountLevelFilter<$PrismaModel>
  }

  export type UserOIDCAccountCreateWithoutProviderInput = {
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutOpenIdsInput
  }

  export type UserOIDCAccountUncheckedCreateWithoutProviderInput = {
    primaryKey?: number
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    userPk: number
  }

  export type UserOIDCAccountCreateOrConnectWithoutProviderInput = {
    where: UserOIDCAccountWhereUniqueInput
    create: XOR<UserOIDCAccountCreateWithoutProviderInput, UserOIDCAccountUncheckedCreateWithoutProviderInput>
  }

  export type UserOIDCAccountCreateManyProviderInputEnvelope = {
    data: UserOIDCAccountCreateManyProviderInput | UserOIDCAccountCreateManyProviderInput[]
    skipDuplicates?: boolean
  }

  export type UserOIDCAccountUpsertWithWhereUniqueWithoutProviderInput = {
    where: UserOIDCAccountWhereUniqueInput
    update: XOR<UserOIDCAccountUpdateWithoutProviderInput, UserOIDCAccountUncheckedUpdateWithoutProviderInput>
    create: XOR<UserOIDCAccountCreateWithoutProviderInput, UserOIDCAccountUncheckedCreateWithoutProviderInput>
  }

  export type UserOIDCAccountUpdateWithWhereUniqueWithoutProviderInput = {
    where: UserOIDCAccountWhereUniqueInput
    data: XOR<UserOIDCAccountUpdateWithoutProviderInput, UserOIDCAccountUncheckedUpdateWithoutProviderInput>
  }

  export type UserOIDCAccountUpdateManyWithWhereWithoutProviderInput = {
    where: UserOIDCAccountScalarWhereInput
    data: XOR<UserOIDCAccountUpdateManyMutationInput, UserOIDCAccountUncheckedUpdateManyWithoutProviderInput>
  }

  export type UserOIDCAccountScalarWhereInput = {
    AND?: UserOIDCAccountScalarWhereInput | UserOIDCAccountScalarWhereInput[]
    OR?: UserOIDCAccountScalarWhereInput[]
    NOT?: UserOIDCAccountScalarWhereInput | UserOIDCAccountScalarWhereInput[]
    primaryKey?: IntFilter<"UserOIDCAccount"> | number
    id?: UuidFilter<"UserOIDCAccount"> | string
    sub?: StringFilter<"UserOIDCAccount"> | string
    accessToken?: StringFilter<"UserOIDCAccount"> | string
    avatarUrl?: StringNullableFilter<"UserOIDCAccount"> | string | null
    createdAt?: DateTimeFilter<"UserOIDCAccount"> | Date | string
    updatedAt?: DateTimeNullableFilter<"UserOIDCAccount"> | Date | string | null
    providerPk?: IntFilter<"UserOIDCAccount"> | number
    userPk?: IntFilter<"UserOIDCAccount"> | number
  }

  export type UserCreateWithoutTokensInput = {
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    profile?: UserProfileCreateNestedOneWithoutUserInput
    openIds?: UserOIDCAccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTokensInput = {
    primaryKey?: number
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    openIds?: UserOIDCAccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
  }

  export type UserUpsertWithoutTokensInput = {
    update: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
  }

  export type UserUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: UserProfileUpdateOneWithoutUserNestedInput
    openIds?: UserOIDCAccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTokensInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    openIds?: UserOIDCAccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProfileCreateWithoutAvatarInput = {
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    banner?: MediaCreateNestedOneWithoutUserProfileBannerInput
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type UserProfileUncheckedCreateWithoutAvatarInput = {
    primaryKey?: number
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    banner_media_pk?: number | null
    userPk: number
  }

  export type UserProfileCreateOrConnectWithoutAvatarInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutAvatarInput, UserProfileUncheckedCreateWithoutAvatarInput>
  }

  export type UserProfileCreateWithoutBannerInput = {
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar?: MediaCreateNestedOneWithoutUserProfileAvatarInput
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type UserProfileUncheckedCreateWithoutBannerInput = {
    primaryKey?: number
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar_media_pk?: number | null
    userPk: number
  }

  export type UserProfileCreateOrConnectWithoutBannerInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutBannerInput, UserProfileUncheckedCreateWithoutBannerInput>
  }

  export type UserProfileUpsertWithoutAvatarInput = {
    update: XOR<UserProfileUpdateWithoutAvatarInput, UserProfileUncheckedUpdateWithoutAvatarInput>
    create: XOR<UserProfileCreateWithoutAvatarInput, UserProfileUncheckedCreateWithoutAvatarInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutAvatarInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutAvatarInput, UserProfileUncheckedUpdateWithoutAvatarInput>
  }

  export type UserProfileUpdateWithoutAvatarInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    banner?: MediaUpdateOneWithoutUserProfileBannerNestedInput
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutAvatarInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    banner_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserProfileUpsertWithoutBannerInput = {
    update: XOR<UserProfileUpdateWithoutBannerInput, UserProfileUncheckedUpdateWithoutBannerInput>
    create: XOR<UserProfileCreateWithoutBannerInput, UserProfileUncheckedCreateWithoutBannerInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutBannerInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutBannerInput, UserProfileUncheckedUpdateWithoutBannerInput>
  }

  export type UserProfileUpdateWithoutBannerInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: MediaUpdateOneWithoutUserProfileAvatarNestedInput
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutBannerInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type MediaCreateWithoutUserProfileAvatarInput = {
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userProfileBanner?: UserProfileCreateNestedOneWithoutBannerInput
  }

  export type MediaUncheckedCreateWithoutUserProfileAvatarInput = {
    primaryKey?: number
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userProfileBanner?: UserProfileUncheckedCreateNestedOneWithoutBannerInput
  }

  export type MediaCreateOrConnectWithoutUserProfileAvatarInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutUserProfileAvatarInput, MediaUncheckedCreateWithoutUserProfileAvatarInput>
  }

  export type MediaCreateWithoutUserProfileBannerInput = {
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userProfileAvatar?: UserProfileCreateNestedOneWithoutAvatarInput
  }

  export type MediaUncheckedCreateWithoutUserProfileBannerInput = {
    primaryKey?: number
    id?: string
    type: $Enums.MediaType
    filePath: string
    bytes: number
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    userProfileAvatar?: UserProfileUncheckedCreateNestedOneWithoutAvatarInput
  }

  export type MediaCreateOrConnectWithoutUserProfileBannerInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutUserProfileBannerInput, MediaUncheckedCreateWithoutUserProfileBannerInput>
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    openIds?: UserOIDCAccountCreateNestedManyWithoutUserInput
    tokens?: BlacklistedTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    primaryKey?: number
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    openIds?: UserOIDCAccountUncheckedCreateNestedManyWithoutUserInput
    tokens?: BlacklistedTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type MediaUpsertWithoutUserProfileAvatarInput = {
    update: XOR<MediaUpdateWithoutUserProfileAvatarInput, MediaUncheckedUpdateWithoutUserProfileAvatarInput>
    create: XOR<MediaCreateWithoutUserProfileAvatarInput, MediaUncheckedCreateWithoutUserProfileAvatarInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutUserProfileAvatarInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutUserProfileAvatarInput, MediaUncheckedUpdateWithoutUserProfileAvatarInput>
  }

  export type MediaUpdateWithoutUserProfileAvatarInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userProfileBanner?: UserProfileUpdateOneWithoutBannerNestedInput
  }

  export type MediaUncheckedUpdateWithoutUserProfileAvatarInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userProfileBanner?: UserProfileUncheckedUpdateOneWithoutBannerNestedInput
  }

  export type MediaUpsertWithoutUserProfileBannerInput = {
    update: XOR<MediaUpdateWithoutUserProfileBannerInput, MediaUncheckedUpdateWithoutUserProfileBannerInput>
    create: XOR<MediaCreateWithoutUserProfileBannerInput, MediaUncheckedCreateWithoutUserProfileBannerInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutUserProfileBannerInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutUserProfileBannerInput, MediaUncheckedUpdateWithoutUserProfileBannerInput>
  }

  export type MediaUpdateWithoutUserProfileBannerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userProfileAvatar?: UserProfileUpdateOneWithoutAvatarNestedInput
  }

  export type MediaUncheckedUpdateWithoutUserProfileBannerInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    filePath?: StringFieldUpdateOperationsInput | string
    bytes?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userProfileAvatar?: UserProfileUncheckedUpdateOneWithoutAvatarNestedInput
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openIds?: UserOIDCAccountUpdateManyWithoutUserNestedInput
    tokens?: BlacklistedTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openIds?: UserOIDCAccountUncheckedUpdateManyWithoutUserNestedInput
    tokens?: BlacklistedTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProfileCreateWithoutUserInput = {
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar?: MediaCreateNestedOneWithoutUserProfileAvatarInput
    banner?: MediaCreateNestedOneWithoutUserProfileBannerInput
  }

  export type UserProfileUncheckedCreateWithoutUserInput = {
    primaryKey?: number
    id?: string
    displayName?: string | null
    bio?: string | null
    location?: string | null
    birthday?: Date | string | null
    website?: string | null
    avatar_media_pk?: number | null
    banner_media_pk?: number | null
  }

  export type UserProfileCreateOrConnectWithoutUserInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
  }

  export type UserOIDCAccountCreateWithoutUserInput = {
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    provider: AuthProviderCreateNestedOneWithoutAccountsInput
  }

  export type UserOIDCAccountUncheckedCreateWithoutUserInput = {
    primaryKey?: number
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    providerPk: number
  }

  export type UserOIDCAccountCreateOrConnectWithoutUserInput = {
    where: UserOIDCAccountWhereUniqueInput
    create: XOR<UserOIDCAccountCreateWithoutUserInput, UserOIDCAccountUncheckedCreateWithoutUserInput>
  }

  export type UserOIDCAccountCreateManyUserInputEnvelope = {
    data: UserOIDCAccountCreateManyUserInput | UserOIDCAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BlacklistedTokenCreateWithoutUserInput = {
    id?: string
    jwtId: string
    expiresAt: Date | string
    type: $Enums.TokenType
  }

  export type BlacklistedTokenUncheckedCreateWithoutUserInput = {
    primaryKey?: number
    id?: string
    jwtId: string
    expiresAt: Date | string
    type: $Enums.TokenType
  }

  export type BlacklistedTokenCreateOrConnectWithoutUserInput = {
    where: BlacklistedTokenWhereUniqueInput
    create: XOR<BlacklistedTokenCreateWithoutUserInput, BlacklistedTokenUncheckedCreateWithoutUserInput>
  }

  export type BlacklistedTokenCreateManyUserInputEnvelope = {
    data: BlacklistedTokenCreateManyUserInput | BlacklistedTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserProfileUpsertWithoutUserInput = {
    update: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: MediaUpdateOneWithoutUserProfileAvatarNestedInput
    banner?: MediaUpdateOneWithoutUserProfileBannerNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutUserInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
    banner_media_pk?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserOIDCAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOIDCAccountWhereUniqueInput
    update: XOR<UserOIDCAccountUpdateWithoutUserInput, UserOIDCAccountUncheckedUpdateWithoutUserInput>
    create: XOR<UserOIDCAccountCreateWithoutUserInput, UserOIDCAccountUncheckedCreateWithoutUserInput>
  }

  export type UserOIDCAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOIDCAccountWhereUniqueInput
    data: XOR<UserOIDCAccountUpdateWithoutUserInput, UserOIDCAccountUncheckedUpdateWithoutUserInput>
  }

  export type UserOIDCAccountUpdateManyWithWhereWithoutUserInput = {
    where: UserOIDCAccountScalarWhereInput
    data: XOR<UserOIDCAccountUpdateManyMutationInput, UserOIDCAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type BlacklistedTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: BlacklistedTokenWhereUniqueInput
    update: XOR<BlacklistedTokenUpdateWithoutUserInput, BlacklistedTokenUncheckedUpdateWithoutUserInput>
    create: XOR<BlacklistedTokenCreateWithoutUserInput, BlacklistedTokenUncheckedCreateWithoutUserInput>
  }

  export type BlacklistedTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: BlacklistedTokenWhereUniqueInput
    data: XOR<BlacklistedTokenUpdateWithoutUserInput, BlacklistedTokenUncheckedUpdateWithoutUserInput>
  }

  export type BlacklistedTokenUpdateManyWithWhereWithoutUserInput = {
    where: BlacklistedTokenScalarWhereInput
    data: XOR<BlacklistedTokenUpdateManyMutationInput, BlacklistedTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type BlacklistedTokenScalarWhereInput = {
    AND?: BlacklistedTokenScalarWhereInput | BlacklistedTokenScalarWhereInput[]
    OR?: BlacklistedTokenScalarWhereInput[]
    NOT?: BlacklistedTokenScalarWhereInput | BlacklistedTokenScalarWhereInput[]
    primaryKey?: IntFilter<"BlacklistedToken"> | number
    id?: UuidFilter<"BlacklistedToken"> | string
    jwtId?: StringFilter<"BlacklistedToken"> | string
    expiresAt?: DateTimeFilter<"BlacklistedToken"> | Date | string
    type?: EnumTokenTypeFilter<"BlacklistedToken"> | $Enums.TokenType
    userPk?: IntFilter<"BlacklistedToken"> | number
  }

  export type AuthProviderCreateWithoutAccountsInput = {
    id?: string
    key: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type AuthProviderUncheckedCreateWithoutAccountsInput = {
    primaryKey?: number
    id?: string
    key: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type AuthProviderCreateOrConnectWithoutAccountsInput = {
    where: AuthProviderWhereUniqueInput
    create: XOR<AuthProviderCreateWithoutAccountsInput, AuthProviderUncheckedCreateWithoutAccountsInput>
  }

  export type UserCreateWithoutOpenIdsInput = {
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    profile?: UserProfileCreateNestedOneWithoutUserInput
    tokens?: BlacklistedTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOpenIdsInput = {
    primaryKey?: number
    id?: string
    email: string
    username: string
    password?: string | null
    accountLevel?: $Enums.AccountLevel
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    tokens?: BlacklistedTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOpenIdsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOpenIdsInput, UserUncheckedCreateWithoutOpenIdsInput>
  }

  export type AuthProviderUpsertWithoutAccountsInput = {
    update: XOR<AuthProviderUpdateWithoutAccountsInput, AuthProviderUncheckedUpdateWithoutAccountsInput>
    create: XOR<AuthProviderCreateWithoutAccountsInput, AuthProviderUncheckedCreateWithoutAccountsInput>
    where?: AuthProviderWhereInput
  }

  export type AuthProviderUpdateToOneWithWhereWithoutAccountsInput = {
    where?: AuthProviderWhereInput
    data: XOR<AuthProviderUpdateWithoutAccountsInput, AuthProviderUncheckedUpdateWithoutAccountsInput>
  }

  export type AuthProviderUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthProviderUncheckedUpdateWithoutAccountsInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutOpenIdsInput = {
    update: XOR<UserUpdateWithoutOpenIdsInput, UserUncheckedUpdateWithoutOpenIdsInput>
    create: XOR<UserCreateWithoutOpenIdsInput, UserUncheckedCreateWithoutOpenIdsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOpenIdsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOpenIdsInput, UserUncheckedUpdateWithoutOpenIdsInput>
  }

  export type UserUpdateWithoutOpenIdsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: UserProfileUpdateOneWithoutUserNestedInput
    tokens?: BlacklistedTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOpenIdsInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accountLevel?: EnumAccountLevelFieldUpdateOperationsInput | $Enums.AccountLevel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    tokens?: BlacklistedTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserOIDCAccountCreateManyProviderInput = {
    primaryKey?: number
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    userPk: number
  }

  export type UserOIDCAccountUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutOpenIdsNestedInput
  }

  export type UserOIDCAccountUncheckedUpdateWithoutProviderInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserOIDCAccountUncheckedUpdateManyWithoutProviderInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserOIDCAccountCreateManyUserInput = {
    primaryKey?: number
    id?: string
    sub: string
    accessToken: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    providerPk: number
  }

  export type BlacklistedTokenCreateManyUserInput = {
    primaryKey?: number
    id?: string
    jwtId: string
    expiresAt: Date | string
    type: $Enums.TokenType
  }

  export type UserOIDCAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    provider?: AuthProviderUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type UserOIDCAccountUncheckedUpdateWithoutUserInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerPk?: IntFieldUpdateOperationsInput | number
  }

  export type UserOIDCAccountUncheckedUpdateManyWithoutUserInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    sub?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerPk?: IntFieldUpdateOperationsInput | number
  }

  export type BlacklistedTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
  }

  export type BlacklistedTokenUncheckedUpdateWithoutUserInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
  }

  export type BlacklistedTokenUncheckedUpdateManyWithoutUserInput = {
    primaryKey?: IntFieldUpdateOperationsInput | number
    id?: StringFieldUpdateOperationsInput | string
    jwtId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}