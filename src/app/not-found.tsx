import { NavbarWithTopbar } from "@/website/partials/navbar-with-topbar";
import Footer from "@/website/partials/footer";

import { NotFoundBackground } from "./_assets";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import Title from "@/components/ui/typography/title";
import { Heading, Paragraph } from "@/components/ui/typography/typography";
import { InternalAnchor } from "@/components/ui/link";

export default function NotFound() {
  return (
    <>
      <NavbarWithTopbar />

      <main className="h-screen grid place-items-center pt-[120px]">
        <div className="relative max-w-[852px] w-full">
          <NotFoundBackground />
          <Title className="absolute top-[63%] left-1/2 -translate-x-1/2 max-w-[385px] w-full items-center text-center">
            <Heading level="h1" size="4xl" colorScheme="default">
              Pagina Niet Gevonden
            </Heading>
            <Paragraph>
              De pagina die je zoekt lijkt nog niet te bestaan. Excuses voor het
              ongemak.
            </Paragraph>
            <InternalAnchor variant="glass" size="sm" href="/">
              Terug naar de home <ChevronRightIcon className="w-5 h-5" />
            </InternalAnchor>
          </Title>
        </div>
      </main>

      <Footer />
    </>
  );
}
