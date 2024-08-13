import { useState } from "react";
import { MenuItem, Select, SelectChangeEvent, Alert, Typography, InputLabel } from '@mui/material';
import { Diagnosis, EntryFormValues, EntryType } from "../../../types";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalForm from "./OccupationalForm";
import HospitalForm from "./HospitalForm";

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  error?: string;
  diagnosisList: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, error, diagnosisList }: Props) => {
  const [type, setType] = useState<EntryType | undefined>();

  const onFormTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find(g => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h5">Add Entry</Typography>
      <InputLabel style={{ marginTop: 10 }}>Entry Type</InputLabel>
      <Select label="Type" value={type} onChange={onFormTypeChange} fullWidth>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
      </Select>
      {type === "HealthCheck" && <HealthCheckForm onSubmit={onSubmit} codes={diagnosisList} />}
      {type === "OccupationalHealthcare" && <OccupationalForm onSubmit={onSubmit} codes={diagnosisList} />}
      {type === "Hospital" && <HospitalForm onSubmit={onSubmit} codes={diagnosisList} />}
    </div>
  );
};

export default AddEntryForm;