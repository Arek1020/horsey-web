import React from 'react';
import ImageUploading from 'react-images-uploading';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Button from '@mui/material/Button';
import { useFetchWrapper } from '../../hooks/useFetchWrapper'
import { useAuthUser } from 'react-auth-kit'
import User from '../../scripts/User';
import { SERVER_URL } from '../../config'

export default function ImageUpload(props) {
  const user = useAuthUser();
  const userDetails = JSON.parse(localStorage.getItem('user') || '{}')
  const useApi = useFetchWrapper();

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  React.useEffect(() => {
    if (userDetails.logo)
      setImages([{ data_url: SERVER_URL + '/uploads/avatars/' + userDetails.logo }])
  }, [])

  const onChange = async (imageList, addUpdateIndex) => {
    setImages(imageList);

    var form = new FormData();
    form.append(props.name, imageList[0].file);
    form.append('user', user().id);
    const response = await useApi.sendFile('/user/avatar/upload', form)

    if (response) {
      var userDetails = await useApi.post('/user/get')
      localStorage.setItem('user', JSON.stringify(userDetails))
    }

  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper" style={{ height: "70%" }}>
            {!images.length ?
              <Button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <CloudUploadIcon />
                &nbsp;
                Click or Drop here
              </Button>
              : ''}
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item" style={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img src={image['data_url']} alt="" width="100" style={{ maxHeight: "100%" }} />
                <div className="image-item__btn-wrapper">
                  <Button onClick={() => onImageUpdate(index)}>Aktualizuj</Button>
                  <Button color="error" onClick={() => onImageRemove(index)}>Usuń</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}