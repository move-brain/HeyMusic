import { memo } from "react";
interface Props {
    avatar: string;
    onclick: () => void;
}
const Avatar = ({ avatar, onclick }: Props) => {
    return (
        <img
            onClick={onclick}
            src={avatar}
            loading="lazy"
            className="avatar-image"
        />
    );
};
export default memo(Avatar);
