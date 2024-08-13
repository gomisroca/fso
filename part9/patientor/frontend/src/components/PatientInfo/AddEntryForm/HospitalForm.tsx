import { useState, SyntheticEvent } from "react";
import { InputLabel, Button, Typography, TextField, Input } from '@mui/material';
import { Diagnosis, EntryFormValues } from "../../../types";
import BaseEntryInputs from "./BaseEntryInputs";

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  error?: string;
  codes: Diagnosis[];
}

const HospitalForm = ({ onSubmit, codes }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: 'Hospital',
      discharge: { date: dischargeDate, criteria: dischargeCriteria }
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
        <InputLabel style={{ marginTop: 10 }}>Discharge</InputLabel>
        <Typography variant="subtitle2">Criteria</Typography>
        <TextField fullWidth value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} />
        <InputLabel style={{ marginTop: 10 }}>Sick Leave</InputLabel>
        <Typography variant="subtitle2">Date</Typography>
        <Input type="date" fullWidth value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} />
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default HospitalForm;