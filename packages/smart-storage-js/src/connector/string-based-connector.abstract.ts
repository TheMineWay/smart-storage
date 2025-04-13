import { AConnector } from "./connector.abstract";

export abstract class AStringBasedConnector extends AConnector {
  /* IO */
  abstract rawGet(key: string): string | null;
  abstract rawSet(key: string, value: string): void;
}
