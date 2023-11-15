
export interface ILegalEntityDto {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Email: string;
  Voen: string;
  StatusId: number;
  ActivityField: string;
  Address: string;
}

export interface ILegalEntityPhoto {
  id: number;
  mimeType: string;
  uploadDate: string;
  size: number;
  name: string;
  fileUrl: string;
}

export interface IAuth {
  Id: number;
  Name: string;
  Surname: string;
  FathersName: string;
  FinCode: string;
  PhoneNumber: string;
  Email: string;
  Status: string;
  Profession: string;
  Permission: string;
  IsFounder: boolean;
  getLegalEntityDto: ILegalEntityDto;
  getFile: ILegalEntityPhoto;
}




// old 

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserData {
  accessToken: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: number;
  verified: boolean;
}
