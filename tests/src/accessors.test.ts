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

const IN_MEMORY_MAP = new Map<string, object>();
const IN_MEMORY_CONNECTOR = new InMemoryConnector(IN_MEMORY_MAP);

const LIBS = [{ name: "zod", service: new ZodAccessorsTest() }];
const CONNECTORS = [
  {
    name: "localStorage",
    connector: new LocalStorageConnector(),
    jsonBased: true,
    insert: (key: string, value: object) =>
      localStorage.setItem(key, JSON.stringify({ d: value })),
  },
  {
    name: "sessionStorage",
    connector: new SessionStorageConnector(),
    jsonBased: true,
    insert: (key: string, value: object) =>
      sessionStorage.setItem(key, JSON.stringify({ d: value })),
  },
  {
    name: "inMemory",
    connector: IN_MEMORY_CONNECTOR,
    jsonBased: false,
    insert: (key: string, value: object) => IN_MEMORY_MAP.set(key, value),
  },
];

describe("accessors", () => {
  describe.each(LIBS)("with $name", ({ service }) => {
    describe.each(CONNECTORS)(
      "using $name connector",
      ({ connector, insert }) => {
        const USER_SCHEMA = service.getSchemaDemos().user;

        beforeEach(() => {
          connector.clear();
        });

        // GET
        describe("get(key, schema) should", () => {
          // Errors
          describe("throw an error when", () => {
            it("expected schema does not match data", () => {
              const data = USERS_MOCK.alice;

              // Write bad formatted data
              insert(demoKey, { ...data, name: { createdAt: new Date() } });

              // Try to get data
              expect(() => {
                const d = connector.get(demoKey, service.getSchemaDemos().user);
              }).toThrowError();
            });
          });

          // Success
          describe("return parsed data when", () => {
            it("data matches schema", () => {
              // Write data
              insert(demoKey, USERS_MOCK.alice);

              // Try to get data
              const data = connector.get(demoKey, USER_SCHEMA);

              expect(data).toEqual(USERS_MOCK.alice);
            });

            it("can convert data to schema", () => {
              // Write data
              const badUser = {
                ...USERS_MOCK.alice,
                age: "30",
              };
              insert(demoKey, badUser);

              // Try to get data
              const data = connector.get(demoKey, USER_SCHEMA);

              expect(data).toEqual(USERS_MOCK.alice);
            });
          });

          it("return null when the key is not found", () => {
            expect(
              connector.get(demoKey, service.getSchemaDemos().user)
            ).toBeNull();
          });
        });

        // SET
        describe("set(key, data) should", () => {
          it("throw an error when data does not match schema", () => {
            const data = { ...USERS_MOCK.alice, name: new Date() };

            // Try to set data
            expect(() => {
              connector.set(demoKey, data, USER_SCHEMA);
            }).toThrowError();
          });

          describe("set data when", () => {
            it("matches schema as is", () => {
              const data = USERS_MOCK.alice;

              connector.set(demoKey, data, USER_SCHEMA);

              expect(connector.get(demoKey, USER_SCHEMA)).toEqual(data);
            });
          });
        });
      }
    );
  });
});
