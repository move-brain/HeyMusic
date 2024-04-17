import { memo } from "react";
interface Props {
    avatar: string;
}
const Avatar = ({ avatar }: Props) => {
    return (
        <div>
            <img src={avatar} loading="lazy" className="avatar-image" />
        </div>
    );
};
export default memo(Avatar);
