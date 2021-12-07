import { useState, useEffect } from "react";
import axios from "axios";
import { ISnippet } from "./utils/interfaces";
import SnippetList from "./components/SnippetList";
import CreateSnippet from "./components/CreateSnippet";
import NavBar from "./components/NavBar";
import ViewSnippet from "./components/ViewSnippet";

export default function App(): JSX.Element {
  const [snippets, setSnippets] = useState<ISnippet[]>([]);
  const [selectedSnippet, setSelectedSnippet] = useState<ISnippet>();

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

  const handleClickOnSnippet = (snippet: ISnippet) => {
    console.log("A snippet was clicked!:", snippet.id);
    setSelectedSnippet(snippet);
  };

  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <div className="row mx-auto">
          <div className="col-4">
            <SnippetList
              snippets={snippets}
              selectedSnippet={selectedSnippet}
              handleClickOnSnippet={handleClickOnSnippet}
            />
          </div>
          <div className="col-8">
            {!selectedSnippet && <CreateSnippet />}
            {selectedSnippet && <ViewSnippet snippet={selectedSnippet} />}
          </div>
        </div>
      </div>
    </>
  );
}
