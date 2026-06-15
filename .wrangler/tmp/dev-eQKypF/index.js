var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// workers/src/lib/http.ts
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers
    }
  });
}
__name(json, "json");
function error(message, status = 400) {
  return json({ error: message }, status);
}
__name(error, "error");
function isAllowedOrigin(origin, allowed) {
  if (origin === allowed || origin.startsWith("http://localhost:")) {
    return true;
  }
  try {
    const host = new URL(origin).hostname;
    const allowedHost = new URL(allowed).hostname;
    if (host === allowedHost || host.endsWith(`.${allowedHost}`)) {
      return true;
    }
    return host === "skyseed-clinical.pages.dev" || host.endsWith(".skyseed-clinical.pages.dev");
  } catch {
    return false;
  }
}
__name(isAllowedOrigin, "isAllowedOrigin");
function corsHeaders(env2, request) {
  const origin = request.headers.get("Origin");
  const allowed = env2.ALLOWED_ORIGIN;
  const headers = {
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, authorization, x-build-key",
    "access-control-max-age": "86400"
  };
  if (origin && isAllowedOrigin(origin, allowed)) {
    headers["access-control-allow-origin"] = origin;
    headers["access-control-allow-credentials"] = "true";
  } else if (!origin) {
    headers["access-control-allow-origin"] = allowed;
  }
  return headers;
}
__name(corsHeaders, "corsHeaders");
function withCors(env2, request, response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders(env2, request))) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
__name(withCors, "withCors");
async function readJson(request) {
  return await request.json();
}
__name(readJson, "readJson");

