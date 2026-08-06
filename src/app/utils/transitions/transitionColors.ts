type TransitionColors = {
  frontColor: string;
  highlightColor: string;
  accentColor: string;
};

export const getTransitionColors = (
  nextThemeIsDark: boolean
): TransitionColors => {
  const styles = getComputedStyle(document.documentElement);

  return {
    frontColor: "#fff5e6",

    highlightColor: styles.getPropertyValue("--secondary").trim(),

    accentColor: styles.getPropertyValue("--primary").trim(),
  };
};

export type { TransitionColors };
