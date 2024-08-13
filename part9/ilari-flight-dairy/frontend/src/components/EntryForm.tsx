import { useState } from "react";
import { createDiaryEntry } from "../services/diaryService";
import { parseString, parseVisibility, parseWeather } from "../utils";
import { NonSensitiveDiaryEntry } from "../types";
 
type Props = {
  updateDiary: (entry: NonSensitiveDiaryEntry) => void
}

function EntryForm({ updateDiary }: Props) {
  const [error, setError] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      createDiaryEntry({
        date: parseString(date), 
        weather: parseWeather(weather), 
        visibility: parseVisibility(visibility), 
        comment: parseString(comment) 
      }).then(response => {
        updateDiary(response)
      })
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label>Weather</label>
          <input type="radio" value="sunny" name="weather" checked={weather === 'sunny'} onChange={e => setWeather(e.target.value)} /> Sunny
          <input type="radio" value="rainy" name="weather" checked={weather === 'rainy'} onChange={e => setWeather(e.target.value)} /> Rainy
          <input type="radio" value="cloudy" name="weather" checked={weather === 'cloudy'} onChange={e => setWeather(e.target.value)} /> Cloudy
          <input type="radio" value="stormy" name="weather" checked={weather === 'stormy'} onChange={e => setWeather(e.target.value)} /> Stormy
          <input type="radio" value="windy" name="weather" checked={weather === 'windy'} onChange={e => setWeather(e.target.value)} /> Windy
        </div>
        <div>
          <label>Visibility</label>
          <input type="radio" value="great" name="visibility" checked={visibility === 'great'} onChange={e => setVisibility(e.target.value)} /> Great
          <input type="radio" value="good" name="visibility" checked={visibility === 'good'} onChange={e => setVisibility(e.target.value)} /> Good
          <input type="radio" value="ok" name="visibility" checked={visibility === 'ok'} onChange={e => setVisibility(e.target.value)} /> Ok
          <input type="radio" value="poor" name="visibility" checked={visibility === 'poor'} onChange={e => setVisibility(e.target.value)} /> Poor
        </div>
        <div>
          <label>Comment</label>
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </>
  )
}

export default EntryForm