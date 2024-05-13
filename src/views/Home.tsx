import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
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
      <Inspiration title="Inspiration For You" />
      <About />
      <Designers />
      <Clients />
    </NavigatablePageWrapper>
  );
}
