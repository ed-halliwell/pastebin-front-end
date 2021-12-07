import { useState, useEffect } from "react";
import axios from "axios";
import { ISnippet } from "./utils/interfaces";
import SnippetList from "./components/SnippetList";
import CreateSnippet from "./components/CreateSnippet";

export default function App(): JSX.Element {
  const [snippets, setSnippets] = useState<ISnippet[]>([]);

  const loadDataFromEndpoint = async (endpoint: string) => {
    try {
      const res = await axios.get(
        `https://pastebin-academy.herokuapp.com/${endpoint}`
      );
      setSnippets(res.data.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(`${err.name}: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    console.log("UseEffect is firing");
    loadDataFromEndpoint("snippets");
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            PasteBin
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container-md">
        <CreateSnippet />
      </div>
      <div className="container-md">
        <SnippetList snippets={snippets} />
      </div>
    </>
  );
}

// App
//   > Form - creating a snippet
//   > List of Snippets (ordered by createdAt desc)
//     > Snippet - can be expanded
