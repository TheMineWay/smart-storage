import { AConnector } from "@connector";

export class WebWarehouse {
  private static readonly connectors: Record<string, AConnector> = {};
  private constructor() {}

  public static getConnector(name: string): AConnector {
    return this.connectors[name];
  }

  public static setConnector(name: string, connector: AConnector): void {
    this.connectors[name] = connector;
  }

  public static clearConnectors(): void {
    for (const key of Object.keys(this.connectors)) {
      delete this.connectors[key];
    }
  }
}
