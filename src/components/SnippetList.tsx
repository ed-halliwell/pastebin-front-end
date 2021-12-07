import { ISnippet } from "../utils/interfaces";
import timestampConverter from "../utils/timestampConverter";
import "../styles/SnippetList.css";

interface SnippetListProps {
  snippets: ISnippet[];
  selectedSnippet: ISnippet | undefined;
  handleClickOnSnippet: (snippet: ISnippet) => void;
}

export default function SnippetList(props: SnippetListProps): JSX.Element {
  return (
    <>
      <div>
        <h4 className="mb-4">Snippet History</h4>
        <ol className="list-group list-group-item-action">
          {props.snippets.map((snippet) => (
            <li
              key={snippet.id}
              className={
                "list-group-item d-flex justify-content-between align-items-start " +
                (props.selectedSnippet &&
                props.selectedSnippet.id === snippet.id
                  ? "active"
                  : "")
              }
              onClick={() => props.handleClickOnSnippet(snippet)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold ">{snippet.title}</div>
                <p className="monospace-text">{snippet.text}</p>
              </div>
              <span className="badge bg-primary rounded-pill ">
                {timestampConverter(snippet.createdat)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
