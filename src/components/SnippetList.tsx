import { ISnippet } from "../utils/interfaces";
import timestampConverter from "../utils/timestampConverter";

interface SnippetListProps {
  snippets: ISnippet[];
}

export default function SnippetList(props: SnippetListProps): JSX.Element {
  return (
    <>
      {props.snippets.map((snippet) => (
        <ul key={snippet.id}>
          <li>
            <p>{snippet.id}</p>
            <p>{snippet.title}</p>
            <p>{timestampConverter(snippet.createdat)}</p>
            <p>{snippet.text}</p>
          </li>
        </ul>
      ))}
    </>
  );
}
