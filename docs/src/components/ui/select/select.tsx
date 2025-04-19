import styles from "./select.module.css";

export type SelectOption = {
  key: string;
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  onChange?: (value: string) => void;
  id?: string;
};

const Select: React.FC<SelectProps> = ({ options, onChange, id }) => {
  return (
    <select
      id={id}
      onChange={(e) => onChange?.(e.target.value)}
      className={styles.select}
    >
      {options.map(({ key, label, value }) => (
        <option key={key} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
