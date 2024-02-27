import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import formLEDReducer from 'src/reducers/formLEDReducers';
import masterDataReducer from 'src/reducers/masterDataReducer';
import userReducer from 'src/reducers/userReducer';

export const store = configureStore({
  reducer: {
    LED: formLEDReducer,
    user: userReducer,
    customizer: CustomizerReducer,
    masterData: masterDataReducer,
  },
});

export default store;
