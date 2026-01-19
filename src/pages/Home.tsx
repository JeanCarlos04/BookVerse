import Aside from "../components/Aside";
import Nav from "../components/Nav";
import BookList from "../components/BookList";

function Home() {
  return (
    <>
      <main className="flex w-full h-full">
        <Aside />
        <div className="w-full">
          <Nav />

          <BookList />
        </div>
      </main>
    </>
  );
}

export default Home;
