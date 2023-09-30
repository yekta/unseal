import { TAccount, accounts as accountsConstant } from "@ts/email";
import { useEffect, useState } from "react";

export function useAccounts() {
  const [accounts, setAccounts] = useState<TAccount[] | undefined>(undefined);
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAccounts(accountsConstant);
    })();
  });
  return { accounts };
}
