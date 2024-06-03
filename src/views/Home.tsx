import { NavigatablePageWrapper, SectionHeader } from "@/components/custom";
import {
  Hero,
  Categories,
  Inspiration,
  About,
  Designers,
  Clients,
} from "@/components/views/home";

export default function Home() {
  return (
    <NavigatablePageWrapper>
      <Hero />
      <Categories />
      <Inspiration
        header={<SectionHeader title="Inspiration For You" className="my-0" />}
      />
      <About />
      <Designers />
      <Clients />
    </NavigatablePageWrapper>
  );
}
