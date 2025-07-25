export function getReadableSocialLabel(iconName: string) {
  const cleaned = iconName.replace(/^Bs/, "");
  return cleaned.replace(/([a-z])([A-Z])/g, "$1 $2");
}
