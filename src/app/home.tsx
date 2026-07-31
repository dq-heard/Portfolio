"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { usePortfolioData } from "@/app/hooks";
import { sectionMap } from "./utils/sections";
import { Header, Nav, Footer } from "./sections";
import { PortfolioData } from "./utils/types";
import {
  Preloader,
  TiltedCard,
  MobileNav,
  ThemeToggle,
  TopScroller,
} from "./components";

export default function Home(props: PortfolioData) {
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const portfolioData = usePortfolioData(props);
  const totalSections = sectionMap.length;

  const [isReady, setIsReady] = useState(true);
  const [readyCount, setReadyCount] = useState(0);
  const [showPreloader, setShowPreloader] = useState(false);

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

  useEffect(() => {
    if (!isReady) {
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // Trigger effects once all sections report readiness
  useEffect(() => {
    if (readyCount >= totalSections) {
      setIsReady(false);
    }
  }, [readyCount, totalSections]);

  return (
    <>
      {showPreloader && <Preloader exiting={!isReady} />}

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
