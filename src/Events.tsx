import Header from "@/components/site-header";
import EventList from "@/components/events-list";

export function Events() {
  return (
    <main className="mx-auto flex max-w-[1216px] flex-col gap-5 py-5">
      <Header />
      <EventList />
    </main>
  );
}
