import type {
  AConnector,
  SmartStorageSchema,
} from "@themineway/smart-storage-js";
import { useEffect, useState } from "react";

type Options<V extends object> = {
  schema?: SmartStorageSchema<V>;
  onChange?: (value: V | null) => void;
};

export const useConnectorWatch = <V extends object>(
  connector: AConnector,
  key: string,
  { schema, onChange }: Options<V> = {}
) => {
  const [value, setValue] = useState<V | null>(connector.get(key, schema));

  useEffect(() => {
    const unsubscribe = connector.addOnChangeListener((changedKey) => {
      if (changedKey === key) {
        const newValue = connector.get<V>(key, schema);
        setValue(newValue);
        onChange?.(newValue);
      }
    });
    return () => unsubscribe();
  }, [key]);

  return {
    value,
    connector,
  };
};
