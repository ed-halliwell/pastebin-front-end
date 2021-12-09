import { useState } from "react";
import axios from "axios";
import "../styles/CreateSnippet.css";

interface Props {
  handleGetSnippets: (endpoint: string) => void;
}

export default function CreateSnippet(props: Props): JSX.Element {
  const [titleInput, setTitleInput] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(`https://pastebin-academy.herokuapp.com/snippets`, {
        title: titleInput,
        text: textInput,
      })
      .catch(function (error) {
        console.log(error);
      });
    setTitleInput("");
    setTextInput("");
    props.handleGetSnippets("snippets");
  };

  return (
    <>
      <div>
        <h4 className="mb-4">Create New Snippet</h4>
        <div className="col-6 w-100 view-box">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="snippet-title" className="form-label">
                Snippet Title
              </label>
              <input
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                type="text"
                placeholder="Add a title"
                className="form-control"
                id="snippet-title"
                aria-describedby="snippet-title"
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="snippet-text" className="form-label">
                Snippet Text
              </label>
              <div className="input-group create-snippet-text-box">
                <textarea
                  autoFocus
                  value={textInput}
                  placeholder="Paste something..."
                  onChange={(e) => setTextInput(e.target.value)}
                  id="snippet-text"
                  className="form-control create-snippet-text"
                  aria-label="snippet"
                  autoComplete="off"
                ></textarea>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-secondary me-md-2"
                onClick={() => setTextInput("")}
                type="button"
              >
                Clear Input
              </button>
              <button className="btn btn-primary me-md-2" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
