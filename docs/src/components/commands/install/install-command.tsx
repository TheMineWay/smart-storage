import Select from "../../ui/select/select";
import { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import styles from "./install-command.module.css";

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn"];
// Sorted from modern to legacy
const VERSIONS = ["1.0.0"];
const LATEST_VERSION = VERSIONS[0];

type Props = {
  library: string;
};

const InstallCommand: React.FC<Props> = ({ library }) => {
  const [version, setVersion] = useState<string>("latest");

  return (
    <div className={styles.container}>
      <label htmlFor="version-select" className={styles.label}>
        Version
      </label>
      <Select
        id="version-select"
        options={[
          {
            key: "latest",
            value: "latest",
            label: `🌟 Latest (${LATEST_VERSION})`,
          },
          ...VERSIONS.filter((v) => v !== LATEST_VERSION).map((v) => ({
            key: v,
            value: v,
            label: v,
          })),
        ]}
        onChange={(v) => setVersion(v)}
      />
      <Tabs>
        {PACKAGE_MANAGERS.map((pm) => (
          <TabItem key={pm} value={pm} label={pm}>
            <CodeBlock language="bash">{`${pm} install ${library}@${version}`}</CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
};

export default InstallCommand;
