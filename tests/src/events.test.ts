import { AConnector, InMemoryConnector } from "@themineway/smart-storage-js";
import { beforeEach, describe, expect, it } from "vitest";

describe("events", () => {
  let connector: AConnector;

  beforeEach(() => {
    connector = new InMemoryConnector();
  });

  describe("addOnChangeListener(callback) should", () => {
    it("be called when it detects changes", () => {
      let count = 0;
      const callback = () => {
        count++;
      };
      connector.addOnChangeListener(callback);

      connector.set<{ name: string }>("test", { name: "John Doe" });
      expect(count).toBe(1);

      connector.set<{ name: string }>("test", { name: "John Doe" });
      expect(count).toBe(2);
    });

    it("not be called when it does not detect changes", () => {
      let count = 0;
      const callback = () => {
        count++;
      };
      connector.addOnChangeListener(callback);

      // Change to a different connector
      new InMemoryConnector().set<{ name: string }>("test", {
        name: "John Doe",
      });
      expect(count).toBe(0);
    });
  });
});
