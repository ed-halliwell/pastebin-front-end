import { useState, useEffect } from "react";
import axios from "axios";
import { ISnippet } from "./utils/interfaces";
import SnippetList from "./components/SnippetList";
import CreateSnippet from "./components/CreateSnippet";
import NavBar from "./components/NavBar";
import ViewSnippet from "./components/ViewSnippet";
import { ToastContainer } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_URL;

export default function App(): JSX.Element {
  const [snippets, setSnippets] = useState<ISnippet[]>([]);
  const [selectedSnippet, setSelectedSnippet] = useState<ISnippet>();

  const loadDataFromEndpoint = async (endpoint: string) => {
    try {
      const res = await axios.get(`${baseUrl}/${endpoint}?limit=100`);
      setSnippets(res.data.data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(`${err.name}: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    // console.log("UseEffect is firing");
    loadDataFromEndpoint("snippets");
  }, []);

  const handleClickOnSnippet = (snippet: ISnippet) => {
    setSelectedSnippet(snippet);
  };

  const handleRefreshAfterAction = () => {
    setSelectedSnippet(undefined);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar handleRefreshAfterAction={handleRefreshAfterAction} />
      <div className="container mt-5">
        <div className="row mx-auto">
          <div className="col-4">
            <SnippetList
              snippets={snippets}
              selectedSnippet={selectedSnippet}
              handleClickOnSnippet={handleClickOnSnippet}
            />
          </div>
          <div className="col-1"></div>
          <div className="col-7">
            {!selectedSnippet && (
              <CreateSnippet handleGetSnippets={loadDataFromEndpoint} />
            )}
            {selectedSnippet && (
              <ViewSnippet
                snippet={selectedSnippet}
                handleGetSnippets={loadDataFromEndpoint}
                handleRefreshAfterAction={handleRefreshAfterAction}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
