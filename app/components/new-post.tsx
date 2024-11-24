import { Button, TextField } from "@mui/material";
import { Textarea } from "@mui/joy"
import { useState } from "react";

export default function NewPost({
  createFunc,
}: {
  createFunc: (title: string, content: string) => Promise<boolean>;
}) {
  const [alias, setAlias] = useState("")
  const [url, setUrl] = useState("")

  async function submitNewPost() {
    if (await createFunc(alias, url)) {
      setAlias("")
      setUrl("")
    }
  }
  return (
    <form
      className="w-96 rounded-x1 p-4 bg-sky-300" onSubmit={(e) => { e.preventDefault(); submitNewPost(); }}
    >
      <TextField
        variant="filled"
        sx={{ backgroundColor: "pink", width: "100%" }}
        label="Alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <Textarea
        sx={{
          padding: "0.5rem",
          height: "100px",
          width: "100%",
          borderRadius: 0,
        }}
        variant="soft"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="w-full flex justify-center">
        <Button
          sx={{ width: "80px"}}
          variant="contained"
          type="submit"
          disabled={alias.length === 0 || url.length === 0}
        >
          Create
        </Button>
      </div>
    </form>
  )
}