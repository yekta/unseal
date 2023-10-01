import { useQuery } from "@tanstack/react-query";
import { accounts as accountsConstant } from "@ts/email";

export function useAccounts() {
  const { data, isError, error, isLoading } = useQuery(
    ["accounts"],
    getAccounts
  );

  return {
    accounts: data,
    isAccountsError: isError,
    accountsError: error,
    isAccountsLoading: isLoading,
  };
}

async function getAccounts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return accountsConstant;
}
