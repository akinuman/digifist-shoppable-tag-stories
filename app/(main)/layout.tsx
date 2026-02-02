import { SanityLive } from "@/sanity/lib/live";

export default async function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      {modal}
      <SanityLive />
    </>
  );
}
