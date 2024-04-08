import Header from "./components/site-header";
import AttendeeList from "./components/attendees-list";

export function Attendees() {
  return (
    <main className="mx-auto flex max-w-[1216px] flex-col gap-5 py-5">
      <Header />
      <AttendeeList />
    </main>
  );
}
