/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: {
    Id: null,
    Name: '',
    Surname: '',
    FathersName: '',
    FinCode: '',
    PhoneNumber: '',
    Email: '',
    CreatedDate: null,
    Status: '',
    Profession: '',
    PermissionId: '',
    Permission: '',
    StatusId: null,
    LegalEntityId: null,
    LegalEntity: '',
    IsFounder: null,
    documentType: '',
    documentId: null,
    acceptor: '',
    acceptorVoen: null,
    getLegalEntityDto: {
      Id: null,
      Name: '',
      Voen: '',
      Email: '',
      PhoneNumber: '',
      StatusId: null,
      ActivityField: '',
      Address: ''
    },
    getFile: {
      id: null,
      mimeType: '',
      uploadDate: '',
      size: null,
      name: '',
      fileUrl: '',
      fileNameOnDisk: ''
    },
    PermissionDto: {
      isFounder: false,
      documentCompilation: false,
      sendingDocument: false,
      editingUser: false
    }
  },

  entities: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setEntities: (state, action: PayloadAction<any>) => {
      state.entities = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, setEntities } = userSlice.actions;

export default userSlice.reducer;
