import { useState } from "react";
import axios from "axios";
import "../styles/CreateSnippet.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  handleGetSnippets: (endpoint: string) => void;
}
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pastebin-academy.herokuapp.com"
    : "http://localhost:4000";

export default function CreateSnippet(props: Props): JSX.Element {
  const [titleInput, setTitleInput] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    if (textInput !== "") {
      e.preventDefault();
      await axios
        .post(`${baseUrl}/snippets`, {
          title: titleInput,
          text: textInput,
        })
        .catch(function (error) {
          console.log(error);
        });
      setTitleInput("");
      setTextInput("");
      showCreateConfirmation();
      props.handleGetSnippets("snippets");
    } else {
      e.preventDefault();
      showValidationError();
    }
  };

  const showValidationError = () =>
    toast.warn("It seems like you're missing some text!");

  const showCreateConfirmation = () =>
    toast.success("✏️ You've created a paste!");

  const handleKeypress = (e: React.KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
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
                  onKeyPress={(e) => handleKeypress(e)}
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
