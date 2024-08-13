import { Input, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Diagnosis } from '../../../types';

type Props = {
  codes: Diagnosis[];
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  setDescription: (description: string) => void;
  setDate: (date: string) => void;
  setSpecialist: (specialist: string) => void;
  setDiagnosisCodes: (diagnosisCodes: string[]) => void;
};

function BaseEntryInputs({
  codes, 
  description,
  date,
  specialist,
  diagnosisCodes,
  setDescription, 
  setDate, 
  setSpecialist, 
  setDiagnosisCodes}: Props) {
  return (
    <div>
      <InputLabel style={{ marginTop: 10 }}>Entry Description</InputLabel>
      <TextField
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Date of Entry</InputLabel>
      <Input
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <InputLabel style={{ marginTop: 10 }}>Specialist's Name</InputLabel>
      <TextField
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

      <InputLabel style={{ marginTop: 10 }}>Diagnosis Codes</InputLabel>
      <Select
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(diagnosisCodes.concat(target.value))}
        input={<OutlinedInput label="Diagnosis Codes" />}
        renderValue={(selected: string[]) => selected.join(", ")}
      >
        {codes.map(option =>
          <MenuItem key={option.code} value={option.code}>
            {option.code} - {option.name}
          </MenuItem>
        )}
      </Select>
    </div>
  );
}

export default BaseEntryInputs;