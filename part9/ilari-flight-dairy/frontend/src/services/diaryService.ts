import axios, { AxiosError } from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries/';

export const getDiaryEntries = async() => {
  try{
    const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error('something went wrong: ' + error.message);
  }
};

export const createDiaryEntry = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error('something went wrong: ' + error.message);
  }
};