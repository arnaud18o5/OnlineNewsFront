import {useState, useEffect} from 'react';

const HeadPicture = (props) => {
    const [hp, setHp] = useState(null);

    useEffect(() => {
        setHp("https://onlinenews.azurewebsites.net/images/"+props.hp);
    }, [])

    if(hp !== null){
        return (
            <img src={hp} alt="headPicture" style={{width: "200px"}}/>
        )
    }

}

export default HeadPicture;