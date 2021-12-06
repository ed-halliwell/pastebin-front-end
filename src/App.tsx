import { useState } from "react";
import axios from "axios";
import { ISnippet } from "./utils/interfaces";
import SnippetList from "./components/SnippetList";

function App(): JSX.Element {
  const [snippets, setSnippets] = useState<ISnippet[]>([]);
  const loadDataFromEndpoint = async (endpoint: string) => {
    try {
      const res = await axios.get(
        `https://pastebin-academy.herokuapp.com/${endpoint}`
      );
      // console.log(res.data.data);
      setSnippets(res.data.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(`${err.name}: ${err.message}`);
      }
    }
  };
  loadDataFromEndpoint("snippets");

  return (
    <>
      <SnippetList snippets={snippets} />
    </>
  );
}

export default App;

// App
//   > Form - creating a snippet
//   > List of Snippets (ordered by createdAt desc)
//     > Snippet - can be expanded
