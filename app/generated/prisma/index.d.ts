
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model comments
 * 
 */
export type comments = $Result.DefaultSelection<Prisma.$commentsPayload>
/**
 * Model projects
 * 
 */
export type projects = $Result.DefaultSelection<Prisma.$projectsPayload>
/**
 * Model subtasks
 * 
 */
export type subtasks = $Result.DefaultSelection<Prisma.$subtasksPayload>
/**
 * Model tags
 * 
 */
export type tags = $Result.DefaultSelection<Prisma.$tagsPayload>
/**
 * Model task_tags
 * 
 */
export type task_tags = $Result.DefaultSelection<Prisma.$task_tagsPayload>
/**
 * Model tasks
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type tasks = $Result.DefaultSelection<Prisma.$tasksPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const projects_status: {
  Not_Started: 'Not Started',
  In_Progress: 'In Progress',
  Review: 'Review',
  Completed: 'Completed'
};

export type projects_status = (typeof projects_status)[keyof typeof projects_status]


export const tasks_status: {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE'
};

export type tasks_status = (typeof tasks_status)[keyof typeof tasks_status]


export const projects_priority: {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High'
};

export type projects_priority = (typeof projects_priority)[keyof typeof projects_priority]


export const tasks_priority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type tasks_priority = (typeof tasks_priority)[keyof typeof tasks_priority]

}

export type projects_status = $Enums.projects_status

export const projects_status: typeof $Enums.projects_status

export type tasks_status = $Enums.tasks_status

export const tasks_status: typeof $Enums.tasks_status

export type projects_priority = $Enums.projects_priority

export const projects_priority: typeof $Enums.projects_priority

export type tasks_priority = $Enums.tasks_priority

export const tasks_priority: typeof $Enums.tasks_priority

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Comments
 * const comments = await prisma.comments.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * // Fetch zero or more Comments
   * const comments = await prisma.comments.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
   * `prisma.comments`: Exposes CRUD operations for the **comments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comments.findMany()
    * ```
    */
  get comments(): Prisma.commentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projects`: Exposes CRUD operations for the **projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.projectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subtasks`: Exposes CRUD operations for the **subtasks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subtasks
    * const subtasks = await prisma.subtasks.findMany()
    * ```
    */
  get subtasks(): Prisma.subtasksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tags`: Exposes CRUD operations for the **tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tags.findMany()
    * ```
    */
  get tags(): Prisma.tagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task_tags`: Exposes CRUD operations for the **task_tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Task_tags
    * const task_tags = await prisma.task_tags.findMany()
    * ```
    */
  get task_tags(): Prisma.task_tagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tasks`: Exposes CRUD operations for the **tasks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.tasks.findMany()
    * ```
    */
  get tasks(): Prisma.tasksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    comments: 'comments',
    projects: 'projects',
    subtasks: 'subtasks',
    tags: 'tags',
    task_tags: 'task_tags',
    tasks: 'tasks',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "comments" | "projects" | "subtasks" | "tags" | "task_tags" | "tasks" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      comments: {
        payload: Prisma.$commentsPayload<ExtArgs>
        fields: Prisma.commentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.commentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.commentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          findFirst: {
            args: Prisma.commentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.commentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          findMany: {
            args: Prisma.commentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>[]
          }
          create: {
            args: Prisma.commentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          createMany: {
            args: Prisma.commentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.commentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          update: {
            args: Prisma.commentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          deleteMany: {
            args: Prisma.commentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.commentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.commentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentsPayload>
          }
          aggregate: {
            args: Prisma.CommentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComments>
          }
          groupBy: {
            args: Prisma.commentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.commentsCountArgs<ExtArgs>
            result: $Utils.Optional<CommentsCountAggregateOutputType> | number
          }
        }
      }
      projects: {
        payload: Prisma.$projectsPayload<ExtArgs>
        fields: Prisma.projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findFirst: {
            args: Prisma.projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findMany: {
            args: Prisma.projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          create: {
            args: Prisma.projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          createMany: {
            args: Prisma.projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          update: {
            args: Prisma.projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          deleteMany: {
            args: Prisma.projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          aggregate: {
            args: Prisma.ProjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjects>
          }
          groupBy: {
            args: Prisma.projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.projectsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectsCountAggregateOutputType> | number
          }
        }
      }
      subtasks: {
        payload: Prisma.$subtasksPayload<ExtArgs>
        fields: Prisma.subtasksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subtasksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subtasksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>
          }
          findFirst: {
            args: Prisma.subtasksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subtasksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>
          }
          findMany: {
            args: Prisma.subtasksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>[]
          }
          create: {
            args: Prisma.subtasksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>
          }
          createMany: {
            args: Prisma.subtasksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.subtasksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>
          }
          update: {
            args: Prisma.subtasksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>
          }
          deleteMany: {
            args: Prisma.subtasksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subtasksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.subtasksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subtasksPayload>
          }
          aggregate: {
            args: Prisma.SubtasksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubtasks>
          }
          groupBy: {
            args: Prisma.subtasksGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubtasksGroupByOutputType>[]
          }
          count: {
            args: Prisma.subtasksCountArgs<ExtArgs>
            result: $Utils.Optional<SubtasksCountAggregateOutputType> | number
          }
        }
      }
      tags: {
        payload: Prisma.$tagsPayload<ExtArgs>
        fields: Prisma.tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          findFirst: {
            args: Prisma.tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          findMany: {
            args: Prisma.tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>[]
          }
          create: {
            args: Prisma.tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          createMany: {
            args: Prisma.tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          update: {
            args: Prisma.tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          deleteMany: {
            args: Prisma.tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          aggregate: {
            args: Prisma.TagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTags>
          }
          groupBy: {
            args: Prisma.tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tagsCountArgs<ExtArgs>
            result: $Utils.Optional<TagsCountAggregateOutputType> | number
          }
        }
      }
      task_tags: {
        payload: Prisma.$task_tagsPayload<ExtArgs>
        fields: Prisma.task_tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.task_tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.task_tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>
          }
          findFirst: {
            args: Prisma.task_tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.task_tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>
          }
          findMany: {
            args: Prisma.task_tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>[]
          }
          create: {
            args: Prisma.task_tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>
          }
          createMany: {
            args: Prisma.task_tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.task_tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>
          }
          update: {
            args: Prisma.task_tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>
          }
          deleteMany: {
            args: Prisma.task_tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.task_tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.task_tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_tagsPayload>
          }
          aggregate: {
            args: Prisma.Task_tagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask_tags>
          }
          groupBy: {
            args: Prisma.task_tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Task_tagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.task_tagsCountArgs<ExtArgs>
            result: $Utils.Optional<Task_tagsCountAggregateOutputType> | number
          }
        }
      }
      tasks: {
        payload: Prisma.$tasksPayload<ExtArgs>
        fields: Prisma.tasksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tasksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tasksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>
          }
          findFirst: {
            args: Prisma.tasksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tasksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>
          }
          findMany: {
            args: Prisma.tasksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>[]
          }
          create: {
            args: Prisma.tasksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>
          }
          createMany: {
            args: Prisma.tasksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tasksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>
          }
          update: {
            args: Prisma.tasksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>
          }
          deleteMany: {
            args: Prisma.tasksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tasksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tasksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasksPayload>
          }
          aggregate: {
            args: Prisma.TasksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTasks>
          }
          groupBy: {
            args: Prisma.tasksGroupByArgs<ExtArgs>
            result: $Utils.Optional<TasksGroupByOutputType>[]
          }
          count: {
            args: Prisma.tasksCountArgs<ExtArgs>
            result: $Utils.Optional<TasksCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
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
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    comments?: commentsOmit
    projects?: projectsOmit
    subtasks?: subtasksOmit
    tags?: tagsOmit
    task_tags?: task_tagsOmit
    tasks?: tasksOmit
    users?: usersOmit
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
   * Count Type ProjectsCountOutputType
   */

  export type ProjectsCountOutputType = {
    tasks: number
  }

  export type ProjectsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ProjectsCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectsCountOutputType
     */
    select?: ProjectsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasksWhereInput
  }


  /**
   * Count Type TagsCountOutputType
   */

  export type TagsCountOutputType = {
    task_tags: number
  }

  export type TagsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task_tags?: boolean | TagsCountOutputTypeCountTask_tagsArgs
  }

  // Custom InputTypes
  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagsCountOutputType
     */
    select?: TagsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeCountTask_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: task_tagsWhereInput
  }


  /**
   * Count Type TasksCountOutputType
   */

  export type TasksCountOutputType = {
    comments: number
    subtasks: number
    task_tags: number
  }

  export type TasksCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | TasksCountOutputTypeCountCommentsArgs
    subtasks?: boolean | TasksCountOutputTypeCountSubtasksArgs
    task_tags?: boolean | TasksCountOutputTypeCountTask_tagsArgs
  }

  // Custom InputTypes
  /**
   * TasksCountOutputType without action
   */
  export type TasksCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TasksCountOutputType
     */
    select?: TasksCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TasksCountOutputType without action
   */
  export type TasksCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentsWhereInput
  }

  /**
   * TasksCountOutputType without action
   */
  export type TasksCountOutputTypeCountSubtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subtasksWhereInput
  }

  /**
   * TasksCountOutputType without action
   */
  export type TasksCountOutputTypeCountTask_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: task_tagsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    comments: number
    tasks_tasks_assignee_idTousers: number
    tasks_tasks_created_by_idTousers: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | UsersCountOutputTypeCountCommentsArgs
    tasks_tasks_assignee_idTousers?: boolean | UsersCountOutputTypeCountTasks_tasks_assignee_idTousersArgs
    tasks_tasks_created_by_idTousers?: boolean | UsersCountOutputTypeCountTasks_tasks_created_by_idTousersArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTasks_tasks_assignee_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasksWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTasks_tasks_created_by_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasksWhereInput
  }


  /**
   * Models
   */

  /**
   * Model comments
   */

  export type AggregateComments = {
    _count: CommentsCountAggregateOutputType | null
    _avg: CommentsAvgAggregateOutputType | null
    _sum: CommentsSumAggregateOutputType | null
    _min: CommentsMinAggregateOutputType | null
    _max: CommentsMaxAggregateOutputType | null
  }

  export type CommentsAvgAggregateOutputType = {
    comment_id: number | null
    task_id: number | null
    user_id: number | null
  }

  export type CommentsSumAggregateOutputType = {
    comment_id: number | null
    task_id: number | null
    user_id: number | null
  }

  export type CommentsMinAggregateOutputType = {
    comment_id: number | null
    content: string | null
    task_id: number | null
    user_id: number | null
  }

  export type CommentsMaxAggregateOutputType = {
    comment_id: number | null
    content: string | null
    task_id: number | null
    user_id: number | null
  }

  export type CommentsCountAggregateOutputType = {
    comment_id: number
    content: number
    task_id: number
    user_id: number
    _all: number
  }


  export type CommentsAvgAggregateInputType = {
    comment_id?: true
    task_id?: true
    user_id?: true
  }

  export type CommentsSumAggregateInputType = {
    comment_id?: true
    task_id?: true
    user_id?: true
  }

  export type CommentsMinAggregateInputType = {
    comment_id?: true
    content?: true
    task_id?: true
    user_id?: true
  }

  export type CommentsMaxAggregateInputType = {
    comment_id?: true
    content?: true
    task_id?: true
    user_id?: true
  }

  export type CommentsCountAggregateInputType = {
    comment_id?: true
    content?: true
    task_id?: true
    user_id?: true
    _all?: true
  }

  export type CommentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comments to aggregate.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned comments
    **/
    _count?: true | CommentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentsMaxAggregateInputType
  }

  export type GetCommentsAggregateType<T extends CommentsAggregateArgs> = {
        [P in keyof T & keyof AggregateComments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComments[P]>
      : GetScalarType<T[P], AggregateComments[P]>
  }




  export type commentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentsWhereInput
    orderBy?: commentsOrderByWithAggregationInput | commentsOrderByWithAggregationInput[]
    by: CommentsScalarFieldEnum[] | CommentsScalarFieldEnum
    having?: commentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentsCountAggregateInputType | true
    _avg?: CommentsAvgAggregateInputType
    _sum?: CommentsSumAggregateInputType
    _min?: CommentsMinAggregateInputType
    _max?: CommentsMaxAggregateInputType
  }

  export type CommentsGroupByOutputType = {
    comment_id: number
    content: string | null
    task_id: number | null
    user_id: number | null
    _count: CommentsCountAggregateOutputType | null
    _avg: CommentsAvgAggregateOutputType | null
    _sum: CommentsSumAggregateOutputType | null
    _min: CommentsMinAggregateOutputType | null
    _max: CommentsMaxAggregateOutputType | null
  }

  type GetCommentsGroupByPayload<T extends commentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentsGroupByOutputType[P]>
            : GetScalarType<T[P], CommentsGroupByOutputType[P]>
        }
      >
    >


  export type commentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    comment_id?: boolean
    content?: boolean
    task_id?: boolean
    user_id?: boolean
    tasks?: boolean | comments$tasksArgs<ExtArgs>
    users?: boolean | comments$usersArgs<ExtArgs>
  }, ExtArgs["result"]["comments"]>



  export type commentsSelectScalar = {
    comment_id?: boolean
    content?: boolean
    task_id?: boolean
    user_id?: boolean
  }

  export type commentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"comment_id" | "content" | "task_id" | "user_id", ExtArgs["result"]["comments"]>
  export type commentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | comments$tasksArgs<ExtArgs>
    users?: boolean | comments$usersArgs<ExtArgs>
  }

  export type $commentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "comments"
    objects: {
      tasks: Prisma.$tasksPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      comment_id: number
      content: string | null
      task_id: number | null
      user_id: number | null
    }, ExtArgs["result"]["comments"]>
    composites: {}
  }

  type commentsGetPayload<S extends boolean | null | undefined | commentsDefaultArgs> = $Result.GetResult<Prisma.$commentsPayload, S>

  type commentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<commentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentsCountAggregateInputType | true
    }

  export interface commentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['comments'], meta: { name: 'comments' } }
    /**
     * Find zero or one Comments that matches the filter.
     * @param {commentsFindUniqueArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends commentsFindUniqueArgs>(args: SelectSubset<T, commentsFindUniqueArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {commentsFindUniqueOrThrowArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends commentsFindUniqueOrThrowArgs>(args: SelectSubset<T, commentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsFindFirstArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends commentsFindFirstArgs>(args?: SelectSubset<T, commentsFindFirstArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsFindFirstOrThrowArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends commentsFindFirstOrThrowArgs>(args?: SelectSubset<T, commentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comments.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comments.findMany({ take: 10 })
     * 
     * // Only select the `comment_id`
     * const commentsWithComment_idOnly = await prisma.comments.findMany({ select: { comment_id: true } })
     * 
     */
    findMany<T extends commentsFindManyArgs>(args?: SelectSubset<T, commentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comments.
     * @param {commentsCreateArgs} args - Arguments to create a Comments.
     * @example
     * // Create one Comments
     * const Comments = await prisma.comments.create({
     *   data: {
     *     // ... data to create a Comments
     *   }
     * })
     * 
     */
    create<T extends commentsCreateArgs>(args: SelectSubset<T, commentsCreateArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {commentsCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comments = await prisma.comments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends commentsCreateManyArgs>(args?: SelectSubset<T, commentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comments.
     * @param {commentsDeleteArgs} args - Arguments to delete one Comments.
     * @example
     * // Delete one Comments
     * const Comments = await prisma.comments.delete({
     *   where: {
     *     // ... filter to delete one Comments
     *   }
     * })
     * 
     */
    delete<T extends commentsDeleteArgs>(args: SelectSubset<T, commentsDeleteArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comments.
     * @param {commentsUpdateArgs} args - Arguments to update one Comments.
     * @example
     * // Update one Comments
     * const comments = await prisma.comments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends commentsUpdateArgs>(args: SelectSubset<T, commentsUpdateArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {commentsDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends commentsDeleteManyArgs>(args?: SelectSubset<T, commentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comments = await prisma.comments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends commentsUpdateManyArgs>(args: SelectSubset<T, commentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comments.
     * @param {commentsUpsertArgs} args - Arguments to update or create a Comments.
     * @example
     * // Update or create a Comments
     * const comments = await prisma.comments.upsert({
     *   create: {
     *     // ... data to create a Comments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comments we want to update
     *   }
     * })
     */
    upsert<T extends commentsUpsertArgs>(args: SelectSubset<T, commentsUpsertArgs<ExtArgs>>): Prisma__commentsClient<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comments.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends commentsCountArgs>(
      args?: Subset<T, commentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentsAggregateArgs>(args: Subset<T, CommentsAggregateArgs>): Prisma.PrismaPromise<GetCommentsAggregateType<T>>

    /**
     * Group by Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentsGroupByArgs} args - Group by arguments.
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
      T extends commentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: commentsGroupByArgs['orderBy'] }
        : { orderBy?: commentsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, commentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the comments model
   */
  readonly fields: commentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for comments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__commentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends comments$tasksArgs<ExtArgs> = {}>(args?: Subset<T, comments$tasksArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends comments$usersArgs<ExtArgs> = {}>(args?: Subset<T, comments$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the comments model
   */
  interface commentsFieldRefs {
    readonly comment_id: FieldRef<"comments", 'Int'>
    readonly content: FieldRef<"comments", 'String'>
    readonly task_id: FieldRef<"comments", 'Int'>
    readonly user_id: FieldRef<"comments", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * comments findUnique
   */
  export type commentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments findUniqueOrThrow
   */
  export type commentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments findFirst
   */
  export type commentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * comments findFirstOrThrow
   */
  export type commentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * comments findMany
   */
  export type commentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing comments.
     */
    cursor?: commentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * comments create
   */
  export type commentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * The data needed to create a comments.
     */
    data?: XOR<commentsCreateInput, commentsUncheckedCreateInput>
  }

  /**
   * comments createMany
   */
  export type commentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many comments.
     */
    data: commentsCreateManyInput | commentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * comments update
   */
  export type commentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * The data needed to update a comments.
     */
    data: XOR<commentsUpdateInput, commentsUncheckedUpdateInput>
    /**
     * Choose, which comments to update.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments updateMany
   */
  export type commentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update comments.
     */
    data: XOR<commentsUpdateManyMutationInput, commentsUncheckedUpdateManyInput>
    /**
     * Filter which comments to update
     */
    where?: commentsWhereInput
    /**
     * Limit how many comments to update.
     */
    limit?: number
  }

  /**
   * comments upsert
   */
  export type commentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * The filter to search for the comments to update in case it exists.
     */
    where: commentsWhereUniqueInput
    /**
     * In case the comments found by the `where` argument doesn't exist, create a new comments with this data.
     */
    create: XOR<commentsCreateInput, commentsUncheckedCreateInput>
    /**
     * In case the comments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<commentsUpdateInput, commentsUncheckedUpdateInput>
  }

  /**
   * comments delete
   */
  export type commentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    /**
     * Filter which comments to delete.
     */
    where: commentsWhereUniqueInput
  }

  /**
   * comments deleteMany
   */
  export type commentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comments to delete
     */
    where?: commentsWhereInput
    /**
     * Limit how many comments to delete.
     */
    limit?: number
  }

  /**
   * comments.tasks
   */
  export type comments$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    where?: tasksWhereInput
  }

  /**
   * comments.users
   */
  export type comments$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * comments without action
   */
  export type commentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
  }


  /**
   * Model projects
   */

  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsAvgAggregateOutputType = {
    project_id: number | null
  }

  export type ProjectsSumAggregateOutputType = {
    project_id: number | null
  }

  export type ProjectsMinAggregateOutputType = {
    project_id: number | null
    name: string | null
    description: string | null
    status: $Enums.projects_status | null
    priority: $Enums.projects_priority | null
    start_date: Date | null
    due_date: Date | null
    created_at: Date | null
  }

  export type ProjectsMaxAggregateOutputType = {
    project_id: number | null
    name: string | null
    description: string | null
    status: $Enums.projects_status | null
    priority: $Enums.projects_priority | null
    start_date: Date | null
    due_date: Date | null
    created_at: Date | null
  }

  export type ProjectsCountAggregateOutputType = {
    project_id: number
    name: number
    description: number
    status: number
    priority: number
    start_date: number
    due_date: number
    created_at: number
    _all: number
  }


  export type ProjectsAvgAggregateInputType = {
    project_id?: true
  }

  export type ProjectsSumAggregateInputType = {
    project_id?: true
  }

  export type ProjectsMinAggregateInputType = {
    project_id?: true
    name?: true
    description?: true
    status?: true
    priority?: true
    start_date?: true
    due_date?: true
    created_at?: true
  }

  export type ProjectsMaxAggregateInputType = {
    project_id?: true
    name?: true
    description?: true
    status?: true
    priority?: true
    start_date?: true
    due_date?: true
    created_at?: true
  }

  export type ProjectsCountAggregateInputType = {
    project_id?: true
    name?: true
    description?: true
    status?: true
    priority?: true
    start_date?: true
    due_date?: true
    created_at?: true
    _all?: true
  }

  export type ProjectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to aggregate.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type projectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithAggregationInput | projectsOrderByWithAggregationInput[]
    by: ProjectsScalarFieldEnum[] | ProjectsScalarFieldEnum
    having?: projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _avg?: ProjectsAvgAggregateInputType
    _sum?: ProjectsSumAggregateInputType
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }

  export type ProjectsGroupByOutputType = {
    project_id: number
    name: string
    description: string | null
    status: $Enums.projects_status | null
    priority: $Enums.projects_priority | null
    start_date: Date | null
    due_date: Date | null
    created_at: Date | null
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type projectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    project_id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    start_date?: boolean
    due_date?: boolean
    created_at?: boolean
    tasks?: boolean | projects$tasksArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>



  export type projectsSelectScalar = {
    project_id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    start_date?: boolean
    due_date?: boolean
    created_at?: boolean
  }

  export type projectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"project_id" | "name" | "description" | "status" | "priority" | "start_date" | "due_date" | "created_at", ExtArgs["result"]["projects"]>
  export type projectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | projects$tasksArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $projectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "projects"
    objects: {
      tasks: Prisma.$tasksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      project_id: number
      name: string
      description: string | null
      status: $Enums.projects_status | null
      priority: $Enums.projects_priority | null
      start_date: Date | null
      due_date: Date | null
      created_at: Date | null
    }, ExtArgs["result"]["projects"]>
    composites: {}
  }

  type projectsGetPayload<S extends boolean | null | undefined | projectsDefaultArgs> = $Result.GetResult<Prisma.$projectsPayload, S>

  type projectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectsCountAggregateInputType | true
    }

  export interface projectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['projects'], meta: { name: 'projects' } }
    /**
     * Find zero or one Projects that matches the filter.
     * @param {projectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectsFindUniqueArgs>(args: SelectSubset<T, projectsFindUniqueArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectsFindFirstArgs>(args?: SelectSubset<T, projectsFindFirstArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `project_id`
     * const projectsWithProject_idOnly = await prisma.projects.findMany({ select: { project_id: true } })
     * 
     */
    findMany<T extends projectsFindManyArgs>(args?: SelectSubset<T, projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projects.
     * @param {projectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
     */
    create<T extends projectsCreateArgs>(args: SelectSubset<T, projectsCreateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectsCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectsCreateManyArgs>(args?: SelectSubset<T, projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Projects.
     * @param {projectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
     */
    delete<T extends projectsDeleteArgs>(args: SelectSubset<T, projectsDeleteArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projects.
     * @param {projectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectsUpdateArgs>(args: SelectSubset<T, projectsUpdateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectsDeleteManyArgs>(args?: SelectSubset<T, projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectsUpdateManyArgs>(args: SelectSubset<T, projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Projects.
     * @param {projectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
     */
    upsert<T extends projectsUpsertArgs>(args: SelectSubset<T, projectsUpsertArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectsCountArgs>(
      args?: Subset<T, projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): Prisma.PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsGroupByArgs} args - Group by arguments.
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
      T extends projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectsGroupByArgs['orderBy'] }
        : { orderBy?: projectsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the projects model
   */
  readonly fields: projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends projects$tasksArgs<ExtArgs> = {}>(args?: Subset<T, projects$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the projects model
   */
  interface projectsFieldRefs {
    readonly project_id: FieldRef<"projects", 'Int'>
    readonly name: FieldRef<"projects", 'String'>
    readonly description: FieldRef<"projects", 'String'>
    readonly status: FieldRef<"projects", 'projects_status'>
    readonly priority: FieldRef<"projects", 'projects_priority'>
    readonly start_date: FieldRef<"projects", 'DateTime'>
    readonly due_date: FieldRef<"projects", 'DateTime'>
    readonly created_at: FieldRef<"projects", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * projects findUnique
   */
  export type projectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findUniqueOrThrow
   */
  export type projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findFirst
   */
  export type projectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findFirstOrThrow
   */
  export type projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findMany
   */
  export type projectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects create
   */
  export type projectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a projects.
     */
    data: XOR<projectsCreateInput, projectsUncheckedCreateInput>
  }

  /**
   * projects createMany
   */
  export type projectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * projects update
   */
  export type projectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a projects.
     */
    data: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
    /**
     * Choose, which projects to update.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects updateMany
   */
  export type projectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects upsert
   */
  export type projectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the projects to update in case it exists.
     */
    where: projectsWhereUniqueInput
    /**
     * In case the projects found by the `where` argument doesn't exist, create a new projects with this data.
     */
    create: XOR<projectsCreateInput, projectsUncheckedCreateInput>
    /**
     * In case the projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
  }

  /**
   * projects delete
   */
  export type projectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter which projects to delete.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects deleteMany
   */
  export type projectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * projects.tasks
   */
  export type projects$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    where?: tasksWhereInput
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    cursor?: tasksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TasksScalarFieldEnum | TasksScalarFieldEnum[]
  }

  /**
   * projects without action
   */
  export type projectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
  }


  /**
   * Model subtasks
   */

  export type AggregateSubtasks = {
    _count: SubtasksCountAggregateOutputType | null
    _avg: SubtasksAvgAggregateOutputType | null
    _sum: SubtasksSumAggregateOutputType | null
    _min: SubtasksMinAggregateOutputType | null
    _max: SubtasksMaxAggregateOutputType | null
  }

  export type SubtasksAvgAggregateOutputType = {
    subtask_id: number | null
    task_id: number | null
  }

  export type SubtasksSumAggregateOutputType = {
    subtask_id: number | null
    task_id: number | null
  }

  export type SubtasksMinAggregateOutputType = {
    subtask_id: number | null
    title: string | null
    completed: boolean | null
    task_id: number | null
  }

  export type SubtasksMaxAggregateOutputType = {
    subtask_id: number | null
    title: string | null
    completed: boolean | null
    task_id: number | null
  }

  export type SubtasksCountAggregateOutputType = {
    subtask_id: number
    title: number
    completed: number
    task_id: number
    _all: number
  }


  export type SubtasksAvgAggregateInputType = {
    subtask_id?: true
    task_id?: true
  }

  export type SubtasksSumAggregateInputType = {
    subtask_id?: true
    task_id?: true
  }

  export type SubtasksMinAggregateInputType = {
    subtask_id?: true
    title?: true
    completed?: true
    task_id?: true
  }

  export type SubtasksMaxAggregateInputType = {
    subtask_id?: true
    title?: true
    completed?: true
    task_id?: true
  }

  export type SubtasksCountAggregateInputType = {
    subtask_id?: true
    title?: true
    completed?: true
    task_id?: true
    _all?: true
  }

  export type SubtasksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subtasks to aggregate.
     */
    where?: subtasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subtasks to fetch.
     */
    orderBy?: subtasksOrderByWithRelationInput | subtasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subtasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subtasks
    **/
    _count?: true | SubtasksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubtasksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubtasksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubtasksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubtasksMaxAggregateInputType
  }

  export type GetSubtasksAggregateType<T extends SubtasksAggregateArgs> = {
        [P in keyof T & keyof AggregateSubtasks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubtasks[P]>
      : GetScalarType<T[P], AggregateSubtasks[P]>
  }




  export type subtasksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subtasksWhereInput
    orderBy?: subtasksOrderByWithAggregationInput | subtasksOrderByWithAggregationInput[]
    by: SubtasksScalarFieldEnum[] | SubtasksScalarFieldEnum
    having?: subtasksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubtasksCountAggregateInputType | true
    _avg?: SubtasksAvgAggregateInputType
    _sum?: SubtasksSumAggregateInputType
    _min?: SubtasksMinAggregateInputType
    _max?: SubtasksMaxAggregateInputType
  }

  export type SubtasksGroupByOutputType = {
    subtask_id: number
    title: string | null
    completed: boolean | null
    task_id: number
    _count: SubtasksCountAggregateOutputType | null
    _avg: SubtasksAvgAggregateOutputType | null
    _sum: SubtasksSumAggregateOutputType | null
    _min: SubtasksMinAggregateOutputType | null
    _max: SubtasksMaxAggregateOutputType | null
  }

  type GetSubtasksGroupByPayload<T extends subtasksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubtasksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubtasksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubtasksGroupByOutputType[P]>
            : GetScalarType<T[P], SubtasksGroupByOutputType[P]>
        }
      >
    >


  export type subtasksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subtask_id?: boolean
    title?: boolean
    completed?: boolean
    task_id?: boolean
    tasks?: boolean | tasksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtasks"]>



  export type subtasksSelectScalar = {
    subtask_id?: boolean
    title?: boolean
    completed?: boolean
    task_id?: boolean
  }

  export type subtasksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"subtask_id" | "title" | "completed" | "task_id", ExtArgs["result"]["subtasks"]>
  export type subtasksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | tasksDefaultArgs<ExtArgs>
  }

  export type $subtasksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subtasks"
    objects: {
      tasks: Prisma.$tasksPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      subtask_id: number
      title: string | null
      completed: boolean | null
      task_id: number
    }, ExtArgs["result"]["subtasks"]>
    composites: {}
  }

  type subtasksGetPayload<S extends boolean | null | undefined | subtasksDefaultArgs> = $Result.GetResult<Prisma.$subtasksPayload, S>

  type subtasksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subtasksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubtasksCountAggregateInputType | true
    }

  export interface subtasksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subtasks'], meta: { name: 'subtasks' } }
    /**
     * Find zero or one Subtasks that matches the filter.
     * @param {subtasksFindUniqueArgs} args - Arguments to find a Subtasks
     * @example
     * // Get one Subtasks
     * const subtasks = await prisma.subtasks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subtasksFindUniqueArgs>(args: SelectSubset<T, subtasksFindUniqueArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subtasks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subtasksFindUniqueOrThrowArgs} args - Arguments to find a Subtasks
     * @example
     * // Get one Subtasks
     * const subtasks = await prisma.subtasks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subtasksFindUniqueOrThrowArgs>(args: SelectSubset<T, subtasksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subtasksFindFirstArgs} args - Arguments to find a Subtasks
     * @example
     * // Get one Subtasks
     * const subtasks = await prisma.subtasks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subtasksFindFirstArgs>(args?: SelectSubset<T, subtasksFindFirstArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtasks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subtasksFindFirstOrThrowArgs} args - Arguments to find a Subtasks
     * @example
     * // Get one Subtasks
     * const subtasks = await prisma.subtasks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subtasksFindFirstOrThrowArgs>(args?: SelectSubset<T, subtasksFindFirstOrThrowArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subtasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subtasksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subtasks
     * const subtasks = await prisma.subtasks.findMany()
     * 
     * // Get first 10 Subtasks
     * const subtasks = await prisma.subtasks.findMany({ take: 10 })
     * 
     * // Only select the `subtask_id`
     * const subtasksWithSubtask_idOnly = await prisma.subtasks.findMany({ select: { subtask_id: true } })
     * 
     */
    findMany<T extends subtasksFindManyArgs>(args?: SelectSubset<T, subtasksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subtasks.
     * @param {subtasksCreateArgs} args - Arguments to create a Subtasks.
     * @example
     * // Create one Subtasks
     * const Subtasks = await prisma.subtasks.create({
     *   data: {
     *     // ... data to create a Subtasks
     *   }
     * })
     * 
     */
    create<T extends subtasksCreateArgs>(args: SelectSubset<T, subtasksCreateArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subtasks.
     * @param {subtasksCreateManyArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtasks = await prisma.subtasks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subtasksCreateManyArgs>(args?: SelectSubset<T, subtasksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Subtasks.
     * @param {subtasksDeleteArgs} args - Arguments to delete one Subtasks.
     * @example
     * // Delete one Subtasks
     * const Subtasks = await prisma.subtasks.delete({
     *   where: {
     *     // ... filter to delete one Subtasks
     *   }
     * })
     * 
     */
    delete<T extends subtasksDeleteArgs>(args: SelectSubset<T, subtasksDeleteArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subtasks.
     * @param {subtasksUpdateArgs} args - Arguments to update one Subtasks.
     * @example
     * // Update one Subtasks
     * const subtasks = await prisma.subtasks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subtasksUpdateArgs>(args: SelectSubset<T, subtasksUpdateArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subtasks.
     * @param {subtasksDeleteManyArgs} args - Arguments to filter Subtasks to delete.
     * @example
     * // Delete a few Subtasks
     * const { count } = await prisma.subtasks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subtasksDeleteManyArgs>(args?: SelectSubset<T, subtasksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subtasksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subtasks
     * const subtasks = await prisma.subtasks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subtasksUpdateManyArgs>(args: SelectSubset<T, subtasksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subtasks.
     * @param {subtasksUpsertArgs} args - Arguments to update or create a Subtasks.
     * @example
     * // Update or create a Subtasks
     * const subtasks = await prisma.subtasks.upsert({
     *   create: {
     *     // ... data to create a Subtasks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subtasks we want to update
     *   }
     * })
     */
    upsert<T extends subtasksUpsertArgs>(args: SelectSubset<T, subtasksUpsertArgs<ExtArgs>>): Prisma__subtasksClient<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subtasksCountArgs} args - Arguments to filter Subtasks to count.
     * @example
     * // Count the number of Subtasks
     * const count = await prisma.subtasks.count({
     *   where: {
     *     // ... the filter for the Subtasks we want to count
     *   }
     * })
    **/
    count<T extends subtasksCountArgs>(
      args?: Subset<T, subtasksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubtasksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtasksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubtasksAggregateArgs>(args: Subset<T, SubtasksAggregateArgs>): Prisma.PrismaPromise<GetSubtasksAggregateType<T>>

    /**
     * Group by Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subtasksGroupByArgs} args - Group by arguments.
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
      T extends subtasksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subtasksGroupByArgs['orderBy'] }
        : { orderBy?: subtasksGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, subtasksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubtasksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subtasks model
   */
  readonly fields: subtasksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subtasks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subtasksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends tasksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tasksDefaultArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the subtasks model
   */
  interface subtasksFieldRefs {
    readonly subtask_id: FieldRef<"subtasks", 'Int'>
    readonly title: FieldRef<"subtasks", 'String'>
    readonly completed: FieldRef<"subtasks", 'Boolean'>
    readonly task_id: FieldRef<"subtasks", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * subtasks findUnique
   */
  export type subtasksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * Filter, which subtasks to fetch.
     */
    where: subtasksWhereUniqueInput
  }

  /**
   * subtasks findUniqueOrThrow
   */
  export type subtasksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * Filter, which subtasks to fetch.
     */
    where: subtasksWhereUniqueInput
  }

  /**
   * subtasks findFirst
   */
  export type subtasksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * Filter, which subtasks to fetch.
     */
    where?: subtasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subtasks to fetch.
     */
    orderBy?: subtasksOrderByWithRelationInput | subtasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subtasks.
     */
    cursor?: subtasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subtasks.
     */
    distinct?: SubtasksScalarFieldEnum | SubtasksScalarFieldEnum[]
  }

  /**
   * subtasks findFirstOrThrow
   */
  export type subtasksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * Filter, which subtasks to fetch.
     */
    where?: subtasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subtasks to fetch.
     */
    orderBy?: subtasksOrderByWithRelationInput | subtasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subtasks.
     */
    cursor?: subtasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subtasks.
     */
    distinct?: SubtasksScalarFieldEnum | SubtasksScalarFieldEnum[]
  }

  /**
   * subtasks findMany
   */
  export type subtasksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * Filter, which subtasks to fetch.
     */
    where?: subtasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subtasks to fetch.
     */
    orderBy?: subtasksOrderByWithRelationInput | subtasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subtasks.
     */
    cursor?: subtasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subtasks.
     */
    skip?: number
    distinct?: SubtasksScalarFieldEnum | SubtasksScalarFieldEnum[]
  }

  /**
   * subtasks create
   */
  export type subtasksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * The data needed to create a subtasks.
     */
    data: XOR<subtasksCreateInput, subtasksUncheckedCreateInput>
  }

  /**
   * subtasks createMany
   */
  export type subtasksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subtasks.
     */
    data: subtasksCreateManyInput | subtasksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subtasks update
   */
  export type subtasksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * The data needed to update a subtasks.
     */
    data: XOR<subtasksUpdateInput, subtasksUncheckedUpdateInput>
    /**
     * Choose, which subtasks to update.
     */
    where: subtasksWhereUniqueInput
  }

  /**
   * subtasks updateMany
   */
  export type subtasksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subtasks.
     */
    data: XOR<subtasksUpdateManyMutationInput, subtasksUncheckedUpdateManyInput>
    /**
     * Filter which subtasks to update
     */
    where?: subtasksWhereInput
    /**
     * Limit how many subtasks to update.
     */
    limit?: number
  }

  /**
   * subtasks upsert
   */
  export type subtasksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * The filter to search for the subtasks to update in case it exists.
     */
    where: subtasksWhereUniqueInput
    /**
     * In case the subtasks found by the `where` argument doesn't exist, create a new subtasks with this data.
     */
    create: XOR<subtasksCreateInput, subtasksUncheckedCreateInput>
    /**
     * In case the subtasks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subtasksUpdateInput, subtasksUncheckedUpdateInput>
  }

  /**
   * subtasks delete
   */
  export type subtasksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    /**
     * Filter which subtasks to delete.
     */
    where: subtasksWhereUniqueInput
  }

  /**
   * subtasks deleteMany
   */
  export type subtasksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subtasks to delete
     */
    where?: subtasksWhereInput
    /**
     * Limit how many subtasks to delete.
     */
    limit?: number
  }

  /**
   * subtasks without action
   */
  export type subtasksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
  }


  /**
   * Model tags
   */

  export type AggregateTags = {
    _count: TagsCountAggregateOutputType | null
    _avg: TagsAvgAggregateOutputType | null
    _sum: TagsSumAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  export type TagsAvgAggregateOutputType = {
    tag_id: number | null
  }

  export type TagsSumAggregateOutputType = {
    tag_id: number | null
  }

  export type TagsMinAggregateOutputType = {
    tag_id: number | null
    name: string | null
  }

  export type TagsMaxAggregateOutputType = {
    tag_id: number | null
    name: string | null
  }

  export type TagsCountAggregateOutputType = {
    tag_id: number
    name: number
    _all: number
  }


  export type TagsAvgAggregateInputType = {
    tag_id?: true
  }

  export type TagsSumAggregateInputType = {
    tag_id?: true
  }

  export type TagsMinAggregateInputType = {
    tag_id?: true
    name?: true
  }

  export type TagsMaxAggregateInputType = {
    tag_id?: true
    name?: true
  }

  export type TagsCountAggregateInputType = {
    tag_id?: true
    name?: true
    _all?: true
  }

  export type TagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to aggregate.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tags
    **/
    _count?: true | TagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagsMaxAggregateInputType
  }

  export type GetTagsAggregateType<T extends TagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTags[P]>
      : GetScalarType<T[P], AggregateTags[P]>
  }




  export type tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tagsWhereInput
    orderBy?: tagsOrderByWithAggregationInput | tagsOrderByWithAggregationInput[]
    by: TagsScalarFieldEnum[] | TagsScalarFieldEnum
    having?: tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagsCountAggregateInputType | true
    _avg?: TagsAvgAggregateInputType
    _sum?: TagsSumAggregateInputType
    _min?: TagsMinAggregateInputType
    _max?: TagsMaxAggregateInputType
  }

  export type TagsGroupByOutputType = {
    tag_id: number
    name: string
    _count: TagsCountAggregateOutputType | null
    _avg: TagsAvgAggregateOutputType | null
    _sum: TagsSumAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  type GetTagsGroupByPayload<T extends tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagsGroupByOutputType[P]>
            : GetScalarType<T[P], TagsGroupByOutputType[P]>
        }
      >
    >


  export type tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tag_id?: boolean
    name?: boolean
    task_tags?: boolean | tags$task_tagsArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tags"]>



  export type tagsSelectScalar = {
    tag_id?: boolean
    name?: boolean
  }

  export type tagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tag_id" | "name", ExtArgs["result"]["tags"]>
  export type tagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task_tags?: boolean | tags$task_tagsArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tags"
    objects: {
      task_tags: Prisma.$task_tagsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tag_id: number
      name: string
    }, ExtArgs["result"]["tags"]>
    composites: {}
  }

  type tagsGetPayload<S extends boolean | null | undefined | tagsDefaultArgs> = $Result.GetResult<Prisma.$tagsPayload, S>

  type tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagsCountAggregateInputType | true
    }

  export interface tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tags'], meta: { name: 'tags' } }
    /**
     * Find zero or one Tags that matches the filter.
     * @param {tagsFindUniqueArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tagsFindUniqueArgs>(args: SelectSubset<T, tagsFindUniqueArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tagsFindUniqueOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindFirstArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tagsFindFirstArgs>(args?: SelectSubset<T, tagsFindFirstArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindFirstOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tags.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tags.findMany({ take: 10 })
     * 
     * // Only select the `tag_id`
     * const tagsWithTag_idOnly = await prisma.tags.findMany({ select: { tag_id: true } })
     * 
     */
    findMany<T extends tagsFindManyArgs>(args?: SelectSubset<T, tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tags.
     * @param {tagsCreateArgs} args - Arguments to create a Tags.
     * @example
     * // Create one Tags
     * const Tags = await prisma.tags.create({
     *   data: {
     *     // ... data to create a Tags
     *   }
     * })
     * 
     */
    create<T extends tagsCreateArgs>(args: SelectSubset<T, tagsCreateArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {tagsCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tags = await prisma.tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tagsCreateManyArgs>(args?: SelectSubset<T, tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tags.
     * @param {tagsDeleteArgs} args - Arguments to delete one Tags.
     * @example
     * // Delete one Tags
     * const Tags = await prisma.tags.delete({
     *   where: {
     *     // ... filter to delete one Tags
     *   }
     * })
     * 
     */
    delete<T extends tagsDeleteArgs>(args: SelectSubset<T, tagsDeleteArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tags.
     * @param {tagsUpdateArgs} args - Arguments to update one Tags.
     * @example
     * // Update one Tags
     * const tags = await prisma.tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tagsUpdateArgs>(args: SelectSubset<T, tagsUpdateArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {tagsDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tagsDeleteManyArgs>(args?: SelectSubset<T, tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tagsUpdateManyArgs>(args: SelectSubset<T, tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tags.
     * @param {tagsUpsertArgs} args - Arguments to update or create a Tags.
     * @example
     * // Update or create a Tags
     * const tags = await prisma.tags.upsert({
     *   create: {
     *     // ... data to create a Tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tags we want to update
     *   }
     * })
     */
    upsert<T extends tagsUpsertArgs>(args: SelectSubset<T, tagsUpsertArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tags.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends tagsCountArgs>(
      args?: Subset<T, tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TagsAggregateArgs>(args: Subset<T, TagsAggregateArgs>): Prisma.PrismaPromise<GetTagsAggregateType<T>>

    /**
     * Group by Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsGroupByArgs} args - Group by arguments.
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
      T extends tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tagsGroupByArgs['orderBy'] }
        : { orderBy?: tagsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tags model
   */
  readonly fields: tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task_tags<T extends tags$task_tagsArgs<ExtArgs> = {}>(args?: Subset<T, tags$task_tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the tags model
   */
  interface tagsFieldRefs {
    readonly tag_id: FieldRef<"tags", 'Int'>
    readonly name: FieldRef<"tags", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tags findUnique
   */
  export type tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags findUniqueOrThrow
   */
  export type tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags findFirst
   */
  export type tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags findFirstOrThrow
   */
  export type tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags findMany
   */
  export type tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags create
   */
  export type tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The data needed to create a tags.
     */
    data: XOR<tagsCreateInput, tagsUncheckedCreateInput>
  }

  /**
   * tags createMany
   */
  export type tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tags.
     */
    data: tagsCreateManyInput | tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tags update
   */
  export type tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The data needed to update a tags.
     */
    data: XOR<tagsUpdateInput, tagsUncheckedUpdateInput>
    /**
     * Choose, which tags to update.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags updateMany
   */
  export type tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tags.
     */
    data: XOR<tagsUpdateManyMutationInput, tagsUncheckedUpdateManyInput>
    /**
     * Filter which tags to update
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to update.
     */
    limit?: number
  }

  /**
   * tags upsert
   */
  export type tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The filter to search for the tags to update in case it exists.
     */
    where: tagsWhereUniqueInput
    /**
     * In case the tags found by the `where` argument doesn't exist, create a new tags with this data.
     */
    create: XOR<tagsCreateInput, tagsUncheckedCreateInput>
    /**
     * In case the tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tagsUpdateInput, tagsUncheckedUpdateInput>
  }

  /**
   * tags delete
   */
  export type tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter which tags to delete.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags deleteMany
   */
  export type tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to delete
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to delete.
     */
    limit?: number
  }

  /**
   * tags.task_tags
   */
  export type tags$task_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    where?: task_tagsWhereInput
    orderBy?: task_tagsOrderByWithRelationInput | task_tagsOrderByWithRelationInput[]
    cursor?: task_tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Task_tagsScalarFieldEnum | Task_tagsScalarFieldEnum[]
  }

  /**
   * tags without action
   */
  export type tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
  }


  /**
   * Model task_tags
   */

  export type AggregateTask_tags = {
    _count: Task_tagsCountAggregateOutputType | null
    _avg: Task_tagsAvgAggregateOutputType | null
    _sum: Task_tagsSumAggregateOutputType | null
    _min: Task_tagsMinAggregateOutputType | null
    _max: Task_tagsMaxAggregateOutputType | null
  }

  export type Task_tagsAvgAggregateOutputType = {
    task_id: number | null
    tag_id: number | null
  }

  export type Task_tagsSumAggregateOutputType = {
    task_id: number | null
    tag_id: number | null
  }

  export type Task_tagsMinAggregateOutputType = {
    task_id: number | null
    tag_id: number | null
  }

  export type Task_tagsMaxAggregateOutputType = {
    task_id: number | null
    tag_id: number | null
  }

  export type Task_tagsCountAggregateOutputType = {
    task_id: number
    tag_id: number
    _all: number
  }


  export type Task_tagsAvgAggregateInputType = {
    task_id?: true
    tag_id?: true
  }

  export type Task_tagsSumAggregateInputType = {
    task_id?: true
    tag_id?: true
  }

  export type Task_tagsMinAggregateInputType = {
    task_id?: true
    tag_id?: true
  }

  export type Task_tagsMaxAggregateInputType = {
    task_id?: true
    tag_id?: true
  }

  export type Task_tagsCountAggregateInputType = {
    task_id?: true
    tag_id?: true
    _all?: true
  }

  export type Task_tagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which task_tags to aggregate.
     */
    where?: task_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_tags to fetch.
     */
    orderBy?: task_tagsOrderByWithRelationInput | task_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: task_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned task_tags
    **/
    _count?: true | Task_tagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Task_tagsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Task_tagsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Task_tagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Task_tagsMaxAggregateInputType
  }

  export type GetTask_tagsAggregateType<T extends Task_tagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTask_tags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask_tags[P]>
      : GetScalarType<T[P], AggregateTask_tags[P]>
  }




  export type task_tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: task_tagsWhereInput
    orderBy?: task_tagsOrderByWithAggregationInput | task_tagsOrderByWithAggregationInput[]
    by: Task_tagsScalarFieldEnum[] | Task_tagsScalarFieldEnum
    having?: task_tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Task_tagsCountAggregateInputType | true
    _avg?: Task_tagsAvgAggregateInputType
    _sum?: Task_tagsSumAggregateInputType
    _min?: Task_tagsMinAggregateInputType
    _max?: Task_tagsMaxAggregateInputType
  }

  export type Task_tagsGroupByOutputType = {
    task_id: number
    tag_id: number
    _count: Task_tagsCountAggregateOutputType | null
    _avg: Task_tagsAvgAggregateOutputType | null
    _sum: Task_tagsSumAggregateOutputType | null
    _min: Task_tagsMinAggregateOutputType | null
    _max: Task_tagsMaxAggregateOutputType | null
  }

  type GetTask_tagsGroupByPayload<T extends task_tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Task_tagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Task_tagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Task_tagsGroupByOutputType[P]>
            : GetScalarType<T[P], Task_tagsGroupByOutputType[P]>
        }
      >
    >


  export type task_tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    tag_id?: boolean
    tasks?: boolean | tasksDefaultArgs<ExtArgs>
    tags?: boolean | tagsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task_tags"]>



  export type task_tagsSelectScalar = {
    task_id?: boolean
    tag_id?: boolean
  }

  export type task_tagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"task_id" | "tag_id", ExtArgs["result"]["task_tags"]>
  export type task_tagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | tasksDefaultArgs<ExtArgs>
    tags?: boolean | tagsDefaultArgs<ExtArgs>
  }

  export type $task_tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "task_tags"
    objects: {
      tasks: Prisma.$tasksPayload<ExtArgs>
      tags: Prisma.$tagsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      task_id: number
      tag_id: number
    }, ExtArgs["result"]["task_tags"]>
    composites: {}
  }

  type task_tagsGetPayload<S extends boolean | null | undefined | task_tagsDefaultArgs> = $Result.GetResult<Prisma.$task_tagsPayload, S>

  type task_tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<task_tagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Task_tagsCountAggregateInputType | true
    }

  export interface task_tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['task_tags'], meta: { name: 'task_tags' } }
    /**
     * Find zero or one Task_tags that matches the filter.
     * @param {task_tagsFindUniqueArgs} args - Arguments to find a Task_tags
     * @example
     * // Get one Task_tags
     * const task_tags = await prisma.task_tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends task_tagsFindUniqueArgs>(args: SelectSubset<T, task_tagsFindUniqueArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task_tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {task_tagsFindUniqueOrThrowArgs} args - Arguments to find a Task_tags
     * @example
     * // Get one Task_tags
     * const task_tags = await prisma.task_tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends task_tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, task_tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_tagsFindFirstArgs} args - Arguments to find a Task_tags
     * @example
     * // Get one Task_tags
     * const task_tags = await prisma.task_tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends task_tagsFindFirstArgs>(args?: SelectSubset<T, task_tagsFindFirstArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task_tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_tagsFindFirstOrThrowArgs} args - Arguments to find a Task_tags
     * @example
     * // Get one Task_tags
     * const task_tags = await prisma.task_tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends task_tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, task_tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Task_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Task_tags
     * const task_tags = await prisma.task_tags.findMany()
     * 
     * // Get first 10 Task_tags
     * const task_tags = await prisma.task_tags.findMany({ take: 10 })
     * 
     * // Only select the `task_id`
     * const task_tagsWithTask_idOnly = await prisma.task_tags.findMany({ select: { task_id: true } })
     * 
     */
    findMany<T extends task_tagsFindManyArgs>(args?: SelectSubset<T, task_tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task_tags.
     * @param {task_tagsCreateArgs} args - Arguments to create a Task_tags.
     * @example
     * // Create one Task_tags
     * const Task_tags = await prisma.task_tags.create({
     *   data: {
     *     // ... data to create a Task_tags
     *   }
     * })
     * 
     */
    create<T extends task_tagsCreateArgs>(args: SelectSubset<T, task_tagsCreateArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Task_tags.
     * @param {task_tagsCreateManyArgs} args - Arguments to create many Task_tags.
     * @example
     * // Create many Task_tags
     * const task_tags = await prisma.task_tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends task_tagsCreateManyArgs>(args?: SelectSubset<T, task_tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Task_tags.
     * @param {task_tagsDeleteArgs} args - Arguments to delete one Task_tags.
     * @example
     * // Delete one Task_tags
     * const Task_tags = await prisma.task_tags.delete({
     *   where: {
     *     // ... filter to delete one Task_tags
     *   }
     * })
     * 
     */
    delete<T extends task_tagsDeleteArgs>(args: SelectSubset<T, task_tagsDeleteArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task_tags.
     * @param {task_tagsUpdateArgs} args - Arguments to update one Task_tags.
     * @example
     * // Update one Task_tags
     * const task_tags = await prisma.task_tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends task_tagsUpdateArgs>(args: SelectSubset<T, task_tagsUpdateArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Task_tags.
     * @param {task_tagsDeleteManyArgs} args - Arguments to filter Task_tags to delete.
     * @example
     * // Delete a few Task_tags
     * const { count } = await prisma.task_tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends task_tagsDeleteManyArgs>(args?: SelectSubset<T, task_tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Task_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Task_tags
     * const task_tags = await prisma.task_tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends task_tagsUpdateManyArgs>(args: SelectSubset<T, task_tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task_tags.
     * @param {task_tagsUpsertArgs} args - Arguments to update or create a Task_tags.
     * @example
     * // Update or create a Task_tags
     * const task_tags = await prisma.task_tags.upsert({
     *   create: {
     *     // ... data to create a Task_tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task_tags we want to update
     *   }
     * })
     */
    upsert<T extends task_tagsUpsertArgs>(args: SelectSubset<T, task_tagsUpsertArgs<ExtArgs>>): Prisma__task_tagsClient<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Task_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_tagsCountArgs} args - Arguments to filter Task_tags to count.
     * @example
     * // Count the number of Task_tags
     * const count = await prisma.task_tags.count({
     *   where: {
     *     // ... the filter for the Task_tags we want to count
     *   }
     * })
    **/
    count<T extends task_tagsCountArgs>(
      args?: Subset<T, task_tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Task_tagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Task_tagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Task_tagsAggregateArgs>(args: Subset<T, Task_tagsAggregateArgs>): Prisma.PrismaPromise<GetTask_tagsAggregateType<T>>

    /**
     * Group by Task_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_tagsGroupByArgs} args - Group by arguments.
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
      T extends task_tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: task_tagsGroupByArgs['orderBy'] }
        : { orderBy?: task_tagsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, task_tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTask_tagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the task_tags model
   */
  readonly fields: task_tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for task_tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__task_tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends tasksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tasksDefaultArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends tagsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tagsDefaultArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the task_tags model
   */
  interface task_tagsFieldRefs {
    readonly task_id: FieldRef<"task_tags", 'Int'>
    readonly tag_id: FieldRef<"task_tags", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * task_tags findUnique
   */
  export type task_tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * Filter, which task_tags to fetch.
     */
    where: task_tagsWhereUniqueInput
  }

  /**
   * task_tags findUniqueOrThrow
   */
  export type task_tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * Filter, which task_tags to fetch.
     */
    where: task_tagsWhereUniqueInput
  }

  /**
   * task_tags findFirst
   */
  export type task_tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * Filter, which task_tags to fetch.
     */
    where?: task_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_tags to fetch.
     */
    orderBy?: task_tagsOrderByWithRelationInput | task_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for task_tags.
     */
    cursor?: task_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of task_tags.
     */
    distinct?: Task_tagsScalarFieldEnum | Task_tagsScalarFieldEnum[]
  }

  /**
   * task_tags findFirstOrThrow
   */
  export type task_tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * Filter, which task_tags to fetch.
     */
    where?: task_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_tags to fetch.
     */
    orderBy?: task_tagsOrderByWithRelationInput | task_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for task_tags.
     */
    cursor?: task_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of task_tags.
     */
    distinct?: Task_tagsScalarFieldEnum | Task_tagsScalarFieldEnum[]
  }

  /**
   * task_tags findMany
   */
  export type task_tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * Filter, which task_tags to fetch.
     */
    where?: task_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_tags to fetch.
     */
    orderBy?: task_tagsOrderByWithRelationInput | task_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing task_tags.
     */
    cursor?: task_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_tags.
     */
    skip?: number
    distinct?: Task_tagsScalarFieldEnum | Task_tagsScalarFieldEnum[]
  }

  /**
   * task_tags create
   */
  export type task_tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * The data needed to create a task_tags.
     */
    data: XOR<task_tagsCreateInput, task_tagsUncheckedCreateInput>
  }

  /**
   * task_tags createMany
   */
  export type task_tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many task_tags.
     */
    data: task_tagsCreateManyInput | task_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * task_tags update
   */
  export type task_tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * The data needed to update a task_tags.
     */
    data: XOR<task_tagsUpdateInput, task_tagsUncheckedUpdateInput>
    /**
     * Choose, which task_tags to update.
     */
    where: task_tagsWhereUniqueInput
  }

  /**
   * task_tags updateMany
   */
  export type task_tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update task_tags.
     */
    data: XOR<task_tagsUpdateManyMutationInput, task_tagsUncheckedUpdateManyInput>
    /**
     * Filter which task_tags to update
     */
    where?: task_tagsWhereInput
    /**
     * Limit how many task_tags to update.
     */
    limit?: number
  }

  /**
   * task_tags upsert
   */
  export type task_tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * The filter to search for the task_tags to update in case it exists.
     */
    where: task_tagsWhereUniqueInput
    /**
     * In case the task_tags found by the `where` argument doesn't exist, create a new task_tags with this data.
     */
    create: XOR<task_tagsCreateInput, task_tagsUncheckedCreateInput>
    /**
     * In case the task_tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<task_tagsUpdateInput, task_tagsUncheckedUpdateInput>
  }

  /**
   * task_tags delete
   */
  export type task_tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    /**
     * Filter which task_tags to delete.
     */
    where: task_tagsWhereUniqueInput
  }

  /**
   * task_tags deleteMany
   */
  export type task_tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which task_tags to delete
     */
    where?: task_tagsWhereInput
    /**
     * Limit how many task_tags to delete.
     */
    limit?: number
  }

  /**
   * task_tags without action
   */
  export type task_tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
  }


  /**
   * Model tasks
   */

  export type AggregateTasks = {
    _count: TasksCountAggregateOutputType | null
    _avg: TasksAvgAggregateOutputType | null
    _sum: TasksSumAggregateOutputType | null
    _min: TasksMinAggregateOutputType | null
    _max: TasksMaxAggregateOutputType | null
  }

  export type TasksAvgAggregateOutputType = {
    id: number | null
    project_id: number | null
    assignee_id: number | null
    created_by_id: number | null
  }

  export type TasksSumAggregateOutputType = {
    id: number | null
    project_id: number | null
    assignee_id: number | null
    created_by_id: number | null
  }

  export type TasksMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.tasks_status | null
    priority: $Enums.tasks_priority | null
    due_date: Date | null
    project_id: number | null
    assignee_id: number | null
    created_by_id: number | null
    created_at: Date | null
  }

  export type TasksMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    status: $Enums.tasks_status | null
    priority: $Enums.tasks_priority | null
    due_date: Date | null
    project_id: number | null
    assignee_id: number | null
    created_by_id: number | null
    created_at: Date | null
  }

  export type TasksCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    priority: number
    due_date: number
    project_id: number
    assignee_id: number
    created_by_id: number
    created_at: number
    _all: number
  }


  export type TasksAvgAggregateInputType = {
    id?: true
    project_id?: true
    assignee_id?: true
    created_by_id?: true
  }

  export type TasksSumAggregateInputType = {
    id?: true
    project_id?: true
    assignee_id?: true
    created_by_id?: true
  }

  export type TasksMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    due_date?: true
    project_id?: true
    assignee_id?: true
    created_by_id?: true
    created_at?: true
  }

  export type TasksMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    due_date?: true
    project_id?: true
    assignee_id?: true
    created_by_id?: true
    created_at?: true
  }

  export type TasksCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    due_date?: true
    project_id?: true
    assignee_id?: true
    created_by_id?: true
    created_at?: true
    _all?: true
  }

  export type TasksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tasks to aggregate.
     */
    where?: tasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tasks
    **/
    _count?: true | TasksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TasksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TasksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TasksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TasksMaxAggregateInputType
  }

  export type GetTasksAggregateType<T extends TasksAggregateArgs> = {
        [P in keyof T & keyof AggregateTasks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTasks[P]>
      : GetScalarType<T[P], AggregateTasks[P]>
  }




  export type tasksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasksWhereInput
    orderBy?: tasksOrderByWithAggregationInput | tasksOrderByWithAggregationInput[]
    by: TasksScalarFieldEnum[] | TasksScalarFieldEnum
    having?: tasksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TasksCountAggregateInputType | true
    _avg?: TasksAvgAggregateInputType
    _sum?: TasksSumAggregateInputType
    _min?: TasksMinAggregateInputType
    _max?: TasksMaxAggregateInputType
  }

  export type TasksGroupByOutputType = {
    id: number
    title: string
    description: string | null
    status: $Enums.tasks_status | null
    priority: $Enums.tasks_priority | null
    due_date: Date | null
    project_id: number | null
    assignee_id: number
    created_by_id: number
    created_at: Date | null
    _count: TasksCountAggregateOutputType | null
    _avg: TasksAvgAggregateOutputType | null
    _sum: TasksSumAggregateOutputType | null
    _min: TasksMinAggregateOutputType | null
    _max: TasksMaxAggregateOutputType | null
  }

  type GetTasksGroupByPayload<T extends tasksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TasksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TasksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TasksGroupByOutputType[P]>
            : GetScalarType<T[P], TasksGroupByOutputType[P]>
        }
      >
    >


  export type tasksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    due_date?: boolean
    project_id?: boolean
    assignee_id?: boolean
    created_by_id?: boolean
    created_at?: boolean
    comments?: boolean | tasks$commentsArgs<ExtArgs>
    subtasks?: boolean | tasks$subtasksArgs<ExtArgs>
    task_tags?: boolean | tasks$task_tagsArgs<ExtArgs>
    projects?: boolean | tasks$projectsArgs<ExtArgs>
    users_tasks_assignee_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_tasks_created_by_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | TasksCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks"]>



  export type tasksSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    due_date?: boolean
    project_id?: boolean
    assignee_id?: boolean
    created_by_id?: boolean
    created_at?: boolean
  }

  export type tasksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "priority" | "due_date" | "project_id" | "assignee_id" | "created_by_id" | "created_at", ExtArgs["result"]["tasks"]>
  export type tasksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | tasks$commentsArgs<ExtArgs>
    subtasks?: boolean | tasks$subtasksArgs<ExtArgs>
    task_tags?: boolean | tasks$task_tagsArgs<ExtArgs>
    projects?: boolean | tasks$projectsArgs<ExtArgs>
    users_tasks_assignee_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_tasks_created_by_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | TasksCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $tasksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tasks"
    objects: {
      comments: Prisma.$commentsPayload<ExtArgs>[]
      subtasks: Prisma.$subtasksPayload<ExtArgs>[]
      task_tags: Prisma.$task_tagsPayload<ExtArgs>[]
      projects: Prisma.$projectsPayload<ExtArgs> | null
      users_tasks_assignee_idTousers: Prisma.$usersPayload<ExtArgs>
      users_tasks_created_by_idTousers: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      status: $Enums.tasks_status | null
      priority: $Enums.tasks_priority | null
      due_date: Date | null
      project_id: number | null
      assignee_id: number
      created_by_id: number
      created_at: Date | null
    }, ExtArgs["result"]["tasks"]>
    composites: {}
  }

  type tasksGetPayload<S extends boolean | null | undefined | tasksDefaultArgs> = $Result.GetResult<Prisma.$tasksPayload, S>

  type tasksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tasksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TasksCountAggregateInputType | true
    }

  export interface tasksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tasks'], meta: { name: 'tasks' } }
    /**
     * Find zero or one Tasks that matches the filter.
     * @param {tasksFindUniqueArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tasksFindUniqueArgs>(args: SelectSubset<T, tasksFindUniqueArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tasks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tasksFindUniqueOrThrowArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tasksFindUniqueOrThrowArgs>(args: SelectSubset<T, tasksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasksFindFirstArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tasksFindFirstArgs>(args?: SelectSubset<T, tasksFindFirstArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tasks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasksFindFirstOrThrowArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tasksFindFirstOrThrowArgs>(args?: SelectSubset<T, tasksFindFirstOrThrowArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.tasks.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.tasks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tasksWithIdOnly = await prisma.tasks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tasksFindManyArgs>(args?: SelectSubset<T, tasksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tasks.
     * @param {tasksCreateArgs} args - Arguments to create a Tasks.
     * @example
     * // Create one Tasks
     * const Tasks = await prisma.tasks.create({
     *   data: {
     *     // ... data to create a Tasks
     *   }
     * })
     * 
     */
    create<T extends tasksCreateArgs>(args: SelectSubset<T, tasksCreateArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {tasksCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const tasks = await prisma.tasks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tasksCreateManyArgs>(args?: SelectSubset<T, tasksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tasks.
     * @param {tasksDeleteArgs} args - Arguments to delete one Tasks.
     * @example
     * // Delete one Tasks
     * const Tasks = await prisma.tasks.delete({
     *   where: {
     *     // ... filter to delete one Tasks
     *   }
     * })
     * 
     */
    delete<T extends tasksDeleteArgs>(args: SelectSubset<T, tasksDeleteArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tasks.
     * @param {tasksUpdateArgs} args - Arguments to update one Tasks.
     * @example
     * // Update one Tasks
     * const tasks = await prisma.tasks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tasksUpdateArgs>(args: SelectSubset<T, tasksUpdateArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {tasksDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.tasks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tasksDeleteManyArgs>(args?: SelectSubset<T, tasksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const tasks = await prisma.tasks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tasksUpdateManyArgs>(args: SelectSubset<T, tasksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tasks.
     * @param {tasksUpsertArgs} args - Arguments to update or create a Tasks.
     * @example
     * // Update or create a Tasks
     * const tasks = await prisma.tasks.upsert({
     *   create: {
     *     // ... data to create a Tasks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tasks we want to update
     *   }
     * })
     */
    upsert<T extends tasksUpsertArgs>(args: SelectSubset<T, tasksUpsertArgs<ExtArgs>>): Prisma__tasksClient<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasksCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.tasks.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends tasksCountArgs>(
      args?: Subset<T, tasksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TasksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TasksAggregateArgs>(args: Subset<T, TasksAggregateArgs>): Prisma.PrismaPromise<GetTasksAggregateType<T>>

    /**
     * Group by Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasksGroupByArgs} args - Group by arguments.
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
      T extends tasksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tasksGroupByArgs['orderBy'] }
        : { orderBy?: tasksGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tasksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTasksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tasks model
   */
  readonly fields: tasksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tasks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tasksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends tasks$commentsArgs<ExtArgs> = {}>(args?: Subset<T, tasks$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subtasks<T extends tasks$subtasksArgs<ExtArgs> = {}>(args?: Subset<T, tasks$subtasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subtasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    task_tags<T extends tasks$task_tagsArgs<ExtArgs> = {}>(args?: Subset<T, tasks$task_tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends tasks$projectsArgs<ExtArgs> = {}>(args?: Subset<T, tasks$projectsArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_tasks_assignee_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_tasks_created_by_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the tasks model
   */
  interface tasksFieldRefs {
    readonly id: FieldRef<"tasks", 'Int'>
    readonly title: FieldRef<"tasks", 'String'>
    readonly description: FieldRef<"tasks", 'String'>
    readonly status: FieldRef<"tasks", 'tasks_status'>
    readonly priority: FieldRef<"tasks", 'tasks_priority'>
    readonly due_date: FieldRef<"tasks", 'DateTime'>
    readonly project_id: FieldRef<"tasks", 'Int'>
    readonly assignee_id: FieldRef<"tasks", 'Int'>
    readonly created_by_id: FieldRef<"tasks", 'Int'>
    readonly created_at: FieldRef<"tasks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tasks findUnique
   */
  export type tasksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * Filter, which tasks to fetch.
     */
    where: tasksWhereUniqueInput
  }

  /**
   * tasks findUniqueOrThrow
   */
  export type tasksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * Filter, which tasks to fetch.
     */
    where: tasksWhereUniqueInput
  }

  /**
   * tasks findFirst
   */
  export type tasksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * Filter, which tasks to fetch.
     */
    where?: tasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tasks.
     */
    cursor?: tasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tasks.
     */
    distinct?: TasksScalarFieldEnum | TasksScalarFieldEnum[]
  }

  /**
   * tasks findFirstOrThrow
   */
  export type tasksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * Filter, which tasks to fetch.
     */
    where?: tasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tasks.
     */
    cursor?: tasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tasks.
     */
    distinct?: TasksScalarFieldEnum | TasksScalarFieldEnum[]
  }

  /**
   * tasks findMany
   */
  export type tasksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * Filter, which tasks to fetch.
     */
    where?: tasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tasks.
     */
    cursor?: tasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    distinct?: TasksScalarFieldEnum | TasksScalarFieldEnum[]
  }

  /**
   * tasks create
   */
  export type tasksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * The data needed to create a tasks.
     */
    data: XOR<tasksCreateInput, tasksUncheckedCreateInput>
  }

  /**
   * tasks createMany
   */
  export type tasksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tasks.
     */
    data: tasksCreateManyInput | tasksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tasks update
   */
  export type tasksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * The data needed to update a tasks.
     */
    data: XOR<tasksUpdateInput, tasksUncheckedUpdateInput>
    /**
     * Choose, which tasks to update.
     */
    where: tasksWhereUniqueInput
  }

  /**
   * tasks updateMany
   */
  export type tasksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tasks.
     */
    data: XOR<tasksUpdateManyMutationInput, tasksUncheckedUpdateManyInput>
    /**
     * Filter which tasks to update
     */
    where?: tasksWhereInput
    /**
     * Limit how many tasks to update.
     */
    limit?: number
  }

  /**
   * tasks upsert
   */
  export type tasksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * The filter to search for the tasks to update in case it exists.
     */
    where: tasksWhereUniqueInput
    /**
     * In case the tasks found by the `where` argument doesn't exist, create a new tasks with this data.
     */
    create: XOR<tasksCreateInput, tasksUncheckedCreateInput>
    /**
     * In case the tasks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tasksUpdateInput, tasksUncheckedUpdateInput>
  }

  /**
   * tasks delete
   */
  export type tasksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    /**
     * Filter which tasks to delete.
     */
    where: tasksWhereUniqueInput
  }

  /**
   * tasks deleteMany
   */
  export type tasksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tasks to delete
     */
    where?: tasksWhereInput
    /**
     * Limit how many tasks to delete.
     */
    limit?: number
  }

  /**
   * tasks.comments
   */
  export type tasks$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    where?: commentsWhereInput
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    cursor?: commentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * tasks.subtasks
   */
  export type tasks$subtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subtasks
     */
    select?: subtasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subtasks
     */
    omit?: subtasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subtasksInclude<ExtArgs> | null
    where?: subtasksWhereInput
    orderBy?: subtasksOrderByWithRelationInput | subtasksOrderByWithRelationInput[]
    cursor?: subtasksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtasksScalarFieldEnum | SubtasksScalarFieldEnum[]
  }

  /**
   * tasks.task_tags
   */
  export type tasks$task_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_tags
     */
    select?: task_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_tags
     */
    omit?: task_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_tagsInclude<ExtArgs> | null
    where?: task_tagsWhereInput
    orderBy?: task_tagsOrderByWithRelationInput | task_tagsOrderByWithRelationInput[]
    cursor?: task_tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Task_tagsScalarFieldEnum | Task_tagsScalarFieldEnum[]
  }

  /**
   * tasks.projects
   */
  export type tasks$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
  }

  /**
   * tasks without action
   */
  export type tasksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    userid: number | null
  }

  export type UsersSumAggregateOutputType = {
    userid: number | null
  }

  export type UsersMinAggregateOutputType = {
    userid: number | null
    username: string | null
    email: string | null
    password: string | null
    role: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    userid: number | null
    username: string | null
    email: string | null
    password: string | null
    role: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    userid: number
    username: number
    email: number
    password: number
    role: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    userid?: true
  }

  export type UsersSumAggregateInputType = {
    userid?: true
  }

  export type UsersMinAggregateInputType = {
    userid?: true
    username?: true
    email?: true
    password?: true
    role?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    userid?: true
    username?: true
    email?: true
    password?: true
    role?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    userid?: true
    username?: true
    email?: true
    password?: true
    role?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    userid: number
    username: string
    email: string
    password: string
    role: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userid?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    comments?: boolean | users$commentsArgs<ExtArgs>
    tasks_tasks_assignee_idTousers?: boolean | users$tasks_tasks_assignee_idTousersArgs<ExtArgs>
    tasks_tasks_created_by_idTousers?: boolean | users$tasks_tasks_created_by_idTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    userid?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userid" | "username" | "email" | "password" | "role" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | users$commentsArgs<ExtArgs>
    tasks_tasks_assignee_idTousers?: boolean | users$tasks_tasks_assignee_idTousersArgs<ExtArgs>
    tasks_tasks_created_by_idTousers?: boolean | users$tasks_tasks_created_by_idTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      comments: Prisma.$commentsPayload<ExtArgs>[]
      tasks_tasks_assignee_idTousers: Prisma.$tasksPayload<ExtArgs>[]
      tasks_tasks_created_by_idTousers: Prisma.$tasksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userid: number
      username: string
      email: string
      password: string
      role: string | null
      is_active: boolean | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `userid`
     * const usersWithUseridOnly = await prisma.users.findMany({ select: { userid: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends users$commentsArgs<ExtArgs> = {}>(args?: Subset<T, users$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks_tasks_assignee_idTousers<T extends users$tasks_tasks_assignee_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$tasks_tasks_assignee_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks_tasks_created_by_idTousers<T extends users$tasks_tasks_created_by_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$tasks_tasks_created_by_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly userid: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly is_active: FieldRef<"users", 'Boolean'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.comments
   */
  export type users$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comments
     */
    select?: commentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comments
     */
    omit?: commentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentsInclude<ExtArgs> | null
    where?: commentsWhereInput
    orderBy?: commentsOrderByWithRelationInput | commentsOrderByWithRelationInput[]
    cursor?: commentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentsScalarFieldEnum | CommentsScalarFieldEnum[]
  }

  /**
   * users.tasks_tasks_assignee_idTousers
   */
  export type users$tasks_tasks_assignee_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    where?: tasksWhereInput
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    cursor?: tasksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TasksScalarFieldEnum | TasksScalarFieldEnum[]
  }

  /**
   * users.tasks_tasks_created_by_idTousers
   */
  export type users$tasks_tasks_created_by_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks
     */
    select?: tasksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks
     */
    omit?: tasksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasksInclude<ExtArgs> | null
    where?: tasksWhereInput
    orderBy?: tasksOrderByWithRelationInput | tasksOrderByWithRelationInput[]
    cursor?: tasksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TasksScalarFieldEnum | TasksScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
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


  export const CommentsScalarFieldEnum: {
    comment_id: 'comment_id',
    content: 'content',
    task_id: 'task_id',
    user_id: 'user_id'
  };

  export type CommentsScalarFieldEnum = (typeof CommentsScalarFieldEnum)[keyof typeof CommentsScalarFieldEnum]


  export const ProjectsScalarFieldEnum: {
    project_id: 'project_id',
    name: 'name',
    description: 'description',
    status: 'status',
    priority: 'priority',
    start_date: 'start_date',
    due_date: 'due_date',
    created_at: 'created_at'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const SubtasksScalarFieldEnum: {
    subtask_id: 'subtask_id',
    title: 'title',
    completed: 'completed',
    task_id: 'task_id'
  };

  export type SubtasksScalarFieldEnum = (typeof SubtasksScalarFieldEnum)[keyof typeof SubtasksScalarFieldEnum]


  export const TagsScalarFieldEnum: {
    tag_id: 'tag_id',
    name: 'name'
  };

  export type TagsScalarFieldEnum = (typeof TagsScalarFieldEnum)[keyof typeof TagsScalarFieldEnum]


  export const Task_tagsScalarFieldEnum: {
    task_id: 'task_id',
    tag_id: 'tag_id'
  };

  export type Task_tagsScalarFieldEnum = (typeof Task_tagsScalarFieldEnum)[keyof typeof Task_tagsScalarFieldEnum]


  export const TasksScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    due_date: 'due_date',
    project_id: 'project_id',
    assignee_id: 'assignee_id',
    created_by_id: 'created_by_id',
    created_at: 'created_at'
  };

  export type TasksScalarFieldEnum = (typeof TasksScalarFieldEnum)[keyof typeof TasksScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    userid: 'userid',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const commentsOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type commentsOrderByRelevanceFieldEnum = (typeof commentsOrderByRelevanceFieldEnum)[keyof typeof commentsOrderByRelevanceFieldEnum]


  export const projectsOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type projectsOrderByRelevanceFieldEnum = (typeof projectsOrderByRelevanceFieldEnum)[keyof typeof projectsOrderByRelevanceFieldEnum]


  export const subtasksOrderByRelevanceFieldEnum: {
    title: 'title'
  };

  export type subtasksOrderByRelevanceFieldEnum = (typeof subtasksOrderByRelevanceFieldEnum)[keyof typeof subtasksOrderByRelevanceFieldEnum]


  export const tagsOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type tagsOrderByRelevanceFieldEnum = (typeof tagsOrderByRelevanceFieldEnum)[keyof typeof tagsOrderByRelevanceFieldEnum]


  export const tasksOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description'
  };

  export type tasksOrderByRelevanceFieldEnum = (typeof tasksOrderByRelevanceFieldEnum)[keyof typeof tasksOrderByRelevanceFieldEnum]


  export const usersOrderByRelevanceFieldEnum: {
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'projects_status'
   */
  export type Enumprojects_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'projects_status'>
    


  /**
   * Reference to a field of type 'projects_priority'
   */
  export type Enumprojects_priorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'projects_priority'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'tasks_status'
   */
  export type Enumtasks_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tasks_status'>
    


  /**
   * Reference to a field of type 'tasks_priority'
   */
  export type Enumtasks_priorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tasks_priority'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type commentsWhereInput = {
    AND?: commentsWhereInput | commentsWhereInput[]
    OR?: commentsWhereInput[]
    NOT?: commentsWhereInput | commentsWhereInput[]
    comment_id?: IntFilter<"comments"> | number
    content?: StringNullableFilter<"comments"> | string | null
    task_id?: IntNullableFilter<"comments"> | number | null
    user_id?: IntNullableFilter<"comments"> | number | null
    tasks?: XOR<TasksNullableScalarRelationFilter, tasksWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type commentsOrderByWithRelationInput = {
    comment_id?: SortOrder
    content?: SortOrderInput | SortOrder
    task_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    tasks?: tasksOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: commentsOrderByRelevanceInput
  }

  export type commentsWhereUniqueInput = Prisma.AtLeast<{
    comment_id?: number
    AND?: commentsWhereInput | commentsWhereInput[]
    OR?: commentsWhereInput[]
    NOT?: commentsWhereInput | commentsWhereInput[]
    content?: StringNullableFilter<"comments"> | string | null
    task_id?: IntNullableFilter<"comments"> | number | null
    user_id?: IntNullableFilter<"comments"> | number | null
    tasks?: XOR<TasksNullableScalarRelationFilter, tasksWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "comment_id">

  export type commentsOrderByWithAggregationInput = {
    comment_id?: SortOrder
    content?: SortOrderInput | SortOrder
    task_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: commentsCountOrderByAggregateInput
    _avg?: commentsAvgOrderByAggregateInput
    _max?: commentsMaxOrderByAggregateInput
    _min?: commentsMinOrderByAggregateInput
    _sum?: commentsSumOrderByAggregateInput
  }

  export type commentsScalarWhereWithAggregatesInput = {
    AND?: commentsScalarWhereWithAggregatesInput | commentsScalarWhereWithAggregatesInput[]
    OR?: commentsScalarWhereWithAggregatesInput[]
    NOT?: commentsScalarWhereWithAggregatesInput | commentsScalarWhereWithAggregatesInput[]
    comment_id?: IntWithAggregatesFilter<"comments"> | number
    content?: StringNullableWithAggregatesFilter<"comments"> | string | null
    task_id?: IntNullableWithAggregatesFilter<"comments"> | number | null
    user_id?: IntNullableWithAggregatesFilter<"comments"> | number | null
  }

  export type projectsWhereInput = {
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    project_id?: IntFilter<"projects"> | number
    name?: StringFilter<"projects"> | string
    description?: StringNullableFilter<"projects"> | string | null
    status?: Enumprojects_statusNullableFilter<"projects"> | $Enums.projects_status | null
    priority?: Enumprojects_priorityNullableFilter<"projects"> | $Enums.projects_priority | null
    start_date?: DateTimeNullableFilter<"projects"> | Date | string | null
    due_date?: DateTimeNullableFilter<"projects"> | Date | string | null
    created_at?: DateTimeNullableFilter<"projects"> | Date | string | null
    tasks?: TasksListRelationFilter
  }

  export type projectsOrderByWithRelationInput = {
    project_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    tasks?: tasksOrderByRelationAggregateInput
    _relevance?: projectsOrderByRelevanceInput
  }

  export type projectsWhereUniqueInput = Prisma.AtLeast<{
    project_id?: number
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    name?: StringFilter<"projects"> | string
    description?: StringNullableFilter<"projects"> | string | null
    status?: Enumprojects_statusNullableFilter<"projects"> | $Enums.projects_status | null
    priority?: Enumprojects_priorityNullableFilter<"projects"> | $Enums.projects_priority | null
    start_date?: DateTimeNullableFilter<"projects"> | Date | string | null
    due_date?: DateTimeNullableFilter<"projects"> | Date | string | null
    created_at?: DateTimeNullableFilter<"projects"> | Date | string | null
    tasks?: TasksListRelationFilter
  }, "project_id">

  export type projectsOrderByWithAggregationInput = {
    project_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: projectsCountOrderByAggregateInput
    _avg?: projectsAvgOrderByAggregateInput
    _max?: projectsMaxOrderByAggregateInput
    _min?: projectsMinOrderByAggregateInput
    _sum?: projectsSumOrderByAggregateInput
  }

  export type projectsScalarWhereWithAggregatesInput = {
    AND?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    OR?: projectsScalarWhereWithAggregatesInput[]
    NOT?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    project_id?: IntWithAggregatesFilter<"projects"> | number
    name?: StringWithAggregatesFilter<"projects"> | string
    description?: StringNullableWithAggregatesFilter<"projects"> | string | null
    status?: Enumprojects_statusNullableWithAggregatesFilter<"projects"> | $Enums.projects_status | null
    priority?: Enumprojects_priorityNullableWithAggregatesFilter<"projects"> | $Enums.projects_priority | null
    start_date?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
    due_date?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
  }

  export type subtasksWhereInput = {
    AND?: subtasksWhereInput | subtasksWhereInput[]
    OR?: subtasksWhereInput[]
    NOT?: subtasksWhereInput | subtasksWhereInput[]
    subtask_id?: IntFilter<"subtasks"> | number
    title?: StringNullableFilter<"subtasks"> | string | null
    completed?: BoolNullableFilter<"subtasks"> | boolean | null
    task_id?: IntFilter<"subtasks"> | number
    tasks?: XOR<TasksScalarRelationFilter, tasksWhereInput>
  }

  export type subtasksOrderByWithRelationInput = {
    subtask_id?: SortOrder
    title?: SortOrderInput | SortOrder
    completed?: SortOrderInput | SortOrder
    task_id?: SortOrder
    tasks?: tasksOrderByWithRelationInput
    _relevance?: subtasksOrderByRelevanceInput
  }

  export type subtasksWhereUniqueInput = Prisma.AtLeast<{
    subtask_id?: number
    AND?: subtasksWhereInput | subtasksWhereInput[]
    OR?: subtasksWhereInput[]
    NOT?: subtasksWhereInput | subtasksWhereInput[]
    title?: StringNullableFilter<"subtasks"> | string | null
    completed?: BoolNullableFilter<"subtasks"> | boolean | null
    task_id?: IntFilter<"subtasks"> | number
    tasks?: XOR<TasksScalarRelationFilter, tasksWhereInput>
  }, "subtask_id">

  export type subtasksOrderByWithAggregationInput = {
    subtask_id?: SortOrder
    title?: SortOrderInput | SortOrder
    completed?: SortOrderInput | SortOrder
    task_id?: SortOrder
    _count?: subtasksCountOrderByAggregateInput
    _avg?: subtasksAvgOrderByAggregateInput
    _max?: subtasksMaxOrderByAggregateInput
    _min?: subtasksMinOrderByAggregateInput
    _sum?: subtasksSumOrderByAggregateInput
  }

  export type subtasksScalarWhereWithAggregatesInput = {
    AND?: subtasksScalarWhereWithAggregatesInput | subtasksScalarWhereWithAggregatesInput[]
    OR?: subtasksScalarWhereWithAggregatesInput[]
    NOT?: subtasksScalarWhereWithAggregatesInput | subtasksScalarWhereWithAggregatesInput[]
    subtask_id?: IntWithAggregatesFilter<"subtasks"> | number
    title?: StringNullableWithAggregatesFilter<"subtasks"> | string | null
    completed?: BoolNullableWithAggregatesFilter<"subtasks"> | boolean | null
    task_id?: IntWithAggregatesFilter<"subtasks"> | number
  }

  export type tagsWhereInput = {
    AND?: tagsWhereInput | tagsWhereInput[]
    OR?: tagsWhereInput[]
    NOT?: tagsWhereInput | tagsWhereInput[]
    tag_id?: IntFilter<"tags"> | number
    name?: StringFilter<"tags"> | string
    task_tags?: Task_tagsListRelationFilter
  }

  export type tagsOrderByWithRelationInput = {
    tag_id?: SortOrder
    name?: SortOrder
    task_tags?: task_tagsOrderByRelationAggregateInput
    _relevance?: tagsOrderByRelevanceInput
  }

  export type tagsWhereUniqueInput = Prisma.AtLeast<{
    tag_id?: number
    name?: string
    AND?: tagsWhereInput | tagsWhereInput[]
    OR?: tagsWhereInput[]
    NOT?: tagsWhereInput | tagsWhereInput[]
    task_tags?: Task_tagsListRelationFilter
  }, "tag_id" | "name">

  export type tagsOrderByWithAggregationInput = {
    tag_id?: SortOrder
    name?: SortOrder
    _count?: tagsCountOrderByAggregateInput
    _avg?: tagsAvgOrderByAggregateInput
    _max?: tagsMaxOrderByAggregateInput
    _min?: tagsMinOrderByAggregateInput
    _sum?: tagsSumOrderByAggregateInput
  }

  export type tagsScalarWhereWithAggregatesInput = {
    AND?: tagsScalarWhereWithAggregatesInput | tagsScalarWhereWithAggregatesInput[]
    OR?: tagsScalarWhereWithAggregatesInput[]
    NOT?: tagsScalarWhereWithAggregatesInput | tagsScalarWhereWithAggregatesInput[]
    tag_id?: IntWithAggregatesFilter<"tags"> | number
    name?: StringWithAggregatesFilter<"tags"> | string
  }

  export type task_tagsWhereInput = {
    AND?: task_tagsWhereInput | task_tagsWhereInput[]
    OR?: task_tagsWhereInput[]
    NOT?: task_tagsWhereInput | task_tagsWhereInput[]
    task_id?: IntFilter<"task_tags"> | number
    tag_id?: IntFilter<"task_tags"> | number
    tasks?: XOR<TasksScalarRelationFilter, tasksWhereInput>
    tags?: XOR<TagsScalarRelationFilter, tagsWhereInput>
  }

  export type task_tagsOrderByWithRelationInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
    tasks?: tasksOrderByWithRelationInput
    tags?: tagsOrderByWithRelationInput
  }

  export type task_tagsWhereUniqueInput = Prisma.AtLeast<{
    task_id_tag_id?: task_tagsTask_idTag_idCompoundUniqueInput
    AND?: task_tagsWhereInput | task_tagsWhereInput[]
    OR?: task_tagsWhereInput[]
    NOT?: task_tagsWhereInput | task_tagsWhereInput[]
    task_id?: IntFilter<"task_tags"> | number
    tag_id?: IntFilter<"task_tags"> | number
    tasks?: XOR<TasksScalarRelationFilter, tasksWhereInput>
    tags?: XOR<TagsScalarRelationFilter, tagsWhereInput>
  }, "task_id_tag_id">

  export type task_tagsOrderByWithAggregationInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
    _count?: task_tagsCountOrderByAggregateInput
    _avg?: task_tagsAvgOrderByAggregateInput
    _max?: task_tagsMaxOrderByAggregateInput
    _min?: task_tagsMinOrderByAggregateInput
    _sum?: task_tagsSumOrderByAggregateInput
  }

  export type task_tagsScalarWhereWithAggregatesInput = {
    AND?: task_tagsScalarWhereWithAggregatesInput | task_tagsScalarWhereWithAggregatesInput[]
    OR?: task_tagsScalarWhereWithAggregatesInput[]
    NOT?: task_tagsScalarWhereWithAggregatesInput | task_tagsScalarWhereWithAggregatesInput[]
    task_id?: IntWithAggregatesFilter<"task_tags"> | number
    tag_id?: IntWithAggregatesFilter<"task_tags"> | number
  }

  export type tasksWhereInput = {
    AND?: tasksWhereInput | tasksWhereInput[]
    OR?: tasksWhereInput[]
    NOT?: tasksWhereInput | tasksWhereInput[]
    id?: IntFilter<"tasks"> | number
    title?: StringFilter<"tasks"> | string
    description?: StringNullableFilter<"tasks"> | string | null
    status?: Enumtasks_statusNullableFilter<"tasks"> | $Enums.tasks_status | null
    priority?: Enumtasks_priorityNullableFilter<"tasks"> | $Enums.tasks_priority | null
    due_date?: DateTimeNullableFilter<"tasks"> | Date | string | null
    project_id?: IntNullableFilter<"tasks"> | number | null
    assignee_id?: IntFilter<"tasks"> | number
    created_by_id?: IntFilter<"tasks"> | number
    created_at?: DateTimeNullableFilter<"tasks"> | Date | string | null
    comments?: CommentsListRelationFilter
    subtasks?: SubtasksListRelationFilter
    task_tags?: Task_tagsListRelationFilter
    projects?: XOR<ProjectsNullableScalarRelationFilter, projectsWhereInput> | null
    users_tasks_assignee_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    users_tasks_created_by_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type tasksOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    project_id?: SortOrderInput | SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    comments?: commentsOrderByRelationAggregateInput
    subtasks?: subtasksOrderByRelationAggregateInput
    task_tags?: task_tagsOrderByRelationAggregateInput
    projects?: projectsOrderByWithRelationInput
    users_tasks_assignee_idTousers?: usersOrderByWithRelationInput
    users_tasks_created_by_idTousers?: usersOrderByWithRelationInput
    _relevance?: tasksOrderByRelevanceInput
  }

  export type tasksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: tasksWhereInput | tasksWhereInput[]
    OR?: tasksWhereInput[]
    NOT?: tasksWhereInput | tasksWhereInput[]
    title?: StringFilter<"tasks"> | string
    description?: StringNullableFilter<"tasks"> | string | null
    status?: Enumtasks_statusNullableFilter<"tasks"> | $Enums.tasks_status | null
    priority?: Enumtasks_priorityNullableFilter<"tasks"> | $Enums.tasks_priority | null
    due_date?: DateTimeNullableFilter<"tasks"> | Date | string | null
    project_id?: IntNullableFilter<"tasks"> | number | null
    assignee_id?: IntFilter<"tasks"> | number
    created_by_id?: IntFilter<"tasks"> | number
    created_at?: DateTimeNullableFilter<"tasks"> | Date | string | null
    comments?: CommentsListRelationFilter
    subtasks?: SubtasksListRelationFilter
    task_tags?: Task_tagsListRelationFilter
    projects?: XOR<ProjectsNullableScalarRelationFilter, projectsWhereInput> | null
    users_tasks_assignee_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    users_tasks_created_by_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type tasksOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    project_id?: SortOrderInput | SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: tasksCountOrderByAggregateInput
    _avg?: tasksAvgOrderByAggregateInput
    _max?: tasksMaxOrderByAggregateInput
    _min?: tasksMinOrderByAggregateInput
    _sum?: tasksSumOrderByAggregateInput
  }

  export type tasksScalarWhereWithAggregatesInput = {
    AND?: tasksScalarWhereWithAggregatesInput | tasksScalarWhereWithAggregatesInput[]
    OR?: tasksScalarWhereWithAggregatesInput[]
    NOT?: tasksScalarWhereWithAggregatesInput | tasksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"tasks"> | number
    title?: StringWithAggregatesFilter<"tasks"> | string
    description?: StringNullableWithAggregatesFilter<"tasks"> | string | null
    status?: Enumtasks_statusNullableWithAggregatesFilter<"tasks"> | $Enums.tasks_status | null
    priority?: Enumtasks_priorityNullableWithAggregatesFilter<"tasks"> | $Enums.tasks_priority | null
    due_date?: DateTimeNullableWithAggregatesFilter<"tasks"> | Date | string | null
    project_id?: IntNullableWithAggregatesFilter<"tasks"> | number | null
    assignee_id?: IntWithAggregatesFilter<"tasks"> | number
    created_by_id?: IntWithAggregatesFilter<"tasks"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"tasks"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    userid?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: StringNullableFilter<"users"> | string | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    comments?: CommentsListRelationFilter
    tasks_tasks_assignee_idTousers?: TasksListRelationFilter
    tasks_tasks_created_by_idTousers?: TasksListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    userid?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    comments?: commentsOrderByRelationAggregateInput
    tasks_tasks_assignee_idTousers?: tasksOrderByRelationAggregateInput
    tasks_tasks_created_by_idTousers?: tasksOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    userid?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    username?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: StringNullableFilter<"users"> | string | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    comments?: CommentsListRelationFilter
    tasks_tasks_assignee_idTousers?: TasksListRelationFilter
    tasks_tasks_created_by_idTousers?: TasksListRelationFilter
  }, "userid" | "email">

  export type usersOrderByWithAggregationInput = {
    userid?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    userid?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    role?: StringNullableWithAggregatesFilter<"users"> | string | null
    is_active?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type commentsCreateInput = {
    content?: string | null
    tasks?: tasksCreateNestedOneWithoutCommentsInput
    users?: usersCreateNestedOneWithoutCommentsInput
  }

  export type commentsUncheckedCreateInput = {
    comment_id?: number
    content?: string | null
    task_id?: number | null
    user_id?: number | null
  }

  export type commentsUpdateInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: tasksUpdateOneWithoutCommentsNestedInput
    users?: usersUpdateOneWithoutCommentsNestedInput
  }

  export type commentsUncheckedUpdateInput = {
    comment_id?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    task_id?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type commentsCreateManyInput = {
    comment_id?: number
    content?: string | null
    task_id?: number | null
    user_id?: number | null
  }

  export type commentsUpdateManyMutationInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type commentsUncheckedUpdateManyInput = {
    comment_id?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    task_id?: NullableIntFieldUpdateOperationsInput | number | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type projectsCreateInput = {
    name: string
    description?: string | null
    status?: $Enums.projects_status | null
    priority?: $Enums.projects_priority | null
    start_date?: Date | string | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    tasks?: tasksCreateNestedManyWithoutProjectsInput
  }

  export type projectsUncheckedCreateInput = {
    project_id?: number
    name: string
    description?: string | null
    status?: $Enums.projects_status | null
    priority?: $Enums.projects_priority | null
    start_date?: Date | string | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    tasks?: tasksUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type projectsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumprojects_statusFieldUpdateOperationsInput | $Enums.projects_status | null
    priority?: NullableEnumprojects_priorityFieldUpdateOperationsInput | $Enums.projects_priority | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: tasksUpdateManyWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateInput = {
    project_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumprojects_statusFieldUpdateOperationsInput | $Enums.projects_status | null
    priority?: NullableEnumprojects_priorityFieldUpdateOperationsInput | $Enums.projects_priority | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: tasksUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type projectsCreateManyInput = {
    project_id?: number
    name: string
    description?: string | null
    status?: $Enums.projects_status | null
    priority?: $Enums.projects_priority | null
    start_date?: Date | string | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type projectsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumprojects_statusFieldUpdateOperationsInput | $Enums.projects_status | null
    priority?: NullableEnumprojects_priorityFieldUpdateOperationsInput | $Enums.projects_priority | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsUncheckedUpdateManyInput = {
    project_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumprojects_statusFieldUpdateOperationsInput | $Enums.projects_status | null
    priority?: NullableEnumprojects_priorityFieldUpdateOperationsInput | $Enums.projects_priority | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type subtasksCreateInput = {
    title?: string | null
    completed?: boolean | null
    tasks: tasksCreateNestedOneWithoutSubtasksInput
  }

  export type subtasksUncheckedCreateInput = {
    subtask_id?: number
    title?: string | null
    completed?: boolean | null
    task_id: number
  }

  export type subtasksUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tasks?: tasksUpdateOneRequiredWithoutSubtasksNestedInput
  }

  export type subtasksUncheckedUpdateInput = {
    subtask_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    task_id?: IntFieldUpdateOperationsInput | number
  }

  export type subtasksCreateManyInput = {
    subtask_id?: number
    title?: string | null
    completed?: boolean | null
    task_id: number
  }

  export type subtasksUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type subtasksUncheckedUpdateManyInput = {
    subtask_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    task_id?: IntFieldUpdateOperationsInput | number
  }

  export type tagsCreateInput = {
    name: string
    task_tags?: task_tagsCreateNestedManyWithoutTagsInput
  }

  export type tagsUncheckedCreateInput = {
    tag_id?: number
    name: string
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type tagsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    task_tags?: task_tagsUpdateManyWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    task_tags?: task_tagsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type tagsCreateManyInput = {
    tag_id?: number
    name: string
  }

  export type tagsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type tagsUncheckedUpdateManyInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type task_tagsCreateInput = {
    tasks: tasksCreateNestedOneWithoutTask_tagsInput
    tags: tagsCreateNestedOneWithoutTask_tagsInput
  }

  export type task_tagsUncheckedCreateInput = {
    task_id: number
    tag_id: number
  }

  export type task_tagsUpdateInput = {
    tasks?: tasksUpdateOneRequiredWithoutTask_tagsNestedInput
    tags?: tagsUpdateOneRequiredWithoutTask_tagsNestedInput
  }

  export type task_tagsUncheckedUpdateInput = {
    task_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type task_tagsCreateManyInput = {
    task_id: number
    tag_id: number
  }

  export type task_tagsUpdateManyMutationInput = {

  }

  export type task_tagsUncheckedUpdateManyInput = {
    task_id?: IntFieldUpdateOperationsInput | number
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type tasksCreateInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutTasksInput
    subtasks?: subtasksCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsCreateNestedManyWithoutTasksInput
    projects?: projectsCreateNestedOneWithoutTasksInput
    users_tasks_assignee_idTousers: usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput
    users_tasks_created_by_idTousers: usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput
  }

  export type tasksUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutTasksInput
    subtasks?: subtasksUncheckedCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUpdateManyWithoutTasksNestedInput
    projects?: projectsUpdateOneWithoutTasksNestedInput
    users_tasks_assignee_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput
    users_tasks_created_by_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput
  }

  export type tasksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUncheckedUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type tasksCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
  }

  export type tasksUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tasksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutUsersInput
    tasks_tasks_assignee_idTousers?: tasksCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput
    tasks_tasks_created_by_idTousers?: tasksCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput
  }

  export type usersUncheckedCreateInput = {
    userid?: number
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    tasks_tasks_assignee_idTousers?: tasksUncheckedCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput
    tasks_tasks_created_by_idTousers?: tasksUncheckedCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutUsersNestedInput
    tasks_tasks_assignee_idTousers?: tasksUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput
    tasks_tasks_created_by_idTousers?: tasksUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    userid?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    tasks_tasks_assignee_idTousers?: tasksUncheckedUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput
    tasks_tasks_created_by_idTousers?: tasksUncheckedUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput
  }

  export type usersCreateManyInput = {
    userid?: number
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    userid?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TasksNullableScalarRelationFilter = {
    is?: tasksWhereInput | null
    isNot?: tasksWhereInput | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type commentsOrderByRelevanceInput = {
    fields: commentsOrderByRelevanceFieldEnum | commentsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type commentsCountOrderByAggregateInput = {
    comment_id?: SortOrder
    content?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
  }

  export type commentsAvgOrderByAggregateInput = {
    comment_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
  }

  export type commentsMaxOrderByAggregateInput = {
    comment_id?: SortOrder
    content?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
  }

  export type commentsMinOrderByAggregateInput = {
    comment_id?: SortOrder
    content?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
  }

  export type commentsSumOrderByAggregateInput = {
    comment_id?: SortOrder
    task_id?: SortOrder
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Enumprojects_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_status | Enumprojects_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_status[] | null
    notIn?: $Enums.projects_status[] | null
    not?: NestedEnumprojects_statusNullableFilter<$PrismaModel> | $Enums.projects_status | null
  }

  export type Enumprojects_priorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_priority | Enumprojects_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_priority[] | null
    notIn?: $Enums.projects_priority[] | null
    not?: NestedEnumprojects_priorityNullableFilter<$PrismaModel> | $Enums.projects_priority | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TasksListRelationFilter = {
    every?: tasksWhereInput
    some?: tasksWhereInput
    none?: tasksWhereInput
  }

  export type tasksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type projectsOrderByRelevanceInput = {
    fields: projectsOrderByRelevanceFieldEnum | projectsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type projectsCountOrderByAggregateInput = {
    project_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    start_date?: SortOrder
    due_date?: SortOrder
    created_at?: SortOrder
  }

  export type projectsAvgOrderByAggregateInput = {
    project_id?: SortOrder
  }

  export type projectsMaxOrderByAggregateInput = {
    project_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    start_date?: SortOrder
    due_date?: SortOrder
    created_at?: SortOrder
  }

  export type projectsMinOrderByAggregateInput = {
    project_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    start_date?: SortOrder
    due_date?: SortOrder
    created_at?: SortOrder
  }

  export type projectsSumOrderByAggregateInput = {
    project_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type Enumprojects_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_status | Enumprojects_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_status[] | null
    notIn?: $Enums.projects_status[] | null
    not?: NestedEnumprojects_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.projects_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumprojects_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumprojects_statusNullableFilter<$PrismaModel>
  }

  export type Enumprojects_priorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_priority | Enumprojects_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_priority[] | null
    notIn?: $Enums.projects_priority[] | null
    not?: NestedEnumprojects_priorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.projects_priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumprojects_priorityNullableFilter<$PrismaModel>
    _max?: NestedEnumprojects_priorityNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type TasksScalarRelationFilter = {
    is?: tasksWhereInput
    isNot?: tasksWhereInput
  }

  export type subtasksOrderByRelevanceInput = {
    fields: subtasksOrderByRelevanceFieldEnum | subtasksOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type subtasksCountOrderByAggregateInput = {
    subtask_id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
    task_id?: SortOrder
  }

  export type subtasksAvgOrderByAggregateInput = {
    subtask_id?: SortOrder
    task_id?: SortOrder
  }

  export type subtasksMaxOrderByAggregateInput = {
    subtask_id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
    task_id?: SortOrder
  }

  export type subtasksMinOrderByAggregateInput = {
    subtask_id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
    task_id?: SortOrder
  }

  export type subtasksSumOrderByAggregateInput = {
    subtask_id?: SortOrder
    task_id?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type Task_tagsListRelationFilter = {
    every?: task_tagsWhereInput
    some?: task_tagsWhereInput
    none?: task_tagsWhereInput
  }

  export type task_tagsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tagsOrderByRelevanceInput = {
    fields: tagsOrderByRelevanceFieldEnum | tagsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tagsCountOrderByAggregateInput = {
    tag_id?: SortOrder
    name?: SortOrder
  }

  export type tagsAvgOrderByAggregateInput = {
    tag_id?: SortOrder
  }

  export type tagsMaxOrderByAggregateInput = {
    tag_id?: SortOrder
    name?: SortOrder
  }

  export type tagsMinOrderByAggregateInput = {
    tag_id?: SortOrder
    name?: SortOrder
  }

  export type tagsSumOrderByAggregateInput = {
    tag_id?: SortOrder
  }

  export type TagsScalarRelationFilter = {
    is?: tagsWhereInput
    isNot?: tagsWhereInput
  }

  export type task_tagsTask_idTag_idCompoundUniqueInput = {
    task_id: number
    tag_id: number
  }

  export type task_tagsCountOrderByAggregateInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
  }

  export type task_tagsAvgOrderByAggregateInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
  }

  export type task_tagsMaxOrderByAggregateInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
  }

  export type task_tagsMinOrderByAggregateInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
  }

  export type task_tagsSumOrderByAggregateInput = {
    task_id?: SortOrder
    tag_id?: SortOrder
  }

  export type Enumtasks_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_status | Enumtasks_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_status[] | null
    notIn?: $Enums.tasks_status[] | null
    not?: NestedEnumtasks_statusNullableFilter<$PrismaModel> | $Enums.tasks_status | null
  }

  export type Enumtasks_priorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_priority | Enumtasks_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_priority[] | null
    notIn?: $Enums.tasks_priority[] | null
    not?: NestedEnumtasks_priorityNullableFilter<$PrismaModel> | $Enums.tasks_priority | null
  }

  export type CommentsListRelationFilter = {
    every?: commentsWhereInput
    some?: commentsWhereInput
    none?: commentsWhereInput
  }

  export type SubtasksListRelationFilter = {
    every?: subtasksWhereInput
    some?: subtasksWhereInput
    none?: subtasksWhereInput
  }

  export type ProjectsNullableScalarRelationFilter = {
    is?: projectsWhereInput | null
    isNot?: projectsWhereInput | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type commentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subtasksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tasksOrderByRelevanceInput = {
    fields: tasksOrderByRelevanceFieldEnum | tasksOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tasksCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    due_date?: SortOrder
    project_id?: SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
    created_at?: SortOrder
  }

  export type tasksAvgOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
  }

  export type tasksMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    due_date?: SortOrder
    project_id?: SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
    created_at?: SortOrder
  }

  export type tasksMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    due_date?: SortOrder
    project_id?: SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
    created_at?: SortOrder
  }

  export type tasksSumOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    assignee_id?: SortOrder
    created_by_id?: SortOrder
  }

  export type Enumtasks_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_status | Enumtasks_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_status[] | null
    notIn?: $Enums.tasks_status[] | null
    not?: NestedEnumtasks_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.tasks_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtasks_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumtasks_statusNullableFilter<$PrismaModel>
  }

  export type Enumtasks_priorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_priority | Enumtasks_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_priority[] | null
    notIn?: $Enums.tasks_priority[] | null
    not?: NestedEnumtasks_priorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.tasks_priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtasks_priorityNullableFilter<$PrismaModel>
    _max?: NestedEnumtasks_priorityNullableFilter<$PrismaModel>
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    userid?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    userid?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    userid?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    userid?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    userid?: SortOrder
  }

  export type tasksCreateNestedOneWithoutCommentsInput = {
    create?: XOR<tasksCreateWithoutCommentsInput, tasksUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: tasksCreateOrConnectWithoutCommentsInput
    connect?: tasksWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutCommentsInput = {
    create?: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCommentsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type tasksUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<tasksCreateWithoutCommentsInput, tasksUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: tasksCreateOrConnectWithoutCommentsInput
    upsert?: tasksUpsertWithoutCommentsInput
    disconnect?: tasksWhereInput | boolean
    delete?: tasksWhereInput | boolean
    connect?: tasksWhereUniqueInput
    update?: XOR<XOR<tasksUpdateToOneWithWhereWithoutCommentsInput, tasksUpdateWithoutCommentsInput>, tasksUncheckedUpdateWithoutCommentsInput>
  }

  export type usersUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCommentsInput
    upsert?: usersUpsertWithoutCommentsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCommentsInput, usersUpdateWithoutCommentsInput>, usersUncheckedUpdateWithoutCommentsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type tasksCreateNestedManyWithoutProjectsInput = {
    create?: XOR<tasksCreateWithoutProjectsInput, tasksUncheckedCreateWithoutProjectsInput> | tasksCreateWithoutProjectsInput[] | tasksUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutProjectsInput | tasksCreateOrConnectWithoutProjectsInput[]
    createMany?: tasksCreateManyProjectsInputEnvelope
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
  }

  export type tasksUncheckedCreateNestedManyWithoutProjectsInput = {
    create?: XOR<tasksCreateWithoutProjectsInput, tasksUncheckedCreateWithoutProjectsInput> | tasksCreateWithoutProjectsInput[] | tasksUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutProjectsInput | tasksCreateOrConnectWithoutProjectsInput[]
    createMany?: tasksCreateManyProjectsInputEnvelope
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableEnumprojects_statusFieldUpdateOperationsInput = {
    set?: $Enums.projects_status | null
  }

  export type NullableEnumprojects_priorityFieldUpdateOperationsInput = {
    set?: $Enums.projects_priority | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type tasksUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<tasksCreateWithoutProjectsInput, tasksUncheckedCreateWithoutProjectsInput> | tasksCreateWithoutProjectsInput[] | tasksUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutProjectsInput | tasksCreateOrConnectWithoutProjectsInput[]
    upsert?: tasksUpsertWithWhereUniqueWithoutProjectsInput | tasksUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: tasksCreateManyProjectsInputEnvelope
    set?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    disconnect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    delete?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    update?: tasksUpdateWithWhereUniqueWithoutProjectsInput | tasksUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: tasksUpdateManyWithWhereWithoutProjectsInput | tasksUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: tasksScalarWhereInput | tasksScalarWhereInput[]
  }

  export type tasksUncheckedUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<tasksCreateWithoutProjectsInput, tasksUncheckedCreateWithoutProjectsInput> | tasksCreateWithoutProjectsInput[] | tasksUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutProjectsInput | tasksCreateOrConnectWithoutProjectsInput[]
    upsert?: tasksUpsertWithWhereUniqueWithoutProjectsInput | tasksUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: tasksCreateManyProjectsInputEnvelope
    set?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    disconnect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    delete?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    update?: tasksUpdateWithWhereUniqueWithoutProjectsInput | tasksUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: tasksUpdateManyWithWhereWithoutProjectsInput | tasksUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: tasksScalarWhereInput | tasksScalarWhereInput[]
  }

  export type tasksCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<tasksCreateWithoutSubtasksInput, tasksUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: tasksCreateOrConnectWithoutSubtasksInput
    connect?: tasksWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type tasksUpdateOneRequiredWithoutSubtasksNestedInput = {
    create?: XOR<tasksCreateWithoutSubtasksInput, tasksUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: tasksCreateOrConnectWithoutSubtasksInput
    upsert?: tasksUpsertWithoutSubtasksInput
    connect?: tasksWhereUniqueInput
    update?: XOR<XOR<tasksUpdateToOneWithWhereWithoutSubtasksInput, tasksUpdateWithoutSubtasksInput>, tasksUncheckedUpdateWithoutSubtasksInput>
  }

  export type task_tagsCreateNestedManyWithoutTagsInput = {
    create?: XOR<task_tagsCreateWithoutTagsInput, task_tagsUncheckedCreateWithoutTagsInput> | task_tagsCreateWithoutTagsInput[] | task_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTagsInput | task_tagsCreateOrConnectWithoutTagsInput[]
    createMany?: task_tagsCreateManyTagsInputEnvelope
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
  }

  export type task_tagsUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<task_tagsCreateWithoutTagsInput, task_tagsUncheckedCreateWithoutTagsInput> | task_tagsCreateWithoutTagsInput[] | task_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTagsInput | task_tagsCreateOrConnectWithoutTagsInput[]
    createMany?: task_tagsCreateManyTagsInputEnvelope
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
  }

  export type task_tagsUpdateManyWithoutTagsNestedInput = {
    create?: XOR<task_tagsCreateWithoutTagsInput, task_tagsUncheckedCreateWithoutTagsInput> | task_tagsCreateWithoutTagsInput[] | task_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTagsInput | task_tagsCreateOrConnectWithoutTagsInput[]
    upsert?: task_tagsUpsertWithWhereUniqueWithoutTagsInput | task_tagsUpsertWithWhereUniqueWithoutTagsInput[]
    createMany?: task_tagsCreateManyTagsInputEnvelope
    set?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    disconnect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    delete?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    update?: task_tagsUpdateWithWhereUniqueWithoutTagsInput | task_tagsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: task_tagsUpdateManyWithWhereWithoutTagsInput | task_tagsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: task_tagsScalarWhereInput | task_tagsScalarWhereInput[]
  }

  export type task_tagsUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<task_tagsCreateWithoutTagsInput, task_tagsUncheckedCreateWithoutTagsInput> | task_tagsCreateWithoutTagsInput[] | task_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTagsInput | task_tagsCreateOrConnectWithoutTagsInput[]
    upsert?: task_tagsUpsertWithWhereUniqueWithoutTagsInput | task_tagsUpsertWithWhereUniqueWithoutTagsInput[]
    createMany?: task_tagsCreateManyTagsInputEnvelope
    set?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    disconnect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    delete?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    update?: task_tagsUpdateWithWhereUniqueWithoutTagsInput | task_tagsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: task_tagsUpdateManyWithWhereWithoutTagsInput | task_tagsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: task_tagsScalarWhereInput | task_tagsScalarWhereInput[]
  }

  export type tasksCreateNestedOneWithoutTask_tagsInput = {
    create?: XOR<tasksCreateWithoutTask_tagsInput, tasksUncheckedCreateWithoutTask_tagsInput>
    connectOrCreate?: tasksCreateOrConnectWithoutTask_tagsInput
    connect?: tasksWhereUniqueInput
  }

  export type tagsCreateNestedOneWithoutTask_tagsInput = {
    create?: XOR<tagsCreateWithoutTask_tagsInput, tagsUncheckedCreateWithoutTask_tagsInput>
    connectOrCreate?: tagsCreateOrConnectWithoutTask_tagsInput
    connect?: tagsWhereUniqueInput
  }

  export type tasksUpdateOneRequiredWithoutTask_tagsNestedInput = {
    create?: XOR<tasksCreateWithoutTask_tagsInput, tasksUncheckedCreateWithoutTask_tagsInput>
    connectOrCreate?: tasksCreateOrConnectWithoutTask_tagsInput
    upsert?: tasksUpsertWithoutTask_tagsInput
    connect?: tasksWhereUniqueInput
    update?: XOR<XOR<tasksUpdateToOneWithWhereWithoutTask_tagsInput, tasksUpdateWithoutTask_tagsInput>, tasksUncheckedUpdateWithoutTask_tagsInput>
  }

  export type tagsUpdateOneRequiredWithoutTask_tagsNestedInput = {
    create?: XOR<tagsCreateWithoutTask_tagsInput, tagsUncheckedCreateWithoutTask_tagsInput>
    connectOrCreate?: tagsCreateOrConnectWithoutTask_tagsInput
    upsert?: tagsUpsertWithoutTask_tagsInput
    connect?: tagsWhereUniqueInput
    update?: XOR<XOR<tagsUpdateToOneWithWhereWithoutTask_tagsInput, tagsUpdateWithoutTask_tagsInput>, tagsUncheckedUpdateWithoutTask_tagsInput>
  }

  export type commentsCreateNestedManyWithoutTasksInput = {
    create?: XOR<commentsCreateWithoutTasksInput, commentsUncheckedCreateWithoutTasksInput> | commentsCreateWithoutTasksInput[] | commentsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutTasksInput | commentsCreateOrConnectWithoutTasksInput[]
    createMany?: commentsCreateManyTasksInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type subtasksCreateNestedManyWithoutTasksInput = {
    create?: XOR<subtasksCreateWithoutTasksInput, subtasksUncheckedCreateWithoutTasksInput> | subtasksCreateWithoutTasksInput[] | subtasksUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: subtasksCreateOrConnectWithoutTasksInput | subtasksCreateOrConnectWithoutTasksInput[]
    createMany?: subtasksCreateManyTasksInputEnvelope
    connect?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
  }

  export type task_tagsCreateNestedManyWithoutTasksInput = {
    create?: XOR<task_tagsCreateWithoutTasksInput, task_tagsUncheckedCreateWithoutTasksInput> | task_tagsCreateWithoutTasksInput[] | task_tagsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTasksInput | task_tagsCreateOrConnectWithoutTasksInput[]
    createMany?: task_tagsCreateManyTasksInputEnvelope
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
  }

  export type projectsCreateNestedOneWithoutTasksInput = {
    create?: XOR<projectsCreateWithoutTasksInput, projectsUncheckedCreateWithoutTasksInput>
    connectOrCreate?: projectsCreateOrConnectWithoutTasksInput
    connect?: projectsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput = {
    create?: XOR<usersCreateWithoutTasks_tasks_assignee_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_assignee_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTasks_tasks_assignee_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput = {
    create?: XOR<usersCreateWithoutTasks_tasks_created_by_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_created_by_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTasks_tasks_created_by_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type commentsUncheckedCreateNestedManyWithoutTasksInput = {
    create?: XOR<commentsCreateWithoutTasksInput, commentsUncheckedCreateWithoutTasksInput> | commentsCreateWithoutTasksInput[] | commentsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutTasksInput | commentsCreateOrConnectWithoutTasksInput[]
    createMany?: commentsCreateManyTasksInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type subtasksUncheckedCreateNestedManyWithoutTasksInput = {
    create?: XOR<subtasksCreateWithoutTasksInput, subtasksUncheckedCreateWithoutTasksInput> | subtasksCreateWithoutTasksInput[] | subtasksUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: subtasksCreateOrConnectWithoutTasksInput | subtasksCreateOrConnectWithoutTasksInput[]
    createMany?: subtasksCreateManyTasksInputEnvelope
    connect?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
  }

  export type task_tagsUncheckedCreateNestedManyWithoutTasksInput = {
    create?: XOR<task_tagsCreateWithoutTasksInput, task_tagsUncheckedCreateWithoutTasksInput> | task_tagsCreateWithoutTasksInput[] | task_tagsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTasksInput | task_tagsCreateOrConnectWithoutTasksInput[]
    createMany?: task_tagsCreateManyTasksInputEnvelope
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
  }

  export type NullableEnumtasks_statusFieldUpdateOperationsInput = {
    set?: $Enums.tasks_status | null
  }

  export type NullableEnumtasks_priorityFieldUpdateOperationsInput = {
    set?: $Enums.tasks_priority | null
  }

  export type commentsUpdateManyWithoutTasksNestedInput = {
    create?: XOR<commentsCreateWithoutTasksInput, commentsUncheckedCreateWithoutTasksInput> | commentsCreateWithoutTasksInput[] | commentsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutTasksInput | commentsCreateOrConnectWithoutTasksInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutTasksInput | commentsUpsertWithWhereUniqueWithoutTasksInput[]
    createMany?: commentsCreateManyTasksInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutTasksInput | commentsUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutTasksInput | commentsUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type subtasksUpdateManyWithoutTasksNestedInput = {
    create?: XOR<subtasksCreateWithoutTasksInput, subtasksUncheckedCreateWithoutTasksInput> | subtasksCreateWithoutTasksInput[] | subtasksUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: subtasksCreateOrConnectWithoutTasksInput | subtasksCreateOrConnectWithoutTasksInput[]
    upsert?: subtasksUpsertWithWhereUniqueWithoutTasksInput | subtasksUpsertWithWhereUniqueWithoutTasksInput[]
    createMany?: subtasksCreateManyTasksInputEnvelope
    set?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    disconnect?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    delete?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    connect?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    update?: subtasksUpdateWithWhereUniqueWithoutTasksInput | subtasksUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: subtasksUpdateManyWithWhereWithoutTasksInput | subtasksUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: subtasksScalarWhereInput | subtasksScalarWhereInput[]
  }

  export type task_tagsUpdateManyWithoutTasksNestedInput = {
    create?: XOR<task_tagsCreateWithoutTasksInput, task_tagsUncheckedCreateWithoutTasksInput> | task_tagsCreateWithoutTasksInput[] | task_tagsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTasksInput | task_tagsCreateOrConnectWithoutTasksInput[]
    upsert?: task_tagsUpsertWithWhereUniqueWithoutTasksInput | task_tagsUpsertWithWhereUniqueWithoutTasksInput[]
    createMany?: task_tagsCreateManyTasksInputEnvelope
    set?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    disconnect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    delete?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    update?: task_tagsUpdateWithWhereUniqueWithoutTasksInput | task_tagsUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: task_tagsUpdateManyWithWhereWithoutTasksInput | task_tagsUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: task_tagsScalarWhereInput | task_tagsScalarWhereInput[]
  }

  export type projectsUpdateOneWithoutTasksNestedInput = {
    create?: XOR<projectsCreateWithoutTasksInput, projectsUncheckedCreateWithoutTasksInput>
    connectOrCreate?: projectsCreateOrConnectWithoutTasksInput
    upsert?: projectsUpsertWithoutTasksInput
    disconnect?: projectsWhereInput | boolean
    delete?: projectsWhereInput | boolean
    connect?: projectsWhereUniqueInput
    update?: XOR<XOR<projectsUpdateToOneWithWhereWithoutTasksInput, projectsUpdateWithoutTasksInput>, projectsUncheckedUpdateWithoutTasksInput>
  }

  export type usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutTasks_tasks_assignee_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_assignee_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTasks_tasks_assignee_idTousersInput
    upsert?: usersUpsertWithoutTasks_tasks_assignee_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTasks_tasks_assignee_idTousersInput, usersUpdateWithoutTasks_tasks_assignee_idTousersInput>, usersUncheckedUpdateWithoutTasks_tasks_assignee_idTousersInput>
  }

  export type usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutTasks_tasks_created_by_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_created_by_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTasks_tasks_created_by_idTousersInput
    upsert?: usersUpsertWithoutTasks_tasks_created_by_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTasks_tasks_created_by_idTousersInput, usersUpdateWithoutTasks_tasks_created_by_idTousersInput>, usersUncheckedUpdateWithoutTasks_tasks_created_by_idTousersInput>
  }

  export type commentsUncheckedUpdateManyWithoutTasksNestedInput = {
    create?: XOR<commentsCreateWithoutTasksInput, commentsUncheckedCreateWithoutTasksInput> | commentsCreateWithoutTasksInput[] | commentsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutTasksInput | commentsCreateOrConnectWithoutTasksInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutTasksInput | commentsUpsertWithWhereUniqueWithoutTasksInput[]
    createMany?: commentsCreateManyTasksInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutTasksInput | commentsUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutTasksInput | commentsUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type subtasksUncheckedUpdateManyWithoutTasksNestedInput = {
    create?: XOR<subtasksCreateWithoutTasksInput, subtasksUncheckedCreateWithoutTasksInput> | subtasksCreateWithoutTasksInput[] | subtasksUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: subtasksCreateOrConnectWithoutTasksInput | subtasksCreateOrConnectWithoutTasksInput[]
    upsert?: subtasksUpsertWithWhereUniqueWithoutTasksInput | subtasksUpsertWithWhereUniqueWithoutTasksInput[]
    createMany?: subtasksCreateManyTasksInputEnvelope
    set?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    disconnect?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    delete?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    connect?: subtasksWhereUniqueInput | subtasksWhereUniqueInput[]
    update?: subtasksUpdateWithWhereUniqueWithoutTasksInput | subtasksUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: subtasksUpdateManyWithWhereWithoutTasksInput | subtasksUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: subtasksScalarWhereInput | subtasksScalarWhereInput[]
  }

  export type task_tagsUncheckedUpdateManyWithoutTasksNestedInput = {
    create?: XOR<task_tagsCreateWithoutTasksInput, task_tagsUncheckedCreateWithoutTasksInput> | task_tagsCreateWithoutTasksInput[] | task_tagsUncheckedCreateWithoutTasksInput[]
    connectOrCreate?: task_tagsCreateOrConnectWithoutTasksInput | task_tagsCreateOrConnectWithoutTasksInput[]
    upsert?: task_tagsUpsertWithWhereUniqueWithoutTasksInput | task_tagsUpsertWithWhereUniqueWithoutTasksInput[]
    createMany?: task_tagsCreateManyTasksInputEnvelope
    set?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    disconnect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    delete?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    connect?: task_tagsWhereUniqueInput | task_tagsWhereUniqueInput[]
    update?: task_tagsUpdateWithWhereUniqueWithoutTasksInput | task_tagsUpdateWithWhereUniqueWithoutTasksInput[]
    updateMany?: task_tagsUpdateManyWithWhereWithoutTasksInput | task_tagsUpdateManyWithWhereWithoutTasksInput[]
    deleteMany?: task_tagsScalarWhereInput | task_tagsScalarWhereInput[]
  }

  export type commentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type tasksCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput> | tasksCreateWithoutUsers_tasks_assignee_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_assignee_idTousersInputEnvelope
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
  }

  export type tasksCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput> | tasksCreateWithoutUsers_tasks_created_by_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_created_by_idTousersInputEnvelope
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
  }

  export type commentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
  }

  export type tasksUncheckedCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput> | tasksCreateWithoutUsers_tasks_assignee_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_assignee_idTousersInputEnvelope
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
  }

  export type tasksUncheckedCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput> | tasksCreateWithoutUsers_tasks_created_by_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_created_by_idTousersInputEnvelope
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
  }

  export type commentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutUsersInput | commentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutUsersInput | commentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutUsersInput | commentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type tasksUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput> | tasksCreateWithoutUsers_tasks_assignee_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput[]
    upsert?: tasksUpsertWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput | tasksUpsertWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_assignee_idTousersInputEnvelope
    set?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    disconnect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    delete?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    update?: tasksUpdateWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput | tasksUpdateWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput[]
    updateMany?: tasksUpdateManyWithWhereWithoutUsers_tasks_assignee_idTousersInput | tasksUpdateManyWithWhereWithoutUsers_tasks_assignee_idTousersInput[]
    deleteMany?: tasksScalarWhereInput | tasksScalarWhereInput[]
  }

  export type tasksUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput> | tasksCreateWithoutUsers_tasks_created_by_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput[]
    upsert?: tasksUpsertWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput | tasksUpsertWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_created_by_idTousersInputEnvelope
    set?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    disconnect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    delete?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    update?: tasksUpdateWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput | tasksUpdateWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput[]
    updateMany?: tasksUpdateManyWithWhereWithoutUsers_tasks_created_by_idTousersInput | tasksUpdateManyWithWhereWithoutUsers_tasks_created_by_idTousersInput[]
    deleteMany?: tasksScalarWhereInput | tasksScalarWhereInput[]
  }

  export type commentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput> | commentsCreateWithoutUsersInput[] | commentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: commentsCreateOrConnectWithoutUsersInput | commentsCreateOrConnectWithoutUsersInput[]
    upsert?: commentsUpsertWithWhereUniqueWithoutUsersInput | commentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: commentsCreateManyUsersInputEnvelope
    set?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    disconnect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    delete?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    connect?: commentsWhereUniqueInput | commentsWhereUniqueInput[]
    update?: commentsUpdateWithWhereUniqueWithoutUsersInput | commentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: commentsUpdateManyWithWhereWithoutUsersInput | commentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: commentsScalarWhereInput | commentsScalarWhereInput[]
  }

  export type tasksUncheckedUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput> | tasksCreateWithoutUsers_tasks_assignee_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput[]
    upsert?: tasksUpsertWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput | tasksUpsertWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_assignee_idTousersInputEnvelope
    set?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    disconnect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    delete?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    update?: tasksUpdateWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput | tasksUpdateWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput[]
    updateMany?: tasksUpdateManyWithWhereWithoutUsers_tasks_assignee_idTousersInput | tasksUpdateManyWithWhereWithoutUsers_tasks_assignee_idTousersInput[]
    deleteMany?: tasksScalarWhereInput | tasksScalarWhereInput[]
  }

  export type tasksUncheckedUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput = {
    create?: XOR<tasksCreateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput> | tasksCreateWithoutUsers_tasks_created_by_idTousersInput[] | tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput[]
    connectOrCreate?: tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput | tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput[]
    upsert?: tasksUpsertWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput | tasksUpsertWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput[]
    createMany?: tasksCreateManyUsers_tasks_created_by_idTousersInputEnvelope
    set?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    disconnect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    delete?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    connect?: tasksWhereUniqueInput | tasksWhereUniqueInput[]
    update?: tasksUpdateWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput | tasksUpdateWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput[]
    updateMany?: tasksUpdateManyWithWhereWithoutUsers_tasks_created_by_idTousersInput | tasksUpdateManyWithWhereWithoutUsers_tasks_created_by_idTousersInput[]
    deleteMany?: tasksScalarWhereInput | tasksScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumprojects_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_status | Enumprojects_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_status[] | null
    notIn?: $Enums.projects_status[] | null
    not?: NestedEnumprojects_statusNullableFilter<$PrismaModel> | $Enums.projects_status | null
  }

  export type NestedEnumprojects_priorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_priority | Enumprojects_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_priority[] | null
    notIn?: $Enums.projects_priority[] | null
    not?: NestedEnumprojects_priorityNullableFilter<$PrismaModel> | $Enums.projects_priority | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumprojects_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_status | Enumprojects_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_status[] | null
    notIn?: $Enums.projects_status[] | null
    not?: NestedEnumprojects_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.projects_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumprojects_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumprojects_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumprojects_priorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_priority | Enumprojects_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_priority[] | null
    notIn?: $Enums.projects_priority[] | null
    not?: NestedEnumprojects_priorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.projects_priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumprojects_priorityNullableFilter<$PrismaModel>
    _max?: NestedEnumprojects_priorityNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumtasks_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_status | Enumtasks_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_status[] | null
    notIn?: $Enums.tasks_status[] | null
    not?: NestedEnumtasks_statusNullableFilter<$PrismaModel> | $Enums.tasks_status | null
  }

  export type NestedEnumtasks_priorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_priority | Enumtasks_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_priority[] | null
    notIn?: $Enums.tasks_priority[] | null
    not?: NestedEnumtasks_priorityNullableFilter<$PrismaModel> | $Enums.tasks_priority | null
  }

  export type NestedEnumtasks_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_status | Enumtasks_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_status[] | null
    notIn?: $Enums.tasks_status[] | null
    not?: NestedEnumtasks_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.tasks_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtasks_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumtasks_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumtasks_priorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tasks_priority | Enumtasks_priorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.tasks_priority[] | null
    notIn?: $Enums.tasks_priority[] | null
    not?: NestedEnumtasks_priorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.tasks_priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtasks_priorityNullableFilter<$PrismaModel>
    _max?: NestedEnumtasks_priorityNullableFilter<$PrismaModel>
  }

  export type tasksCreateWithoutCommentsInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    subtasks?: subtasksCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsCreateNestedManyWithoutTasksInput
    projects?: projectsCreateNestedOneWithoutTasksInput
    users_tasks_assignee_idTousers: usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput
    users_tasks_created_by_idTousers: usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput
  }

  export type tasksUncheckedCreateWithoutCommentsInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
    subtasks?: subtasksUncheckedCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksCreateOrConnectWithoutCommentsInput = {
    where: tasksWhereUniqueInput
    create: XOR<tasksCreateWithoutCommentsInput, tasksUncheckedCreateWithoutCommentsInput>
  }

  export type usersCreateWithoutCommentsInput = {
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    tasks_tasks_assignee_idTousers?: tasksCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput
    tasks_tasks_created_by_idTousers?: tasksCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput
  }

  export type usersUncheckedCreateWithoutCommentsInput = {
    userid?: number
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    tasks_tasks_assignee_idTousers?: tasksUncheckedCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput
    tasks_tasks_created_by_idTousers?: tasksUncheckedCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput
  }

  export type usersCreateOrConnectWithoutCommentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
  }

  export type tasksUpsertWithoutCommentsInput = {
    update: XOR<tasksUpdateWithoutCommentsInput, tasksUncheckedUpdateWithoutCommentsInput>
    create: XOR<tasksCreateWithoutCommentsInput, tasksUncheckedCreateWithoutCommentsInput>
    where?: tasksWhereInput
  }

  export type tasksUpdateToOneWithWhereWithoutCommentsInput = {
    where?: tasksWhereInput
    data: XOR<tasksUpdateWithoutCommentsInput, tasksUncheckedUpdateWithoutCommentsInput>
  }

  export type tasksUpdateWithoutCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subtasks?: subtasksUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUpdateManyWithoutTasksNestedInput
    projects?: projectsUpdateOneWithoutTasksNestedInput
    users_tasks_assignee_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput
    users_tasks_created_by_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput
  }

  export type tasksUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subtasks?: subtasksUncheckedUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type usersUpsertWithoutCommentsInput = {
    update: XOR<usersUpdateWithoutCommentsInput, usersUncheckedUpdateWithoutCommentsInput>
    create: XOR<usersCreateWithoutCommentsInput, usersUncheckedCreateWithoutCommentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCommentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCommentsInput, usersUncheckedUpdateWithoutCommentsInput>
  }

  export type usersUpdateWithoutCommentsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks_tasks_assignee_idTousers?: tasksUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput
    tasks_tasks_created_by_idTousers?: tasksUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutCommentsInput = {
    userid?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks_tasks_assignee_idTousers?: tasksUncheckedUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput
    tasks_tasks_created_by_idTousers?: tasksUncheckedUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput
  }

  export type tasksCreateWithoutProjectsInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutTasksInput
    subtasks?: subtasksCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsCreateNestedManyWithoutTasksInput
    users_tasks_assignee_idTousers: usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput
    users_tasks_created_by_idTousers: usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput
  }

  export type tasksUncheckedCreateWithoutProjectsInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutTasksInput
    subtasks?: subtasksUncheckedCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksCreateOrConnectWithoutProjectsInput = {
    where: tasksWhereUniqueInput
    create: XOR<tasksCreateWithoutProjectsInput, tasksUncheckedCreateWithoutProjectsInput>
  }

  export type tasksCreateManyProjectsInputEnvelope = {
    data: tasksCreateManyProjectsInput | tasksCreateManyProjectsInput[]
    skipDuplicates?: boolean
  }

  export type tasksUpsertWithWhereUniqueWithoutProjectsInput = {
    where: tasksWhereUniqueInput
    update: XOR<tasksUpdateWithoutProjectsInput, tasksUncheckedUpdateWithoutProjectsInput>
    create: XOR<tasksCreateWithoutProjectsInput, tasksUncheckedCreateWithoutProjectsInput>
  }

  export type tasksUpdateWithWhereUniqueWithoutProjectsInput = {
    where: tasksWhereUniqueInput
    data: XOR<tasksUpdateWithoutProjectsInput, tasksUncheckedUpdateWithoutProjectsInput>
  }

  export type tasksUpdateManyWithWhereWithoutProjectsInput = {
    where: tasksScalarWhereInput
    data: XOR<tasksUpdateManyMutationInput, tasksUncheckedUpdateManyWithoutProjectsInput>
  }

  export type tasksScalarWhereInput = {
    AND?: tasksScalarWhereInput | tasksScalarWhereInput[]
    OR?: tasksScalarWhereInput[]
    NOT?: tasksScalarWhereInput | tasksScalarWhereInput[]
    id?: IntFilter<"tasks"> | number
    title?: StringFilter<"tasks"> | string
    description?: StringNullableFilter<"tasks"> | string | null
    status?: Enumtasks_statusNullableFilter<"tasks"> | $Enums.tasks_status | null
    priority?: Enumtasks_priorityNullableFilter<"tasks"> | $Enums.tasks_priority | null
    due_date?: DateTimeNullableFilter<"tasks"> | Date | string | null
    project_id?: IntNullableFilter<"tasks"> | number | null
    assignee_id?: IntFilter<"tasks"> | number
    created_by_id?: IntFilter<"tasks"> | number
    created_at?: DateTimeNullableFilter<"tasks"> | Date | string | null
  }

  export type tasksCreateWithoutSubtasksInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsCreateNestedManyWithoutTasksInput
    projects?: projectsCreateNestedOneWithoutTasksInput
    users_tasks_assignee_idTousers: usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput
    users_tasks_created_by_idTousers: usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput
  }

  export type tasksUncheckedCreateWithoutSubtasksInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksCreateOrConnectWithoutSubtasksInput = {
    where: tasksWhereUniqueInput
    create: XOR<tasksCreateWithoutSubtasksInput, tasksUncheckedCreateWithoutSubtasksInput>
  }

  export type tasksUpsertWithoutSubtasksInput = {
    update: XOR<tasksUpdateWithoutSubtasksInput, tasksUncheckedUpdateWithoutSubtasksInput>
    create: XOR<tasksCreateWithoutSubtasksInput, tasksUncheckedCreateWithoutSubtasksInput>
    where?: tasksWhereInput
  }

  export type tasksUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: tasksWhereInput
    data: XOR<tasksUpdateWithoutSubtasksInput, tasksUncheckedUpdateWithoutSubtasksInput>
  }

  export type tasksUpdateWithoutSubtasksInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUpdateManyWithoutTasksNestedInput
    projects?: projectsUpdateOneWithoutTasksNestedInput
    users_tasks_assignee_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput
    users_tasks_created_by_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput
  }

  export type tasksUncheckedUpdateWithoutSubtasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type task_tagsCreateWithoutTagsInput = {
    tasks: tasksCreateNestedOneWithoutTask_tagsInput
  }

  export type task_tagsUncheckedCreateWithoutTagsInput = {
    task_id: number
  }

  export type task_tagsCreateOrConnectWithoutTagsInput = {
    where: task_tagsWhereUniqueInput
    create: XOR<task_tagsCreateWithoutTagsInput, task_tagsUncheckedCreateWithoutTagsInput>
  }

  export type task_tagsCreateManyTagsInputEnvelope = {
    data: task_tagsCreateManyTagsInput | task_tagsCreateManyTagsInput[]
    skipDuplicates?: boolean
  }

  export type task_tagsUpsertWithWhereUniqueWithoutTagsInput = {
    where: task_tagsWhereUniqueInput
    update: XOR<task_tagsUpdateWithoutTagsInput, task_tagsUncheckedUpdateWithoutTagsInput>
    create: XOR<task_tagsCreateWithoutTagsInput, task_tagsUncheckedCreateWithoutTagsInput>
  }

  export type task_tagsUpdateWithWhereUniqueWithoutTagsInput = {
    where: task_tagsWhereUniqueInput
    data: XOR<task_tagsUpdateWithoutTagsInput, task_tagsUncheckedUpdateWithoutTagsInput>
  }

  export type task_tagsUpdateManyWithWhereWithoutTagsInput = {
    where: task_tagsScalarWhereInput
    data: XOR<task_tagsUpdateManyMutationInput, task_tagsUncheckedUpdateManyWithoutTagsInput>
  }

  export type task_tagsScalarWhereInput = {
    AND?: task_tagsScalarWhereInput | task_tagsScalarWhereInput[]
    OR?: task_tagsScalarWhereInput[]
    NOT?: task_tagsScalarWhereInput | task_tagsScalarWhereInput[]
    task_id?: IntFilter<"task_tags"> | number
    tag_id?: IntFilter<"task_tags"> | number
  }

  export type tasksCreateWithoutTask_tagsInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutTasksInput
    subtasks?: subtasksCreateNestedManyWithoutTasksInput
    projects?: projectsCreateNestedOneWithoutTasksInput
    users_tasks_assignee_idTousers: usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput
    users_tasks_created_by_idTousers: usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput
  }

  export type tasksUncheckedCreateWithoutTask_tagsInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutTasksInput
    subtasks?: subtasksUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksCreateOrConnectWithoutTask_tagsInput = {
    where: tasksWhereUniqueInput
    create: XOR<tasksCreateWithoutTask_tagsInput, tasksUncheckedCreateWithoutTask_tagsInput>
  }

  export type tagsCreateWithoutTask_tagsInput = {
    name: string
  }

  export type tagsUncheckedCreateWithoutTask_tagsInput = {
    tag_id?: number
    name: string
  }

  export type tagsCreateOrConnectWithoutTask_tagsInput = {
    where: tagsWhereUniqueInput
    create: XOR<tagsCreateWithoutTask_tagsInput, tagsUncheckedCreateWithoutTask_tagsInput>
  }

  export type tasksUpsertWithoutTask_tagsInput = {
    update: XOR<tasksUpdateWithoutTask_tagsInput, tasksUncheckedUpdateWithoutTask_tagsInput>
    create: XOR<tasksCreateWithoutTask_tagsInput, tasksUncheckedCreateWithoutTask_tagsInput>
    where?: tasksWhereInput
  }

  export type tasksUpdateToOneWithWhereWithoutTask_tagsInput = {
    where?: tasksWhereInput
    data: XOR<tasksUpdateWithoutTask_tagsInput, tasksUncheckedUpdateWithoutTask_tagsInput>
  }

  export type tasksUpdateWithoutTask_tagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUpdateManyWithoutTasksNestedInput
    projects?: projectsUpdateOneWithoutTasksNestedInput
    users_tasks_assignee_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput
    users_tasks_created_by_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput
  }

  export type tasksUncheckedUpdateWithoutTask_tagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type tagsUpsertWithoutTask_tagsInput = {
    update: XOR<tagsUpdateWithoutTask_tagsInput, tagsUncheckedUpdateWithoutTask_tagsInput>
    create: XOR<tagsCreateWithoutTask_tagsInput, tagsUncheckedCreateWithoutTask_tagsInput>
    where?: tagsWhereInput
  }

  export type tagsUpdateToOneWithWhereWithoutTask_tagsInput = {
    where?: tagsWhereInput
    data: XOR<tagsUpdateWithoutTask_tagsInput, tagsUncheckedUpdateWithoutTask_tagsInput>
  }

  export type tagsUpdateWithoutTask_tagsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type tagsUncheckedUpdateWithoutTask_tagsInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type commentsCreateWithoutTasksInput = {
    content?: string | null
    users?: usersCreateNestedOneWithoutCommentsInput
  }

  export type commentsUncheckedCreateWithoutTasksInput = {
    comment_id?: number
    content?: string | null
    user_id?: number | null
  }

  export type commentsCreateOrConnectWithoutTasksInput = {
    where: commentsWhereUniqueInput
    create: XOR<commentsCreateWithoutTasksInput, commentsUncheckedCreateWithoutTasksInput>
  }

  export type commentsCreateManyTasksInputEnvelope = {
    data: commentsCreateManyTasksInput | commentsCreateManyTasksInput[]
    skipDuplicates?: boolean
  }

  export type subtasksCreateWithoutTasksInput = {
    title?: string | null
    completed?: boolean | null
  }

  export type subtasksUncheckedCreateWithoutTasksInput = {
    subtask_id?: number
    title?: string | null
    completed?: boolean | null
  }

  export type subtasksCreateOrConnectWithoutTasksInput = {
    where: subtasksWhereUniqueInput
    create: XOR<subtasksCreateWithoutTasksInput, subtasksUncheckedCreateWithoutTasksInput>
  }

  export type subtasksCreateManyTasksInputEnvelope = {
    data: subtasksCreateManyTasksInput | subtasksCreateManyTasksInput[]
    skipDuplicates?: boolean
  }

  export type task_tagsCreateWithoutTasksInput = {
    tags: tagsCreateNestedOneWithoutTask_tagsInput
  }

  export type task_tagsUncheckedCreateWithoutTasksInput = {
    tag_id: number
  }

  export type task_tagsCreateOrConnectWithoutTasksInput = {
    where: task_tagsWhereUniqueInput
    create: XOR<task_tagsCreateWithoutTasksInput, task_tagsUncheckedCreateWithoutTasksInput>
  }

  export type task_tagsCreateManyTasksInputEnvelope = {
    data: task_tagsCreateManyTasksInput | task_tagsCreateManyTasksInput[]
    skipDuplicates?: boolean
  }

  export type projectsCreateWithoutTasksInput = {
    name: string
    description?: string | null
    status?: $Enums.projects_status | null
    priority?: $Enums.projects_priority | null
    start_date?: Date | string | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type projectsUncheckedCreateWithoutTasksInput = {
    project_id?: number
    name: string
    description?: string | null
    status?: $Enums.projects_status | null
    priority?: $Enums.projects_priority | null
    start_date?: Date | string | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type projectsCreateOrConnectWithoutTasksInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutTasksInput, projectsUncheckedCreateWithoutTasksInput>
  }

  export type usersCreateWithoutTasks_tasks_assignee_idTousersInput = {
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutUsersInput
    tasks_tasks_created_by_idTousers?: tasksCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput
  }

  export type usersUncheckedCreateWithoutTasks_tasks_assignee_idTousersInput = {
    userid?: number
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    tasks_tasks_created_by_idTousers?: tasksUncheckedCreateNestedManyWithoutUsers_tasks_created_by_idTousersInput
  }

  export type usersCreateOrConnectWithoutTasks_tasks_assignee_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTasks_tasks_assignee_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_assignee_idTousersInput>
  }

  export type usersCreateWithoutTasks_tasks_created_by_idTousersInput = {
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutUsersInput
    tasks_tasks_assignee_idTousers?: tasksCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput
  }

  export type usersUncheckedCreateWithoutTasks_tasks_created_by_idTousersInput = {
    userid?: number
    username: string
    email: string
    password: string
    role?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutUsersInput
    tasks_tasks_assignee_idTousers?: tasksUncheckedCreateNestedManyWithoutUsers_tasks_assignee_idTousersInput
  }

  export type usersCreateOrConnectWithoutTasks_tasks_created_by_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTasks_tasks_created_by_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_created_by_idTousersInput>
  }

  export type commentsUpsertWithWhereUniqueWithoutTasksInput = {
    where: commentsWhereUniqueInput
    update: XOR<commentsUpdateWithoutTasksInput, commentsUncheckedUpdateWithoutTasksInput>
    create: XOR<commentsCreateWithoutTasksInput, commentsUncheckedCreateWithoutTasksInput>
  }

  export type commentsUpdateWithWhereUniqueWithoutTasksInput = {
    where: commentsWhereUniqueInput
    data: XOR<commentsUpdateWithoutTasksInput, commentsUncheckedUpdateWithoutTasksInput>
  }

  export type commentsUpdateManyWithWhereWithoutTasksInput = {
    where: commentsScalarWhereInput
    data: XOR<commentsUpdateManyMutationInput, commentsUncheckedUpdateManyWithoutTasksInput>
  }

  export type commentsScalarWhereInput = {
    AND?: commentsScalarWhereInput | commentsScalarWhereInput[]
    OR?: commentsScalarWhereInput[]
    NOT?: commentsScalarWhereInput | commentsScalarWhereInput[]
    comment_id?: IntFilter<"comments"> | number
    content?: StringNullableFilter<"comments"> | string | null
    task_id?: IntNullableFilter<"comments"> | number | null
    user_id?: IntNullableFilter<"comments"> | number | null
  }

  export type subtasksUpsertWithWhereUniqueWithoutTasksInput = {
    where: subtasksWhereUniqueInput
    update: XOR<subtasksUpdateWithoutTasksInput, subtasksUncheckedUpdateWithoutTasksInput>
    create: XOR<subtasksCreateWithoutTasksInput, subtasksUncheckedCreateWithoutTasksInput>
  }

  export type subtasksUpdateWithWhereUniqueWithoutTasksInput = {
    where: subtasksWhereUniqueInput
    data: XOR<subtasksUpdateWithoutTasksInput, subtasksUncheckedUpdateWithoutTasksInput>
  }

  export type subtasksUpdateManyWithWhereWithoutTasksInput = {
    where: subtasksScalarWhereInput
    data: XOR<subtasksUpdateManyMutationInput, subtasksUncheckedUpdateManyWithoutTasksInput>
  }

  export type subtasksScalarWhereInput = {
    AND?: subtasksScalarWhereInput | subtasksScalarWhereInput[]
    OR?: subtasksScalarWhereInput[]
    NOT?: subtasksScalarWhereInput | subtasksScalarWhereInput[]
    subtask_id?: IntFilter<"subtasks"> | number
    title?: StringNullableFilter<"subtasks"> | string | null
    completed?: BoolNullableFilter<"subtasks"> | boolean | null
    task_id?: IntFilter<"subtasks"> | number
  }

  export type task_tagsUpsertWithWhereUniqueWithoutTasksInput = {
    where: task_tagsWhereUniqueInput
    update: XOR<task_tagsUpdateWithoutTasksInput, task_tagsUncheckedUpdateWithoutTasksInput>
    create: XOR<task_tagsCreateWithoutTasksInput, task_tagsUncheckedCreateWithoutTasksInput>
  }

  export type task_tagsUpdateWithWhereUniqueWithoutTasksInput = {
    where: task_tagsWhereUniqueInput
    data: XOR<task_tagsUpdateWithoutTasksInput, task_tagsUncheckedUpdateWithoutTasksInput>
  }

  export type task_tagsUpdateManyWithWhereWithoutTasksInput = {
    where: task_tagsScalarWhereInput
    data: XOR<task_tagsUpdateManyMutationInput, task_tagsUncheckedUpdateManyWithoutTasksInput>
  }

  export type projectsUpsertWithoutTasksInput = {
    update: XOR<projectsUpdateWithoutTasksInput, projectsUncheckedUpdateWithoutTasksInput>
    create: XOR<projectsCreateWithoutTasksInput, projectsUncheckedCreateWithoutTasksInput>
    where?: projectsWhereInput
  }

  export type projectsUpdateToOneWithWhereWithoutTasksInput = {
    where?: projectsWhereInput
    data: XOR<projectsUpdateWithoutTasksInput, projectsUncheckedUpdateWithoutTasksInput>
  }

  export type projectsUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumprojects_statusFieldUpdateOperationsInput | $Enums.projects_status | null
    priority?: NullableEnumprojects_priorityFieldUpdateOperationsInput | $Enums.projects_priority | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsUncheckedUpdateWithoutTasksInput = {
    project_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumprojects_statusFieldUpdateOperationsInput | $Enums.projects_status | null
    priority?: NullableEnumprojects_priorityFieldUpdateOperationsInput | $Enums.projects_priority | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUpsertWithoutTasks_tasks_assignee_idTousersInput = {
    update: XOR<usersUpdateWithoutTasks_tasks_assignee_idTousersInput, usersUncheckedUpdateWithoutTasks_tasks_assignee_idTousersInput>
    create: XOR<usersCreateWithoutTasks_tasks_assignee_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_assignee_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTasks_tasks_assignee_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTasks_tasks_assignee_idTousersInput, usersUncheckedUpdateWithoutTasks_tasks_assignee_idTousersInput>
  }

  export type usersUpdateWithoutTasks_tasks_assignee_idTousersInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutUsersNestedInput
    tasks_tasks_created_by_idTousers?: tasksUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutTasks_tasks_assignee_idTousersInput = {
    userid?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    tasks_tasks_created_by_idTousers?: tasksUncheckedUpdateManyWithoutUsers_tasks_created_by_idTousersNestedInput
  }

  export type usersUpsertWithoutTasks_tasks_created_by_idTousersInput = {
    update: XOR<usersUpdateWithoutTasks_tasks_created_by_idTousersInput, usersUncheckedUpdateWithoutTasks_tasks_created_by_idTousersInput>
    create: XOR<usersCreateWithoutTasks_tasks_created_by_idTousersInput, usersUncheckedCreateWithoutTasks_tasks_created_by_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTasks_tasks_created_by_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTasks_tasks_created_by_idTousersInput, usersUncheckedUpdateWithoutTasks_tasks_created_by_idTousersInput>
  }

  export type usersUpdateWithoutTasks_tasks_created_by_idTousersInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutUsersNestedInput
    tasks_tasks_assignee_idTousers?: tasksUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutTasks_tasks_created_by_idTousersInput = {
    userid?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutUsersNestedInput
    tasks_tasks_assignee_idTousers?: tasksUncheckedUpdateManyWithoutUsers_tasks_assignee_idTousersNestedInput
  }

  export type commentsCreateWithoutUsersInput = {
    content?: string | null
    tasks?: tasksCreateNestedOneWithoutCommentsInput
  }

  export type commentsUncheckedCreateWithoutUsersInput = {
    comment_id?: number
    content?: string | null
    task_id?: number | null
  }

  export type commentsCreateOrConnectWithoutUsersInput = {
    where: commentsWhereUniqueInput
    create: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput>
  }

  export type commentsCreateManyUsersInputEnvelope = {
    data: commentsCreateManyUsersInput | commentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type tasksCreateWithoutUsers_tasks_assignee_idTousersInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutTasksInput
    subtasks?: subtasksCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsCreateNestedManyWithoutTasksInput
    projects?: projectsCreateNestedOneWithoutTasksInput
    users_tasks_created_by_idTousers: usersCreateNestedOneWithoutTasks_tasks_created_by_idTousersInput
  }

  export type tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    created_by_id: number
    created_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutTasksInput
    subtasks?: subtasksUncheckedCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksCreateOrConnectWithoutUsers_tasks_assignee_idTousersInput = {
    where: tasksWhereUniqueInput
    create: XOR<tasksCreateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput>
  }

  export type tasksCreateManyUsers_tasks_assignee_idTousersInputEnvelope = {
    data: tasksCreateManyUsers_tasks_assignee_idTousersInput | tasksCreateManyUsers_tasks_assignee_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type tasksCreateWithoutUsers_tasks_created_by_idTousersInput = {
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    comments?: commentsCreateNestedManyWithoutTasksInput
    subtasks?: subtasksCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsCreateNestedManyWithoutTasksInput
    projects?: projectsCreateNestedOneWithoutTasksInput
    users_tasks_assignee_idTousers: usersCreateNestedOneWithoutTasks_tasks_assignee_idTousersInput
  }

  export type tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_at?: Date | string | null
    comments?: commentsUncheckedCreateNestedManyWithoutTasksInput
    subtasks?: subtasksUncheckedCreateNestedManyWithoutTasksInput
    task_tags?: task_tagsUncheckedCreateNestedManyWithoutTasksInput
  }

  export type tasksCreateOrConnectWithoutUsers_tasks_created_by_idTousersInput = {
    where: tasksWhereUniqueInput
    create: XOR<tasksCreateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput>
  }

  export type tasksCreateManyUsers_tasks_created_by_idTousersInputEnvelope = {
    data: tasksCreateManyUsers_tasks_created_by_idTousersInput | tasksCreateManyUsers_tasks_created_by_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type commentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: commentsWhereUniqueInput
    update: XOR<commentsUpdateWithoutUsersInput, commentsUncheckedUpdateWithoutUsersInput>
    create: XOR<commentsCreateWithoutUsersInput, commentsUncheckedCreateWithoutUsersInput>
  }

  export type commentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: commentsWhereUniqueInput
    data: XOR<commentsUpdateWithoutUsersInput, commentsUncheckedUpdateWithoutUsersInput>
  }

  export type commentsUpdateManyWithWhereWithoutUsersInput = {
    where: commentsScalarWhereInput
    data: XOR<commentsUpdateManyMutationInput, commentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type tasksUpsertWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput = {
    where: tasksWhereUniqueInput
    update: XOR<tasksUpdateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedUpdateWithoutUsers_tasks_assignee_idTousersInput>
    create: XOR<tasksCreateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_assignee_idTousersInput>
  }

  export type tasksUpdateWithWhereUniqueWithoutUsers_tasks_assignee_idTousersInput = {
    where: tasksWhereUniqueInput
    data: XOR<tasksUpdateWithoutUsers_tasks_assignee_idTousersInput, tasksUncheckedUpdateWithoutUsers_tasks_assignee_idTousersInput>
  }

  export type tasksUpdateManyWithWhereWithoutUsers_tasks_assignee_idTousersInput = {
    where: tasksScalarWhereInput
    data: XOR<tasksUpdateManyMutationInput, tasksUncheckedUpdateManyWithoutUsers_tasks_assignee_idTousersInput>
  }

  export type tasksUpsertWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput = {
    where: tasksWhereUniqueInput
    update: XOR<tasksUpdateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedUpdateWithoutUsers_tasks_created_by_idTousersInput>
    create: XOR<tasksCreateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedCreateWithoutUsers_tasks_created_by_idTousersInput>
  }

  export type tasksUpdateWithWhereUniqueWithoutUsers_tasks_created_by_idTousersInput = {
    where: tasksWhereUniqueInput
    data: XOR<tasksUpdateWithoutUsers_tasks_created_by_idTousersInput, tasksUncheckedUpdateWithoutUsers_tasks_created_by_idTousersInput>
  }

  export type tasksUpdateManyWithWhereWithoutUsers_tasks_created_by_idTousersInput = {
    where: tasksScalarWhereInput
    data: XOR<tasksUpdateManyMutationInput, tasksUncheckedUpdateManyWithoutUsers_tasks_created_by_idTousersInput>
  }

  export type tasksCreateManyProjectsInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    assignee_id: number
    created_by_id: number
    created_at?: Date | string | null
  }

  export type tasksUpdateWithoutProjectsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUpdateManyWithoutTasksNestedInput
    users_tasks_assignee_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput
    users_tasks_created_by_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput
  }

  export type tasksUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUncheckedUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type tasksUncheckedUpdateManyWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type task_tagsCreateManyTagsInput = {
    task_id: number
  }

  export type task_tagsUpdateWithoutTagsInput = {
    tasks?: tasksUpdateOneRequiredWithoutTask_tagsNestedInput
  }

  export type task_tagsUncheckedUpdateWithoutTagsInput = {
    task_id?: IntFieldUpdateOperationsInput | number
  }

  export type task_tagsUncheckedUpdateManyWithoutTagsInput = {
    task_id?: IntFieldUpdateOperationsInput | number
  }

  export type commentsCreateManyTasksInput = {
    comment_id?: number
    content?: string | null
    user_id?: number | null
  }

  export type subtasksCreateManyTasksInput = {
    subtask_id?: number
    title?: string | null
    completed?: boolean | null
  }

  export type task_tagsCreateManyTasksInput = {
    tag_id: number
  }

  export type commentsUpdateWithoutTasksInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneWithoutCommentsNestedInput
  }

  export type commentsUncheckedUpdateWithoutTasksInput = {
    comment_id?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type commentsUncheckedUpdateManyWithoutTasksInput = {
    comment_id?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type subtasksUpdateWithoutTasksInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type subtasksUncheckedUpdateWithoutTasksInput = {
    subtask_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type subtasksUncheckedUpdateManyWithoutTasksInput = {
    subtask_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type task_tagsUpdateWithoutTasksInput = {
    tags?: tagsUpdateOneRequiredWithoutTask_tagsNestedInput
  }

  export type task_tagsUncheckedUpdateWithoutTasksInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type task_tagsUncheckedUpdateManyWithoutTasksInput = {
    tag_id?: IntFieldUpdateOperationsInput | number
  }

  export type commentsCreateManyUsersInput = {
    comment_id?: number
    content?: string | null
    task_id?: number | null
  }

  export type tasksCreateManyUsers_tasks_assignee_idTousersInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    created_by_id: number
    created_at?: Date | string | null
  }

  export type tasksCreateManyUsers_tasks_created_by_idTousersInput = {
    id?: number
    title: string
    description?: string | null
    status?: $Enums.tasks_status | null
    priority?: $Enums.tasks_priority | null
    due_date?: Date | string | null
    project_id?: number | null
    assignee_id: number
    created_at?: Date | string | null
  }

  export type commentsUpdateWithoutUsersInput = {
    content?: NullableStringFieldUpdateOperationsInput | string | null
    tasks?: tasksUpdateOneWithoutCommentsNestedInput
  }

  export type commentsUncheckedUpdateWithoutUsersInput = {
    comment_id?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    task_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type commentsUncheckedUpdateManyWithoutUsersInput = {
    comment_id?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    task_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type tasksUpdateWithoutUsers_tasks_assignee_idTousersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUpdateManyWithoutTasksNestedInput
    projects?: projectsUpdateOneWithoutTasksNestedInput
    users_tasks_created_by_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_created_by_idTousersNestedInput
  }

  export type tasksUncheckedUpdateWithoutUsers_tasks_assignee_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUncheckedUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type tasksUncheckedUpdateManyWithoutUsers_tasks_assignee_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_by_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tasksUpdateWithoutUsers_tasks_created_by_idTousersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUpdateManyWithoutTasksNestedInput
    projects?: projectsUpdateOneWithoutTasksNestedInput
    users_tasks_assignee_idTousers?: usersUpdateOneRequiredWithoutTasks_tasks_assignee_idTousersNestedInput
  }

  export type tasksUncheckedUpdateWithoutUsers_tasks_created_by_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: commentsUncheckedUpdateManyWithoutTasksNestedInput
    subtasks?: subtasksUncheckedUpdateManyWithoutTasksNestedInput
    task_tags?: task_tagsUncheckedUpdateManyWithoutTasksNestedInput
  }

  export type tasksUncheckedUpdateManyWithoutUsers_tasks_created_by_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumtasks_statusFieldUpdateOperationsInput | $Enums.tasks_status | null
    priority?: NullableEnumtasks_priorityFieldUpdateOperationsInput | $Enums.tasks_priority | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    assignee_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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