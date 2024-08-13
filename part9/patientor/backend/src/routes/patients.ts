import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils/patientUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try{
    const newPatientData = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(newPatientData);
    res.json(newPatient);
  } catch (error: unknown) {
    res.status(400).send(error);
  }
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    res.json(patient);
  }catch (error: unknown) {
    res.status(400).send(error);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.addPatientEntry(req.params.id, req.body);
    res.json(patient);
  }catch (error: unknown) {
    res.status(400).send(error);
  }
});
export default router;