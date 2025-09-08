// 1xx Informational
export const CONTINUE = 100 as const;
export const SWITCHING_PROTOCOLS = 101 as const;
export const PROCESSING = 102 as const;
export const EARLY_HINTS = 103 as const;

// 2xx Success
export const OK = 200 as const;
export const CREATED = 201 as const;
export const ACCEPTED = 202 as const;
export const NON_AUTHORITATIVE_INFORMATION = 203 as const;
export const NO_CONTENT = 204 as const;
export const NO_CONTENT_REFRESH = 205 as const;
export const RESET_CONTENT = 205 as const;
export const PARTIAL_CONTENT = 206 as const;
export const MULTI_STATUS = 207 as const;
export const ALREADY_REPORTED = 208 as const;
export const IM_USED = 226 as const;

// 3xx Redirection
export const MULTIPLE_CHOICES = 300 as const;
export const MOVED_PERMANENTLY = 301 as const;
export const FOUND = 302 as const;
export const SEE_OTHER = 303 as const;
export const NOT_MODIFIED = 304 as const;
export const USE_PROXY = 305 as const;
export const TEMPORARY_REDIRECT = 307 as const;
export const PERMANENT_REDIRECT = 308 as const;

// 4xx Client Errors
export const BAD_REQUEST = 400 as const;
export const UNAUTHORIZED = 401 as const;
export const PAYMENT_REQUIRED = 402 as const;
export const FORBIDDEN = 403 as const;
export const NOT_FOUND = 404 as const;
export const METHOD_NOT_ALLOWED = 405 as const;
export const NOT_ACCEPTABLE = 406 as const;
export const PROXY_AUTHENTICATION_REQUIRED = 407 as const;
export const REQUEST_TIMEOUT = 408 as const;
export const CONFLICT = 409 as const;
export const GONE = 410 as const;
export const LENGTH_REQUIRED = 411 as const;
export const PRECONDITION_FAILED = 412 as const;
export const PAYLOAD_TOO_LARGE = 413 as const;
export const URI_TOO_LONG = 414 as const;
export const UNSUPPORTED_MEDIA_TYPE = 415 as const;
export const RANGE_NOT_SATISFIABLE = 416 as const;
export const EXPECTATION_FAILED = 417 as const;
export const IM_A_TEAPOT = 418 as const;
export const MISDIRECTED_REQUEST = 421 as const;
export const UNPROCESSABLE = 422 as const;
export const LOCKED = 423 as const;
export const FAILED_DEPENDENCY = 424 as const;
export const TOO_EARLY = 425 as const;
export const UPGRADE_REQUIRED = 426 as const;
export const PRECONDITION_REQUIRED = 428 as const;
export const TOO_MANY_REQUESTS = 429 as const;
export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431 as const;
export const UNAVAILABLE_FOR_LEGAL_REASONS = 451 as const;

// 5xx Server Errors
export const INTERNAL_SERVER = 500 as const;
export const NOT_IMPLEMENTED = 501 as const;
export const BAD_GATEWAY = 502 as const;
export const SERVICE_UNAVAILABLE = 503 as const;
export const GATEWAY_TIMEOUT = 504 as const;
export const HTTP_VERSION_NOT_SUPPORTED = 505 as const;
export const VARIANT_ALSO_NEGOTIATES = 506 as const;
export const INSUFFICIENT_STORAGE = 507 as const;
export const LOOP_DETECTED = 508 as const;
export const NOT_EXTENDED = 510 as const;
export const NETWORK_AUTHENTICATION_REQUIRED = 511 as const;
