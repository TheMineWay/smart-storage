import { IConnector } from "@connector";

export class WebWarehouse {
  private static readonly connectors: Record<string, IConnector> = {};
  private constructor() {}

  public static getConnector(name: string): IConnector {
    return this.connectors[name];
  }

  public static setConnector(name: string, connector: IConnector): void {
    this.connectors[name] = connector;
  }

  public static clearConnectors(): void {
    for (const key of Object.keys(this.connectors)) {
      delete this.connectors[key];
    }
  }
}
