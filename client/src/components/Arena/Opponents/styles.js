import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  mainGrid: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  circularProgress: {
    display: 'flex',
    margin: 'auto',
  },
}));