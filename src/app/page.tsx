import { MapView } from "@/components/atlas/MapView";
import { DailyBanner } from "@/components/atlas/DailyBanner";
import { WelcomeHero } from "@/components/atlas/WelcomeHero";
import { MapLensesCard } from "@/components/atlas/MapLensesCard";
import { MapControls } from "@/components/atlas/MapControls";
import { DataProvidersCard } from "@/components/atlas/DataProvidersCard";
import { EventDetailCardDemo } from "@/components/atlas/EventDetailCardDemo";
import { TimeScrubber } from "@/components/atlas/TimeScrubber";
import { PartnersBar } from "@/components/atlas/PartnersBar";

export default function Home() {
  return (
    <div className="h-[calc(100vh-54px)] overflow-hidden">
      <MapView />
      <DailyBanner />
      <WelcomeHero />
      <MapLensesCard />
      <MapControls />
      <DataProvidersCard />
      <EventDetailCardDemo />
      <TimeScrubber />
      <PartnersBar />
    </div>
  );
}
