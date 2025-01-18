import Table from "./components/Table";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="text-center">
      <SearchBar />
      <Table />
    </main>
  );
}
