import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save, ArrowForward } from '@mui/icons-material';
import { green, blue } from '@mui/material/colors';
// import { useValue } from '../../../context/ContextProvider';
import User from '../../scripts/User';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useNavigate } from "react-router-dom";

const UsersActions = ({ params, rowId, setRowId }) => {

  //   const { dispatch } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const useApi = useFetchWrapper()

  const handleSubmit = async () => {
    setLoading(true);

    const payload = params.row;
    delete payload.horses
    payload.active = payload.active ? 1 : 0
    const result = await useApi.post('/user/update', payload)
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
          bgcolor: blue[500],
          marginLeft: 1
        }}
        // disabled={params.id !== rowId || loading}
        onClick={() => {
          navigate(`/user/${params.id}`);
        }}
      >
        <ArrowForward />
      </Fab>
    </Box>
  );
};

export default UsersActions;