import { useState, useEffect } from "react";
import axios from "axios";
import { ISnippet } from "../utils/interfaces";

interface Props {
  snippet: ISnippet;
}

export default function ViewSnippet(props: Props): JSX.Element {
  const [title, setTitle] = useState<string>(props.snippet.title);
  const [text, setText] = useState<string>(props.snippet.text);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setTitle(props.snippet.title);
    setText(props.snippet.text);
  }, [props.snippet]);

  //PATCH CALL
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .patch(
        `https://pastebin-academy.herokuapp.com/snippets/${props.snippet.id}`,
        {
          title: title,
          text: text,
        }
      )
      .catch(function (error) {
        console.log(error);
      });
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <div className="col-6 mx-4 w-100">
          <h4 className="mb-4">Edit Snippet</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="snippet-title" className="form-label">
                Snippet Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste something..."
                  id="snippet-text"
                  className="form-control"
                  aria-label="snippet"
                ></textarea>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-secondary me-md-2"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary me-md-2" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="col-6 mx-4 w-100">
          <h4 className="mb-4">View Snippet</h4>
          <div className="mb-3">
            <label htmlFor="snippet-title" className="form-label">
              Snippet Title
            </label>
            <p>{props.snippet.title}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="snippet-text" className="form-label">
              Snippet Text
            </label>
            <div>
              <p>{props.snippet.text}</p>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-secondary me-md-2"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
