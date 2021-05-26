import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      paper: {
        padding: theme.spacing(2),
        marginBottom: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      input: {
        display: 'none',
      },
      label: {
          width: '97%',
      },
      button: {
        marginTop: 15,
      }
}));