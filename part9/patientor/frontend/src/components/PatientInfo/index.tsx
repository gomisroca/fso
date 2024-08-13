import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import SingleEntry from "./SingleEntry";
import axios from "axios";
import AddEntryForm from "./AddEntryForm";
import { Typography } from "@mui/material";

function PatientInfo({ diagnoses }: { diagnoses: Diagnosis[] }) {
  const id = useParams<{ id: string }>().id;
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    patientService.get(id!).then(patient => {
      setPatient(patient);
    });
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const updatedPatient = await patientService.addEntry(id!, values);
      setPatient(updatedPatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Typography variant="h4">
        {patient.name}
        {patient.gender === "male" ?
          <span>♂</span>
          : patient.gender === "female" ?
          <span>♀</span>
          :
          <span>X</span>
        }
      </Typography>
      <p>{patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography variant="h5">Entries</Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {patient.entries.map(entry => (
            <SingleEntry key={entry.id} entry={entry} diagnosisList={diagnoses} />
          ))}
        </div>
        <AddEntryForm onSubmit={submitNewEntry} error={error} diagnosisList={diagnoses} />
      </div>
    </div>
  );
}

export default PatientInfo;