import { ISnippet } from "../utils/interfaces";
import timestampConverter from "../utils/timestampConverter";
import "../styles/SnippetList.css";

interface SnippetListProps {
  snippets: ISnippet[];
  selectedSnippet: ISnippet | undefined;
  handleClickOnSnippet: (snippet: ISnippet) => void;
}

export default function SnippetList(props: SnippetListProps): JSX.Element {
  function trimSnippetText(snippetText: string): string {
    return snippetText.length > 45
      ? snippetText.substring(0, 50) + "..."
      : snippetText;
  }

  return (
    <>
      <div>
        <h4 className="mb-4">Snippet History</h4>
        <ol className="list-group list-group-item-action overflow-auto">
          {props.snippets
            .sort((a, b) => b.createdat - a.createdat)
            .map((snippet) => (
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
                <div className="ms-2 me-auto snippet-list">
                  <div className="fw-bold ">{snippet.title}</div>
                  <p
                    className={
                      "monospace-text snippet-fragment " +
                      (props.selectedSnippet &&
                      props.selectedSnippet.id === snippet.id
                        ? "active"
                        : "")
                    }
                  >
                    {trimSnippetText(snippet.text)}
                  </p>
                </div>
                <span
                  className={
                    "badge bg-primary rounded-pill " +
                    (props.selectedSnippet &&
                    props.selectedSnippet.id === snippet.id
                      ? "active-pill"
                      : "")
                  }
                >
                  {timestampConverter(snippet.createdat)}
                </span>
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}
