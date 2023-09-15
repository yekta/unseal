export function addProtocolToUrl(str: string): string {
  try {
    const url = new URL(str);
    return url.toString();
  } catch (error) {}
  try {
    const url = new URL(`https://${str}`);
    return url.toString();
  } catch (error) {}
  return str;
}
