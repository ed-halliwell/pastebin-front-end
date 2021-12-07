import { useState } from "react";
import { ISnippet } from "../utils/interfaces";

interface Props {
  snippet?: ISnippet | undefined;
}

export default function ViewSnippet(props: Props): JSX.Element {
  const [title, setTitle] = useState<string>(props.snippet?.title ?? "");
  const [text, setText] = useState<string>(props.snippet?.text ?? "");

  //PUT CALL
  return (
    <>
      <div className="col-6 mx-4 w-100">
        <h4 className="mb-4">Viewing a Snippet</h4>
        <form>
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
            <button className="btn btn-primary me-md-2" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
