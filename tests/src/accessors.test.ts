// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { ZodAccessorsTest } from "./accessors/zod/zod.accessors-test";
import {
  InMemoryConnector,
  LocalStorageConnector,
  SessionStorageConnector,
} from "smart-storage-js";
import { USERS_MOCK } from "./mocks/users.mock";

const demoKey = "demo-key";

const LIBS = [{ name: "zod", service: new ZodAccessorsTest() }];
const CONNECTORS = [
  { name: "localStorage", connector: new LocalStorageConnector() },
  { name: "sessionStorage", connector: new SessionStorageConnector() },
  { name: "inMemory", connector: new InMemoryConnector() },
];

describe("accessors", () => {
  describe.each(LIBS)("with $name", ({ service }) => {
    describe.each(CONNECTORS)("using $name connector", ({ connector }) => {
      beforeEach(() => {
        connector.clear();
      });

      // GET
      describe("get(key, schema) should", () => {
        // Errors
        describe("throw an error when", () => {
          it("the key is not found", () => {
            expect(() => {
              connector.get(demoKey, service.getSchemaDemos().user);
            }).toThrowError();
          });

          it("expected schema does not match data", () => {
            const data = USERS_MOCK.alice;

            // Write bad formatted data
            connector.rawSet(
              demoKey,
              JSON.stringify({ ...data, name: new Date() })
            );

            // Try to get data
            expect(() => {
              connector.get(demoKey, service.getSchemaDemos().user);
            }).toThrowError();
          });
        });

        // Success
        describe("return parsed data when", () => {
          it("data matches schema", () => {
            // Write data
            connector.rawSet(
              demoKey,
              JSON.stringify(JSON.stringify(USERS_MOCK.alice))
            );

            // Try to get data
            const data = connector.get(demoKey, service.getSchemaDemos().user);

            expect(data).toEqual(USERS_MOCK.alice);
          });
        });
      });
    });
  });
});
