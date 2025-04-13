//@vitest-environment jsdom

import { afterEach } from "node:test";
import { describe, expect, it } from "vitest";
import { LocalStorageConnector } from "./localstorage-connector";
import { InMemoryConnector } from "./in-memory-connector";
import { SessionStorageConnector } from "./sessionstorage-connector";

const STORAGES = [
  () => {
    return {
      name: "localStorage",
      storage: window.localStorage,
      connector: new LocalStorageConnector(),
      set: (k: string, v: string) => window.localStorage.setItem(k, v),
    };
  },
  () => {
    return {
      name: "sessionStorage",
      storage: window.sessionStorage,
      connector: new SessionStorageConnector(),
      set: (k: string, v: string) => window.sessionStorage.setItem(k, v),
    };
  },
  () => {
    const storage = new Map<string, unknown>();
    return {
      name: "memoryStorage",
      storage,
      connector: new InMemoryConnector(),
      set: (k: string, v: unknown) => storage.set(k, v),
    };
  },
] as const;

describe("Connector", () => {
  describe.each(STORAGES.map((s) => s()))(
    "$name connector",
    ({ storage, set, connector }) => {
      afterEach(() => {
        storage.clear();
      });

      describe("rawGet() should return", () => {
        it("null if the key does not exist", () => {
          const value = connector.rawGet("nonexistentKey");
          expect(value).toBe(null);
        });

        it("stored value", () => {
          const connector = new LocalStorageConnector();

          // Setup environment
          const testValue = "testValue";
          set("testKey", testValue);

          // Test
          const value = connector.rawGet("testKey");
          expect(value).toBe(testValue);
        });
      });
    }
  );
});
