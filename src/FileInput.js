import {useMutation, gql} from '@apollo/client';
import {useState} from 'react';
import {useCookies} from 'react-cookie';

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
    const [cookies, setCookies] = useCookies();

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => {
            setData(data);
            console.log(data.singleUpload.url);
            setCookies('avatar', data.singleUpload.url);
            updateInfo();
            console.log(cookies.avatar);
            setIsLoaded(true);
        }
    })

    const updateInfo = async () =>{
        console.log(cookies.avatar)
        const query = `mutation Mutation($avatar: String) {
            addUserInfo(avatar: $avatar) {
                avatar
            }
          }`;
          const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookies.token,
            },
            body: JSON.stringify({
            query,
            variables: JSON.parse('{  "avatar" : "' +cookies.avatar+ '"}'),
            })
        });
        const response = await res.json();
        if(!response.errors) {
            console.log(cookies.avatar);
            console.log(response.data.addUserInfo['avatar']);
        }
        else{
            console.log("add notification error");
        }
    }

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(!file) return
        else {
            await uploadFile({variables:{file: file}});
            console.log(data.singleUpload.url);
            setCookies('avatar', data.singleUpload.url);
        }

    }

    return (
        <input type="file" accept="image/png, image/jpeg" onChange={handleUploadFile}/>

    )
}

export default FileInput;