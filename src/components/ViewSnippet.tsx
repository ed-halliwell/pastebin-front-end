import { useState, useEffect } from "react";
import axios from "axios";
import { ISnippet } from "../utils/interfaces";
import "../styles/ViewSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
interface Props {
  snippet: ISnippet;
  handleGetSnippets: (endpoint: string) => void;
}

export default function ViewSnippet(props: Props): JSX.Element {
  const [title, setTitle] = useState<string>(props.snippet.title);
  const [text, setText] = useState<string>(props.snippet.text);
  const [edit, setEdit] = useState<boolean>(false);
  const [copyState, setCopyState] = useState<boolean>(false);

  useEffect(() => {
    setTitle(props.snippet.title);
    setText(props.snippet.text);
  }, [props.snippet]);

  //PATCH CALL with GET to refresh list of snippets
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
    props.handleGetSnippets("snippets");
  };

  function copyToClipboard() {
    setCopyState(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopyState(false), 1500);
  }

  return (
    <>
      {edit ? (
        <div>
          <h4 className="mb-4">Edit Snippet</h4>
          <div className="col-6 mx-4 w-100 view-box">
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
                <div className="input-group create-snippet-box">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste something..."
                    id="snippet-text"
                    className="form-control snippet-text"
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
        </div>
      ) : (
        <div>
          <h4 className="mb-4 mx-4">View Snippet</h4>
          <div className="col-6 mx-4 w-100 view-box">
            <div className="mb-3">
              <label htmlFor="snippet-title" className="form-label">
                Snippet Title
              </label>
              <p>{title}</p>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="snippet-text" className="form-label">
                  Snippet Text
                </label>

                {copyState ? (
                  <label className="copied-successfully text-success">
                    Copied to clipboard! <FontAwesomeIcon icon={faThumbsUp} />
                  </label>
                ) : (
                  <label className="copyIcon" onClick={copyToClipboard}>
                    Copy <FontAwesomeIcon icon={faCopy} className="copyIcon" />
                  </label>
                )}
              </div>
              <div className="snippet-box">
                <p className="snippet-text">{text}</p>
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
        </div>
      )}
    </>
  );
}
