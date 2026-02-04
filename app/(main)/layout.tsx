import { Header } from "@/components/header";
import { fetchHeader } from "@/sanity/lib/fetch";
import { SanityLive } from "@/sanity/lib/live";

export default async function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const headerData = await fetchHeader();

  return (
    <>
      <Header data={headerData} />
      <main>{children}</main>
      {modal}
      <SanityLive />
    </>
  );
}
