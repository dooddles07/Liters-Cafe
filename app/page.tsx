import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Story } from "@/components/site/story";
import { LitreSection } from "@/components/site/litre-section";
import { Featured } from "@/components/site/featured";
import { DrinkBuilder } from "@/components/site/drink-builder";
import { Gallery } from "@/components/site/gallery";
import { Reviews } from "@/components/site/reviews";
import { Location } from "@/components/site/location";
import { Contact } from "@/components/site/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Story />
      <LitreSection />
      <Featured />
      <DrinkBuilder />
      <Gallery />
      <Reviews />
      <Location />
      <Contact />
    </>
  );
}
