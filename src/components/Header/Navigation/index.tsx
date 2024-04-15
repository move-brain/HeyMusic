import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import IconButton from '@mui/material/IconButton';
import style from './index.module.scss';
import { useNavigate ,useLocation  } from "react-router-dom";
export default ()=>{
    const navigate=useNavigate()
    const location=useLocation()
    const iconProperty={
        fontSize:'32px',
        color:"#000"
    }
    const goBack=(type:"back" | "next")=>{
        
        navigate("../")
    }
    return (
        <div className={style.navigation} >
            <IconButton
                onClick={()=>goBack("back")}
                sx={
                {
                height:"32px",
                width:"32px",
                marginRight:"8px"
                }
            } size='small' >
            <NavigateBeforeRoundedIcon sx={iconProperty} />
            </IconButton>
            <IconButton 
                onClick={()=>goBack("next")} 
                sx={
                {
                height:"32px",
                width:"32px",
                }
             } >
            <NavigateNextRoundedIcon sx={iconProperty} />
            </IconButton>
        </div>

    )
}