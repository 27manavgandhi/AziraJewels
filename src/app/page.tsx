import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";
import { StickyCtaBar } from "@/components/cta/sticky-cta-bar";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Contact />
      <SiteFooter />
      <StickyCtaBar />
    </>
  );
}