// workers/src/lib/crypto.ts
var ITERATIONS = 21e4;
function toBase64(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
__name(toBase64, "toBase64");
function fromBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
__name(fromBase64, "fromBase64");
async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  return new Uint8Array(bits);
}
__name(deriveKey, "deriveKey");
async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await deriveKey(password, salt);
  return { hash: toBase64(hash), salt: toBase64(salt) };
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, hash, salt) {
  const derived = await deriveKey(password, fromBase64(salt));
  const expected = fromBase64(hash);
  if (derived.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < derived.length; i++) {
    diff |= derived[i] ^ expected[i];
  }
  return diff === 0;
}
__name(verifyPassword, "verifyPassword");
function randomToken(bytes = 32) {
  return toBase64(crypto.getRandomValues(new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
__name(randomToken, "randomToken");
function uuid() {
  return crypto.randomUUID();
}
__name(uuid, "uuid");

// workers/src/lib/session.ts
function getSessionId(request, env2) {
  const cookie = request.headers.get("Cookie") ?? "";
  const name = `${env2.COOKIE_NAME}=`;
  const match = cookie.split(";").find((part) => part.trim().startsWith(name));
  return match ? decodeURIComponent(match.trim().slice(name.length)) : null;
}
__name(getSessionId, "getSessionId");
function sessionCookie(env2, sessionId) {
  const maxAge = Number(env2.SESSION_TTL_HOURS) * 3600;
  const secure = !env2.ALLOWED_ORIGIN.includes("localhost");
  const flags = secure ? "HttpOnly; Secure; SameSite=Strict" : "HttpOnly; SameSite=Lax";
  return `${env2.COOKIE_NAME}=${encodeURIComponent(sessionId)}; Path=/; ${flags}; Max-Age=${maxAge}`;
}
__name(sessionCookie, "sessionCookie");
function clearSessionCookie(env2) {
  const secure = !env2.ALLOWED_ORIGIN.includes("localhost");
  const flags = secure ? "HttpOnly; Secure; SameSite=Strict" : "HttpOnly; SameSite=Lax";
  return `${env2.COOKIE_NAME}=; Path=/; ${flags}; Max-Age=0`;
}
__name(clearSessionCookie, "clearSessionCookie");
async function createSession(env2, userId) {
  const id = randomToken();
  const now = /* @__PURE__ */ new Date();
  const expires = new Date(now.getTime() + Number(env2.SESSION_TTL_HOURS) * 36e5);
  await env2.DB.prepare(
    "INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).bind(id, userId, expires.toISOString(), now.toISOString()).run();
  return id;
}
__name(createSession, "createSession");
async function getSessionUser(env2, request) {
  const sessionId = getSessionId(request, env2);
  if (!sessionId) return null;
  const row = await env2.DB.prepare(
    `SELECT s.id, s.user_id, s.expires_at, u.email
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = ?`
  ).bind(sessionId).first();
  if (!row) return null;
  if (new Date(row.expires_at) <= /* @__PURE__ */ new Date()) {
    await env2.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
    return null;
  }
  return { id: row.user_id, email: row.email };
}
__name(getSessionUser, "getSessionUser");
async function destroySession(env2, request) {
  const sessionId = getSessionId(request, env2);
  if (!sessionId) return;
  await env2.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
}
__name(destroySession, "destroySession");
async function recordLoginAttempt(env2, ip) {
  await env2.DB.prepare("INSERT INTO login_attempts (ip, attempted_at) VALUES (?, ?)").bind(ip, (/* @__PURE__ */ new Date()).toISOString()).run();
}
__name(recordLoginAttempt, "recordLoginAttempt");
async function isRateLimited(env2, ip) {
  const since = new Date(Date.now() - 15 * 6e4).toISOString();
  const row = await env2.DB.prepare(
    "SELECT COUNT(*) as count FROM login_attempts WHERE ip = ? AND attempted_at > ?"
  ).bind(ip, since).first();
  return (row?.count ?? 0) >= 5;
}
__name(isRateLimited, "isRateLimited");
async function createUser(env2, email, passwordHash, passwordSalt) {
  const id = uuid();
  await env2.DB.prepare(
    "INSERT INTO users (id, email, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?, ?)"
  ).bind(id, email.toLowerCase(), passwordHash, passwordSalt, (/* @__PURE__ */ new Date()).toISOString()).run();
  return id;
}
__name(createUser, "createUser");

// workers/src/routes/auth.ts
function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") ?? "unknown";
}
__name(clientIp, "clientIp");
async function handleAuth(env2, request, path) {
  if (path === "/api/auth/login" && request.method === "POST") {
    const ip = clientIp(request);
    if (await isRateLimited(env2, ip)) {
      return error("Muitas tentativas. Tente novamente em 15 minutos.", 429);
    }
    const body = await readJson(request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    if (!email || !password) {
      await recordLoginAttempt(env2, ip);
      return error("E-mail e senha s\xE3o obrigat\xF3rios.", 400);
    }
    const user = await env2.DB.prepare(
      "SELECT id, email, password_hash, password_salt FROM users WHERE email = ?"
    ).bind(email).first();
    if (!user || !await verifyPassword(password, user.password_hash, user.password_salt)) {
      await recordLoginAttempt(env2, ip);
      return error("Credenciais inv\xE1lidas.", 401);
    }
    const sessionId = await createSession(env2, user.id);
    return json(
      { email: user.email },
      200,
      { "set-cookie": sessionCookie(env2, sessionId) }
    );
  }
  if (path === "/api/auth/logout" && request.method === "POST") {
    await destroySession(env2, request);
    return json({ ok: true }, 200, { "set-cookie": clearSessionCookie(env2) });
  }
  if (path === "/api/auth/me" && request.method === "GET") {
    const user = await getSessionUser(env2, request);
    if (!user) return error("N\xE3o autenticado.", 401);
    return json({ email: user.email });
  }
  return null;
}
__name(handleAuth, "handleAuth");
async function requireAuth(env2, request) {
  const user = await getSessionUser(env2, request);
  if (!user) return error("N\xE3o autenticado.", 401);
  return user;
}
__name(requireAuth, "requireAuth");

// workers/src/routes/articles.ts
function mapArticle(row) {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    title: { pt: row.title_pt, en: row.title_en },
    excerpt: { pt: row.excerpt_pt, en: row.excerpt_en },
    metaDescription: { pt: row.meta_description_pt, en: row.meta_description_en },
    publishedAt: row.published_at,
    coverImage: {
      web: row.cover_web ?? "",
      mobile: row.cover_mobile ?? "",
      alt: { pt: row.cover_alt_pt ?? "", en: row.cover_alt_en ?? "" }
    },
    sections: JSON.parse(row.sections_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedBy: row.published_by
  };
}
__name(mapArticle, "mapArticle");
function validatePayload(body) {
  if (!body.slug?.trim()) return "Slug \xE9 obrigat\xF3rio.";
  if (!body.titlePt?.trim() || !body.titleEn?.trim()) return "T\xEDtulo PT e EN s\xE3o obrigat\xF3rios.";
  if (!body.excerptPt?.trim() || !body.excerptEn?.trim()) return "Resumo PT e EN s\xE3o obrigat\xF3rios.";
  if (!body.metaDescriptionPt?.trim() || !body.metaDescriptionEn?.trim()) {
    return "Meta description PT e EN s\xE3o obrigat\xF3rias.";
  }
  return null;
}
__name(validatePayload, "validatePayload");
async function listArticles(env2, status) {
  const query = status ? "SELECT * FROM articles WHERE status = ? ORDER BY updated_at DESC" : "SELECT * FROM articles ORDER BY updated_at DESC";
  const stmt = env2.DB.prepare(query);
  const result = status ? await stmt.bind(status).all() : await stmt.all();
  return (result.results ?? []).map(mapArticle);
}
__name(listArticles, "listArticles");
async function handleArticles(env2, request, path) {
  if (path === "/api/articles/published" && request.method === "GET") {
    const buildKey = request.headers.get("x-build-key");
    if (!env2.BUILD_API_KEY || buildKey !== env2.BUILD_API_KEY) {
      return error("N\xE3o autorizado.", 401);
    }
    const articles = await listArticles(env2, "published");
    return json({ articles });
  }
  if (path === "/api/articles" && request.method === "GET") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const articles = await listArticles(env2);
    return json({ articles });
  }
  if (path === "/api/articles" && request.method === "POST") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const body = await readJson(request);
    const validation = validatePayload(body);
    if (validation) return error(validation);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const id2 = uuid();
    const sections = JSON.stringify(body.sections ?? { pt: [], en: [] });
    try {
      await env2.DB.prepare(
        `INSERT INTO articles (
          id, slug, status, title_pt, title_en, excerpt_pt, excerpt_en,
          meta_description_pt, meta_description_en, published_at,
          cover_web, cover_mobile, cover_alt_pt, cover_alt_en,
          sections_json, created_at, updated_at
        ) VALUES (?, ?, 'draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id2,
        body.slug.trim(),
        body.titlePt.trim(),
        body.titleEn.trim(),
        body.excerptPt.trim(),
        body.excerptEn.trim(),
        body.metaDescriptionPt.trim(),
        body.metaDescriptionEn.trim(),
        body.publishedAt ?? null,
        body.coverWeb ?? null,
        body.coverMobile ?? null,
        body.coverAltPt ?? null,
        body.coverAltEn ?? null,
        sections,
        now,
        now
      ).run();
    } catch {
      return error("Slug j\xE1 existe ou dados inv\xE1lidos.", 409);
    }
    const row = await env2.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id2).first();
    return json({ article: row ? mapArticle(row) : null }, 201);
  }
  const articleMatch = path.match(/^\/api\/articles\/([^/]+)(?:\/(publish))?$/);
  if (!articleMatch) return null;
  const [, id, action] = articleMatch;
  if (action === "publish" && request.method === "POST") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await env2.DB.prepare(
      `UPDATE articles SET status = 'published', published_at = COALESCE(published_at, ?),
       updated_at = ?, published_by = ? WHERE id = ?`
    ).bind(now, now, auth.email, id).run();
    const row = await env2.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
    if (!row) return error("Artigo n\xE3o encontrado.", 404);
    return json({ article: mapArticle(row) });
  }
  if (request.method === "GET") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const row = await env2.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
    if (!row) return error("Artigo n\xE3o encontrado.", 404);
    return json({ article: mapArticle(row) });
  }
  if (request.method === "PUT") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const body = await readJson(request);
    const validation = validatePayload(body);
    if (validation) return error(validation);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const sections = JSON.stringify(body.sections ?? { pt: [], en: [] });
    try {
      await env2.DB.prepare(
        `UPDATE articles SET
          slug = ?, title_pt = ?, title_en = ?, excerpt_pt = ?, excerpt_en = ?,
          meta_description_pt = ?, meta_description_en = ?, published_at = ?,
          cover_web = ?, cover_mobile = ?, cover_alt_pt = ?, cover_alt_en = ?,
          sections_json = ?, updated_at = ?
         WHERE id = ?`
      ).bind(
        body.slug.trim(),
        body.titlePt.trim(),
        body.titleEn.trim(),
        body.excerptPt.trim(),
        body.excerptEn.trim(),
        body.metaDescriptionPt.trim(),
        body.metaDescriptionEn.trim(),
        body.publishedAt ?? null,
        body.coverWeb ?? null,
        body.coverMobile ?? null,
        body.coverAltPt ?? null,
        body.coverAltEn ?? null,
        sections,
        now,
        id
      ).run();
    } catch {
      return error("Slug j\xE1 existe ou dados inv\xE1lidos.", 409);
    }
    const row = await env2.DB.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
    if (!row) return error("Artigo n\xE3o encontrado.", 404);
    return json({ article: mapArticle(row) });
  }
  if (request.method === "DELETE") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    await env2.DB.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
    return json({ ok: true });
  }
  return null;
}
__name(handleArticles, "handleArticles");

// workers/src/routes/users.ts
async function handleUsers(env2, request, path) {
  if (path === "/api/users" && request.method === "GET") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const { results } = await env2.DB.prepare(
      "SELECT id, email, created_at FROM users ORDER BY created_at DESC"
    ).all();
    return json({
      users: results.map((row) => ({
        id: row.id,
        email: row.email,
        createdAt: row.created_at
      }))
    });
  }
  if (path === "/api/users" && request.method === "POST") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const body = await readJson(request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    if (!email || !password) {
      return error("E-mail e senha s\xE3o obrigat\xF3rios.", 400);
    }
    if (password.length < 8) {
      return error("A senha deve ter pelo menos 8 caracteres.", 400);
    }
    const existing = await env2.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (existing) {
      return error("Este e-mail j\xE1 est\xE1 cadastrado.", 409);
    }
    const { hash, salt } = await hashPassword(password);
    const id = await createUser(env2, email, hash, salt);
    return json(
      {
        user: {
          id,
          email,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      },
      201
    );
  }
  const deleteMatch = path.match(/^\/api\/users\/([^/]+)$/);
  if (deleteMatch && request.method === "DELETE") {
    const auth = await requireAuth(env2, request);
    if (auth instanceof Response) return auth;
    const userId = deleteMatch[1];
    if (userId === auth.id) {
      return error("N\xE3o \xE9 poss\xEDvel excluir sua pr\xF3pria conta.", 400);
    }
    const user = await env2.DB.prepare("SELECT id FROM users WHERE id = ?").bind(userId).first();
    if (!user) {
      return error("Usu\xE1rio n\xE3o encontrado.", 404);
    }
    await env2.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
    return json({ ok: true });
  }
  return null;
}
__name(handleUsers, "handleUsers");

// workers/src/index.ts
var src_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env2, request) });
    }
    if (path === "/api/health") {
      return withCors(env2, request, json({ ok: true, service: "skyseed-api" }));
    }
    try {
      const handlers = [handleAuth, handleArticles, handleUsers];
      for (const handler of handlers) {
        const response = await handler(env2, request, path);
        if (response) return withCors(env2, request, response);
      }
      return withCors(env2, request, error("Rota n\xE3o encontrada.", 404));
    } catch (err) {
      console.error(err);
      return withCors(env2, request, error("Erro interno do servidor.", 500));
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error2 = reduceError(e);
    return Response.json(error2, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-GuKzIZ/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-GuKzIZ/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
