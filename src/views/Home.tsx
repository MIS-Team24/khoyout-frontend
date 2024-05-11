import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
import { Hero, Inspiration, About } from "@/components/views/home";

export default function Home() {
  return (
    <NavigatablePageWrapper>
      <Hero />
      <Inspiration />
      <About />
    </NavigatablePageWrapper>
  );
}
