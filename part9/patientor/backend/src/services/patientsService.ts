import patientsData from '../../data/patients';
import { Entry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewEntry } from '../utils/entryUtils';

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patientData: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientData
  };
  patientsData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient => {
  const patient: Patient | undefined = patientsData.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  return patient;
};

const addPatientEntry = (patientId: Patient['id'], entryData: unknown): Patient => {
  const patient = getPatient(patientId);
  const entry: Entry = {
    id: uuid(),
    ...toNewEntry(entryData)
  };
  console.log(entry);
  patient.entries = [...patient.entries, entry];
  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addPatientEntry
};