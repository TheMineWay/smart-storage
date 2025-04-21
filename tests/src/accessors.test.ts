// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { ZodAccessorsTest } from "./accessors/zod/zod.accessors-test";
import {
  AConnector,
  InMemoryConnector,
  LocalStorageConnector,
  SessionStorageConnector,
} from "smart-storage-js";
import { USERS_MOCK } from "./mocks/users.mock";

const demoKey = "demo-key";

const LIBS = [{ name: "zod", service: new ZodAccessorsTest() }];
const CONNECTORS = [
  {
    name: "localStorage",
    connector: new LocalStorageConnector(),
    jsonBased: true,
  },
  {
    name: "sessionStorage",
    connector: new SessionStorageConnector(),
    jsonBased: true,
  },
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
            safeRawSet(connector, demoKey, USERS_MOCK.alice);

            // Try to get data
            const schema = connector.allowsObjectStorage
              ? service.getSchemaDemos().user
              : service
                  .getSchemaDemos()
                  .fromJson(service.getSchemaDemos().user);
            const data = connector.get(demoKey, schema);

            expect(data).toEqual(USERS_MOCK.alice);
          });

          it("can convert data to schema", () => {
            // Write data
            const badUser = {
              ...USERS_MOCK.alice,
              age: "30",
            };
            safeRawSet(connector, demoKey, badUser);

            // Try to get data
            const schema = connector.allowsObjectStorage
              ? service.getSchemaDemos().user
              : service
                  .getSchemaDemos()
                  .fromJson(service.getSchemaDemos().user);
            const data = connector.get(demoKey, schema);

            expect(data).toEqual(USERS_MOCK.alice);
          });
        });
      });

      // SET
      describe("set(key, data) should", () => {
        it("throw an error when data does not match schema", () => {
          const data = { ...USERS_MOCK.alice, name: new Date() };

          // Try to set data
          expect(() => {
            connector.set(demoKey, data, service.getSchemaDemos().user);
          }).toThrowError();
        });

        describe("set data when", () => {
          it("matches schema as is", () => {
            const data = USERS_MOCK.alice;

            connector.set(demoKey, data, service.getSchemaDemos().user);

            expect(
              connector.get(demoKey, service.getSchemaDemos().user)
            ).toEqual(data);
          });
        });
      });
    });
  });
});

/* Utils */

const safeRawSet = <T>(connector: AConnector, key: string, data: T) => {
  if (connector.allowsObjectStorage) {
    (connector as InMemoryConnector).rawSet(key, data);
  } else {
    (connector as LocalStorageConnector | SessionStorageConnector).rawSet(
      key,
      JSON.stringify(data)
    );
  }
};
