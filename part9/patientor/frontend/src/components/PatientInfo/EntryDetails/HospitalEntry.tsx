
import { HospitalEntry } from '../../../types';

type Props = {
  entry: HospitalEntry;
};

function HospitalEntryDetails({ entry }: Props) {
  return (
    <>
      <p>Discharge: <span style={{ fontWeight: "bold" }}>{entry.discharge.date}</span></p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
    </>
  );
}

export default HospitalEntryDetails;