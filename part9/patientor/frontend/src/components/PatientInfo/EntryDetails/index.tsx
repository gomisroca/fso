import { Entry } from '../../../types';
import HealthCheckEntryDetails from './HealthCheckEntry';
import HospitalEntryDetails from './HospitalEntry';
import OccupationalHealthcareEntryDetails from './OccupationalEntry';

type Props = {
  entry: Entry
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function EntryDetails({ entry }: Props) {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
}

export default EntryDetails;