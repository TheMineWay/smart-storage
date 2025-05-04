import { StorageContext } from "./storage.context";

type StorageProviderProps = {
  children: React.ReactNode;
};

const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
  return (
    <StorageContext.Provider
      value={{
        notifier: {
          onChange: () => {},
        },
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
