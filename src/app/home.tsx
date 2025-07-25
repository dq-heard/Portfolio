"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Preloader,
  TiltedCard,
  MobileNav,
  ThemeToggle,
  TopScroller,
} from "./components";

import { usePortfolioData } from "@/app/hooks/usePortfolioData";
import { sectionMap } from "./utils/sections";
import { Header, Nav, Footer } from "./sections";
import { PortfolioData } from "./utils/types";

export default function Home(props: PortfolioData) {
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const portfolioData = usePortfolioData(props);
  const totalSections = sectionMap.length;

  const [loading, setLoading] = useState(true);
  const [readyCount, setReadyCount] = useState(0);

  const handleSectionLoaded = useCallback(() => {
    setReadyCount((prev) => {
      const next = prev + 1;
      return next;
    });
  }, []);

  const handlers = useMemo(() => {
    return Object.fromEntries(
      sectionMap.map(({ key }) => [key, handleSectionLoaded])
    ) as Record<keyof typeof portfolioData, () => void>;
  }, [handleSectionLoaded]);

  // Trigger effects once all sections report readiness
  useEffect(() => {
    if (readyCount >= totalSections) {
      setLoading(false);
    }
  }, [readyCount, totalSections]);

  return (
    <>
      {loading && <Preloader />}

      <MobileNav
        isActive={isMobileMenuActive}
        toggleActive={() => setMobileMenuActive((prev) => !prev)}
      />
      <ThemeToggle />

      {portfolioData.header && (
        <TiltedCard as="header">
          <Header
            data={portfolioData.header}
            onContentLoaded={handleSectionLoaded}
          />
        </TiltedCard>
      )}

      <Nav
        isMobileActive={isMobileMenuActive}
        onLinkClick={() => setMobileMenuActive(false)}
      />

      <section id="main">
        {sectionMap.map(({ key, id, component: Section }) => (
          <TiltedCard key={key} id={id ?? undefined}>
            <Section
              data={portfolioData[key]}
              onContentLoaded={handlers[key]}
            />
          </TiltedCard>
        ))}
      </section>
      {portfolioData.header && (
        <TiltedCard as="footer">
          <Footer
            data={portfolioData.header}
            onContentLoaded={handleSectionLoaded}
          />
        </TiltedCard>
      )}

      <TopScroller />
    </>
  );
}
