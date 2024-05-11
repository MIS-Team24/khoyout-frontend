import { ReactNode } from "@tanstack/react-router";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
import { useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export default function NavigatablePageWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const footerRef = useRef(null);
  const navRef = useRef(null);
  const size = useWindowSize();

  let PB = "380px";
  let PT = "80px";

  if (size.height) {
    if (footerRef.current) {
      const footer = footerRef.current as HTMLDivElement;
      PB = Math.round(footer.clientHeight) + "px";
    }

    if (navRef.current) {
      const navigation = navRef.current as HTMLDivElement;
      PT = Math.round(navigation.clientHeight) + "px";
    }
  }

  return (
    <main
      className={`relative min-h-screen`}
      style={{ paddingBottom: PB, paddingTop: PT }}
    >
      <div className="h-fit min-h-full overflow-hidden">
        <NavigationBar ref={navRef} />
        <div className="relative">{children}</div>
        <Footer ref={footerRef} />
      </div>
    </main>
  );
}
