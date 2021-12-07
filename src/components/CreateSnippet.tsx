import { useState } from "react";
import axios from "axios";

export default function CreateSnippet(): JSX.Element {
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
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
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
                />
              </div>
              <div className="mb-3">
                <label htmlFor="snippet-text" className="form-label">
                  Snippet Text
                </label>
                <div className="input-group">
                  <textarea
                    value={textInput}
                    placeholder="Paste something..."
                    onChange={(e) => setTextInput(e.target.value)}
                    id="snippet-text"
                    className="form-control"
                    aria-label="snippet"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}
