
import { OccupationalHealthcareEntry } from '../../../types';

type Props = {
  entry: OccupationalHealthcareEntry;
};

function OccupationalHealthcareEntryDetails({ entry }: Props) {
  return (
    <>
      <p>Employed by: {entry.employerName}</p>
      {entry.sickLeave && (
        <p>
          Sick leave: <span style={{ fontWeight: "bold" }}>{entry.sickLeave.startDate}</span> - <span style={{ fontWeight: "bold" }}>{entry.sickLeave.endDate}</span>
        </p>
      )}
    </>
  );
}

export default OccupationalHealthcareEntryDetails;