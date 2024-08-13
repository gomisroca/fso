import { NonSensitiveDiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getDiaryEntries } from "./services/diaryService";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getDiaryEntries().then(response => {
      setDiary(response)
    })
  }, [])

  return (
    <>
    <EntryForm updateDiary={(newEntry) => setDiary([...diary, newEntry])} />
    <EntryList diary={diary} />
    </>
  )
}

export default App
