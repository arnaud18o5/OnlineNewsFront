import {useMutation, gql} from '@apollo/client';
import {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';

const UPLOAD_FILE = gql`
mutation Mutation($file: Upload!) {
  singleUpload(file: $file) {
    url
  }
}
`

const FileInput = (props) => {
    const [isUploaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [cookies, setCookies] = useCookies();

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => {
            setData(data);
            if(props.type === "content"){
                const newArray = [...props.source, data.singleUpload.url];
                console.log([...props.source, data.singleUpload.url]);
                props.setP(newArray);
                props.setCounter(props.counter+1);
            }
            if(props.type === "headPicture"){
                props.setP(data.singleUpload.url);
            }
            if(props.type === "avatar"){
                updateInfo(data.singleUpload.url);
            }
            setIsLoaded(true);
        }
    })

    const updateInfo = async (avatar) =>{
        console.log(cookies.avatar)
        console.log(avatar)
        try {
            const query = `mutation Mutation($avatar: String) {
                addUserInfo(avatar: $avatar) {
                    avatar
                }
              }`;
              const res = await fetch('https://onlinenews.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.token,
                },
                body: JSON.stringify({
                query,
                variables: JSON.parse('{  "avatar" : "' +avatar+ '"}'),
                })
            });
            const response = await res.json();
            setData(response);
            console.log(response.data.singleUpload.url);
            props.setHP(response.data.singleUpload.url);
            if(!response.errors) {
                console.log(response.data.addUserInfo['avatar']);
            }
            else{
                console.log("add notification error");
            }
        } catch (e) {
            return 'error';
        }
        
    }

    useEffect(() => {
        if(data){
        }
    }, [data])

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);
        if(!file) return
        else {
            await uploadFile({variables:{file: file}});
        }

    }

    return (
        <input type="file" accept="image/png, image/jpeg" onChange={handleUploadFile}/>

    )
}

export default FileInput;