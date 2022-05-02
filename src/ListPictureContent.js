import {useState, useEffect} from 'react';



const ListPictureContent = (props) => {
    const [pictures, setPictures] = useState([{}]);
    
    useEffect(()=> {
        console.log(props.pictures);
        setPictures(props.pictures);
        console.log(props.pictures);
    },[])

    const copyText= (e) => {
        e.preventDefault();
        const link = e.target.picLink.value;
        navigator.clipboard.writeText(link);
    }

    if(pictures.length > 0){
        return (
            <div id='ListPictureContent'>
                <ul class="align-self-stretch list-inline">
                    {pictures.map((picture) => {
                        console.log(picture);
                        return (
                        <li key={pictures.url} class="list-inline-item mh-100">
                            <img src={"https://onlinenews.azurewebsites.net/images/"+picture} alt="" style={{width: '200px'}}/>
                            <form onSubmit={copyText}>
                                <input type="text" id="picLink" value={"https://onlinenews.azurewebsites.net/images/"+picture}/>
                            </form>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
    
}

export default ListPictureContent;