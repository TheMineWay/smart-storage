// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConnectorWatch } from "./use-connector-watch";
import { InMemoryConnector } from "@themineway/smart-storage-js";

describe("useConnectorWatch(connector, key, schema) should", () => {
  describe("watch for value changes", () => {
    it("through the onChange callback", () => {
      const onChange = vi.fn();
      const connector = new InMemoryConnector();

      renderHook(() => {
        useConnectorWatch(connector, "test", {
          onChange,
        });
      });

      act(() => {
        connector.set<{ name: string }>("test", { name: "Levi" });
      });

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
