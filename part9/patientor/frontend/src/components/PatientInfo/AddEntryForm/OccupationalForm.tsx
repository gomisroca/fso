import { useState, SyntheticEvent } from "react";
import { InputLabel, Button, TextField, Input, Typography } from '@mui/material';
import { Diagnosis, EntryFormValues } from "../../../types";
import BaseEntryInputs from "./BaseEntryInputs";

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  error?: string;
  codes: Diagnosis[];
}

const OccupationalForm = ({ onSubmit, codes }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: 'OccupationalHealthcare',
      employerName,
      sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd }
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
        <InputLabel style={{ marginTop: 10 }}>Employer's Name</InputLabel>
        <TextField fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
        <InputLabel style={{ marginTop: 10 }}>Sick Leave</InputLabel>
        <Typography variant="subtitle2">Start Date</Typography>
        <Input type="date" fullWidth value={sickLeaveStart} onChange={({ target }) => setSickLeaveStart(target.value)} />
        <Typography variant="subtitle2">End Date</Typography>
        <Input type="date" fullWidth value={sickLeaveEnd} onChange={({ target }) => setSickLeaveEnd(target.value)} />
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default OccupationalForm;