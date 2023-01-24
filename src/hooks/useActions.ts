import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch } from '../store';
import {allActionCreators} from "../store/actionCreators";

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(allActionCreators, dispatch);
};
