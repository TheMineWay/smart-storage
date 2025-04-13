//@vitest-environment jsdom

import { afterEach } from "node:test";
import { describe, expect, it } from "vitest";
import { LocalStorageConnector } from "./localstorage-connector";

const STORAGES = [
  { name: "localStorage", storage: window.localStorage },
  { name: "sessionStorage", storage: window.sessionStorage },
] as const;

describe("Connector", () => {
  describe.each(STORAGES)("$name connector", ({ storage }) => {
    afterEach(() => {
      storage.clear();
    });

    describe("get() should return", () => {
      it("null if the key does not exist", () => {
        const connector = new LocalStorageConnector();
        const value = connector.get("nonexistentKey");
        expect(value).toBe(null);
      });

      it("stored value", () => {
        const connector = new LocalStorageConnector();

        // Setup environment
        const testValue = "testValue";
        localStorage.setItem("testKey", testValue);

        // Test
        const value = connector.get("testKey");
        expect(value).toBe(testValue);
      });
    });
  });
});
