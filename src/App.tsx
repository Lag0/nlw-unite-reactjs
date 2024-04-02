import { Header } from "./components/Header";
import { AttendeeList } from "./components/AttendeeList";

export function App() {
  return (
    <main className="mx-auto flex max-w-[1216px] flex-col gap-5 py-5">
      <Header />
      <AttendeeList />
    </main>
  );
}
