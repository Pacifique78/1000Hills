import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TintEditor = (props) => {
  const [value, setValue] = useState("<p>Leave a message.</p>");
  return (
    <Editor
      apiKey="ynsvwdlcue5atrsdoryetchq53s0txl7yjn866zo5savwuuq"
      initialValue={value}
      value={value}
      init={{
        height: 150,
        width: 500,
        menubar: false,
        plugins: "emoticons",
        toolbar: "emoticons",
        toolbar_location: "bottom",
      }}
      onClick={() => {
        props.clicked("flex");
        setValue("");
      }}
    />
  );
};

export default TintEditor;
