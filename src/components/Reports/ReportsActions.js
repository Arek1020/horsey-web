import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save, ArrowForward } from '@mui/icons-material';
import { green, blue, red } from '@mui/material/colors';
// import { useValue } from '../../../context/ContextProvider';
import User from '../../scripts/User';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useNavigate } from "react-router-dom";

const ReportsActions = ({ params, rowId, setRowId }) => {

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
    const result = await useApi.post('/horse/update', payload)
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };
  const [read, setRead] = useState(params?.read)
  const handleClick = (id, user) => {
    setRead(true);
    setRowId(id, user)
  }

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
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
          bgcolor: read ? blue[500] : red[500],
          marginLeft: 1
        }}
        onClick={() => {
          handleClick(params?.id, params?.user)
        }}
      >

        <ArrowForward />
      </Fab>
    </Box>
  );
};

export default ReportsActions;