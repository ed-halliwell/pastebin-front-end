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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
