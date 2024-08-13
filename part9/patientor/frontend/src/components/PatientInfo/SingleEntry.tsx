
import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../../types';
import EntryDetails from './EntryDetails/index';

type Props = {
  entry: Entry
  diagnosisList: Diagnosis[]
};

function SingleEntry({ entry, diagnosisList }: Props) {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  useEffect(() => {
    if (entry.diagnosisCodes) {
      for (const code of entry.diagnosisCodes) {
        const found = diagnosisList.find(diagnosis => diagnosis.code === code);
        if(found){
          setDiagnosis([...diagnosis, found]);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, diagnosisList]);

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h4>{entry.date}</h4>
      <p>Diagnose by {entry.specialist}</p>
      <p style={{ fontStyle: "italic" }}>{entry.description}</p>
      <EntryDetails entry={entry} />
      <ul>
        {diagnosis?.map(diag => (
          <li key={diag.code}>{diag.code} - {diag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SingleEntry;