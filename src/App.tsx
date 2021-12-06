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
      <CreateSnippet />
      <SnippetList snippets={snippets} />
    </>
  );
}

// App
//   > Form - creating a snippet
//   > List of Snippets (ordered by createdAt desc)
//     > Snippet - can be expanded
