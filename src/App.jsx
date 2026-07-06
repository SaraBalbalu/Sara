import { useEffect, useState } from "react";
import { I18nProvider } from "./i18n.jsx";
import Particles from "./components/Particles.jsx";
import LangSwitcher from "./components/LangSwitcher.jsx";
import Hero from "./components/Hero.jsx";
import Videos from "./components/Videos.jsx";
import TikTok from "./components/TikTok.jsx";
import Genshin from "./components/Genshin.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";

function useJson(path) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}${path}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setData(null));
  }, [path]);
  return data;
}

export default function App() {
  const youtube = useJson("data/youtube.json");
  const genshin = useJson("data/genshin.json");

  return (
    <I18nProvider>
      <Particles />
      <LangSwitcher />
      <main>
        <Hero genshin={genshin} />
        <Videos youtube={youtube} />
        <TikTok />
        <Genshin genshin={genshin} />
        <About />
      </main>
      <Footer />
    </I18nProvider>
  );
}
