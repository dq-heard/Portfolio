import React, { useEffect, useState } from "react";
import {
  About,
  BackToTop,
  Chat,
  Footer,
  Header,
  Home,
  Preloader,
  Work,
} from "./container";
import "./App.scss";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleContentLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout to match your needs

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <>
          <Header />
          <main>
            <Home onContentLoaded={handleContentLoaded} />
            <About onContentLoaded={handleContentLoaded} />
            <Work />
            <Chat />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
};

export default App;
