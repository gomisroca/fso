import { assertNever, isString, parseString } from './commonUtils';
import { BaseEntry, Diagnosis, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewEntry, OccupationalHealthcareEntry, UnionOmit } from '../types';

const isEntryType = (type: unknown): type is Entry['type'] => {
  return isString(type) && ["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(type);
};

const parseEntryType = (type: unknown): Entry['type'] => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  return type;
};

const isDiagnosisCodes = (codes: unknown): codes is Array<Diagnosis['code']> => {
  return Array.isArray(codes) && codes.every(code => typeof code === 'string');
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> =>  {
  if (!isDiagnosisCodes(codes)) {
    return [] as Array<Diagnosis['code']>;
  }
  return codes;
};

const parseBaseEntry = (object: unknown): UnionOmit<BaseEntry, 'id'>  => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
    return {
      description: parseString(object.description),
      date: parseString(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
  }
  throw new Error('Incorrect data: Missing Fields');
};

// Health Check Entry
const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return typeof rating === 'number' && [0, 1, 2, 3].includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

const parseHealthCheckEntry = (object: unknown): UnionOmit<HealthCheckEntry, 'id'> => {
  if (!object || typeof object !== 'object' || !('healthCheckRating' in object)) {
    throw new Error('Incorrect or missing object');
  }
  return {
    ...parseBaseEntry(object),
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
  };
};

// Hospital Entry
const isDischarge = (discharge: unknown): discharge is HospitalEntry['discharge'] => {
  if (!discharge || typeof discharge !== 'object') {
    return false;
  }
  return typeof discharge === 'object' && 'date' in discharge && 'criteria' in discharge;
};

const parseDischarge = (discharge: unknown): HospitalEntry['discharge'] => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseHospitalEntry = (object: unknown): UnionOmit<HospitalEntry, 'id'> => {
  if (!object || typeof object !== 'object' || !('discharge' in object)) {
    throw new Error('Incorrect or missing object');
  }
  return {
    ...parseBaseEntry(object),
    type: "Hospital",
    discharge: parseDischarge(object.discharge)
  };
};


// Occupational Healthcare Entry
const isEmployerName = (name: unknown): name is OccupationalHealthcareEntry['employerName'] => {
  return typeof name === 'string';
};
const parseEmployerName = (name: unknown): OccupationalHealthcareEntry['employerName'] => {
  if (!name || !isEmployerName(name)) {
    throw new Error('Incorrect or missing employer name');
  }
  return name;
};

const isSickLeave = (leave: unknown): leave is OccupationalHealthcareEntry['sickLeave'] => {
  if (!leave || typeof leave !== 'object') {
    return false;
  }
  return typeof leave === 'object' && 'startDate' in leave && 'endDate' in leave;
};

const parseSickLeave = (leave: unknown): OccupationalHealthcareEntry['sickLeave'] => {
  if (!leave || !isSickLeave(leave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return leave;
};

const parseOccupationalHealthcareEntry = (object: unknown): UnionOmit<OccupationalHealthcareEntry, 'id'> => {
  if (!object || typeof object !== 'object' || !('employerName' in object) || !('sickLeave' in object)) {
    throw new Error('Incorrect or missing object');
  }
  return {
    ...parseBaseEntry(object),
    type: "OccupationalHealthcare",
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave)
  };
};

// New Entry
export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }
  const obj = object as Entry;
  if ('type' in obj) {
    parseEntryType(obj.type);
    switch (obj.type) {
      case "HealthCheck":
        return parseHealthCheckEntry(obj);
      case "OccupationalHealthcare":
        return parseOccupationalHealthcareEntry(obj);
      case "Hospital":
        return parseHospitalEntry(obj);
      default:
        return assertNever(obj);    
    }
  }
throw new Error('Incorrect data: Missing Fields');
};