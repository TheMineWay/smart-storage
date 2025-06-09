import { useConnectorWatch } from "@themineway/smart-storage-react";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { z } from "zod";

const schema = z.object({
  mode: z.enum(["light", "dark"]),
  color: z.string().optional().default("red"),
});

export const useTheme = () => {
  const { value } = useConnectorWatch<z.infer<typeof schema>>(
    WebWarehouse.getConnector("ls"),
    "theme",
    schema
  );

  return {
    value,
  };
};
