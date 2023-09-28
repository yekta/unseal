import { ReadonlyURLSearchParams } from "next/navigation";

export function getSearchParamsStr(params: ReadonlyURLSearchParams) {
  const paramsString = params.toString();
  return paramsString ? `?${paramsString}` : "";
}
