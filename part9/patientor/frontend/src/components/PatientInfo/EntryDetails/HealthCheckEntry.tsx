import { HealthCheckEntry } from '../../../types';

type Props = {
  entry: HealthCheckEntry;
};

function HealthCheckEntryDetails({ entry }: Props) {
  return <p>Health Check Rating: <span style={{ fontWeight: "bold" }}>
    {entry.healthCheckRating === 0 ? '💚' 
    : entry.healthCheckRating === 1 ? '💛' 
    : entry.healthCheckRating === 2 ? '🧡' 
    : '🖤'}</span></p>;
}

export default HealthCheckEntryDetails;