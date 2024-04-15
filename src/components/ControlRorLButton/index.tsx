import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import IconButton from "@mui/material/IconButton";

interface Props {
    type:'right'|'left',
    handleChangeMusic:(type:"next" | "prev")=>void
}

export default ({type,handleChangeMusic}:Props)=>{
    return (
        type=='right'? 
        <IconButton
        onClick={()=>handleChangeMusic("next")}
        >
        <SkipNextRoundedIcon
        sx={{ fontSize: "2rem",color:"#000" }} 
        />
        </IconButton>
        :
        <IconButton
        onClick={()=>handleChangeMusic("prev")}
        >
        <SkipPreviousRoundedIcon
        sx={{ fontSize: "2rem",color:"#000" }} 
        />
        </IconButton>
    )
}