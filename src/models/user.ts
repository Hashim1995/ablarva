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
export interface IUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  gender: string | number;
  dateOfBirth: string | Date;
}

export interface IUserSessions {
  id: number;
  userId: number;
  userAgent: string;
  deviceType: number;
  platformName: string;
  platformType: number;
  browserName: string;
  browserVersion: string;
  mobileDeviceType: null | number;
  loginDate: string;
  status: true;
  ipAddress: string;
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
  userSessions: IUserSessions[];
}

export interface IUserLoggedData extends Omit<IUserData, 'accessToken'> {}
