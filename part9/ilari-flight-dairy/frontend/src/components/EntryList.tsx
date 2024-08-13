import { NonSensitiveDiaryEntry } from '../types'

type Props = {
  diary: NonSensitiveDiaryEntry[]
}

function EntryList({ diary}: Props) {
  return (
    diary.map(entry =>
      <div key={entry.id}>
        <h2>{entry.date}</h2>
        <p>Weather: {entry.weather}</p>
        <p>Visibility: {entry.visibility}</p>
      </div>
    )
  )
}

export default EntryList