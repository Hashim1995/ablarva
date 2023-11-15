/* eslint-disable no-return-await */
import axios from 'axios';
import { IGlobalResponse } from '@/models/common';
import { ILegalEntityDto } from '@/models/user';

export interface IAsanTokenRes {
  token: string;
}

export interface ILoginRes extends IGlobalResponse {
  Data: {
    Token: string;
  };
}

export interface IMyEntitiesRes extends IGlobalResponse {
  Data: {
    Datas: ILegalEntityDto[];
    TotalDataCount: number;
  };
}

const axiosAsanLoginInstance = axios.create({
  baseURL: `${import.meta.env.VITE_ASAN_URL}`,
  withCredentials: true
});

// eslint-disable-next-line no-unused-vars
const getMyLegalEntities = async (token: string): Promise<IMyEntitiesRes> => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthPerson: token
    }
  };
  const z = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/authpersonauthentication/getmylegalentities`,
    requestOptions
  );
  const response = await z.json();
  return response;
};

// eslint-disable-next-line no-unused-vars
const login = async (
  token: string,
  legalEntityId: number
): Promise<ILoginRes> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      AuthPerson: token
    },
    body: JSON.stringify({
      LegalEntityId: legalEntityId
    })
  };
  const z = await fetch(
    `${import.meta.env.VITE_BASE_URL}/authpersonauthentication/login`,
    requestOptions
  );
  const response = await z.json();
  return response;
};

const getAsanLoginToken = async () => {
  const z = axiosAsanLoginInstance
    .get('/ssoauthz/api/v1/token')
    .then(res => res.data);
  const b = await z.then(g => g.data);

  return b;
};

export { getAsanLoginToken, getMyLegalEntities, login };
