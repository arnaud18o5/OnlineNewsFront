import {useMutation, gql} from '@apollo/client';
import {useState} from 'react';

const UPLOAD_FILE = gql`
mutation Mutation($file: Upload!) {
  singleUpload(file: $file) {
    url
  }
}
`

const FileInput = () => {
    const [isUploaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => {
            setData(data);
            setIsLoaded(true);
        }
    })

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(!file) return
        else {
            uploadFile({variables:{file: file}});
        }

    }

    return (
        isUploaded ? <img src={data.singleUpload.url}></img> : <input type="file" onChange={handleUploadFile}/>

    )
}

export default FileInput;