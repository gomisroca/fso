import { useState, SyntheticEvent } from "react";
import { InputLabel, MenuItem, Select, Button, SelectChangeEvent } from '@mui/material';
import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../../types";
import BaseEntryInputs from "./BaseEntryInputs";

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  error?: string;
  codes: Diagnosis[];
}

const HealthCheckForm = ({ onSubmit, codes }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<string>(String(HealthCheckRating.Healthy));

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find(r => r.toString() === value);
      if (rating) {
        setHealthCheckRating(rating as string);
      }
    }
  };


  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: 'HealthCheck',
      healthCheckRating: Number(healthCheckRating)
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <BaseEntryInputs 
          codes={codes} 
          description={description} 
          date={date} 
          specialist={specialist} 
          diagnosisCodes={diagnosisCodes} 
          setDescription={setDescription} 
          setDate={setDate} 
          setSpecialist={setSpecialist} 
          setDiagnosisCodes={setDiagnosisCodes} 
        />
        <InputLabel style={{ marginTop: 10 }}>HealthCheck Rating</InputLabel>
        <Select
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          <MenuItem
            key="Healthy"
            value="0"
          >
            Healthy
          </MenuItem>
          <MenuItem
            key="LowRisk"
            value="1"
          >
            Low Risk
          </MenuItem>
          <MenuItem
            key="HighRisk"
            value="2"
          >
            High Risk
          </MenuItem>
          <MenuItem
            key="CriticalRisk"
            value="3"
          >
            Critical Risk
          </MenuItem>
        </Select>
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default HealthCheckForm;