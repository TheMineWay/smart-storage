import { beforeEach, describe, expect, it } from "vitest";
import { WebWarehouse } from "@warehouse";
import { LocalStorageConnector } from "@connector";

describe("WebWarehouse", () => {
  describe("should be able to", () => {
    beforeEach(() => {
      WebWarehouse.clearConnectors();
    });

    it("set and get a connector", () => {
      WebWarehouse.setConnector("test", new LocalStorageConnector());

      const connector = WebWarehouse.getConnector("test");
      expect(connector).toBeDefined();
      expect(connector).toBeInstanceOf(LocalStorageConnector);
    });

    it("clear a connector", () => {
      WebWarehouse.setConnector("test", new LocalStorageConnector());
      WebWarehouse.clearConnectors();
      const connector = WebWarehouse.getConnector("test");
      expect(connector).toBeUndefined();
    });
  });
});
