import { memo, useState } from "react";
import style from "./index.module.scss";
import {
    playlistCategories,
    type playlistCategoriestype,
    select,
} from "@/utils/staticData";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@/utils/hooks";
interface Props {
    category: string;
}
const selectlist = ({ category }: Props) => {
    const selectItem = playlistCategories.find(
        (item) => item.name === decodeURI(category)
    );
    const [activeItem, setActiveItem] = useState<playlistCategoriestype>(
        selectItem ? selectItem : playlistCategories[0]
    );
    const navigate = useNavigate();
    const [List, setShowList] = useState(
        playlistCategories.filter((item) => item.enable)
    );
    const [IsMore, setIsMore] = useState(false);
    const handAdd = (selectitem: playlistCategoriestype) => {
        if (List.some((item) => item.name === selectitem.name)) {
            return;
        }
        setShowList([...List, selectitem]);
    };
    const handSelctItem = (Item: playlistCategoriestype) => {
        setActiveItem(Item);
        navigate(`/Explore?category=${Item.name}`);
    };
    return (
        <div className={style.selectList}>
            {List.map((item) => (
                <div
                    key={item.name}
                    onClick={() => handSelctItem(item)}
                    className={classNames("selectItem", {
                        active: activeItem.name == item.name,
                    })}
                >
                    {item.name}
                </div>
            ))}
            <div
                onClick={() => setIsMore(!IsMore)}
                className={classNames("selectItem", {
                    active: IsMore,
                })}
            >
                更多
            </div>
            {IsMore && (
                <div className={style.conceal}>
                    {select.map((selectItem) => {
                        return (
                            <div key={selectItem.name} className="BigItem">
                                <div className="title">{selectItem.name}</div>
                                <div className="right">
                                    {playlistCategories
                                        .filter(
                                            (item) =>
                                                item.bigCat == selectItem.name
                                        )
                                        .map((item) => (
                                            <div
                                                key={item.name}
                                                onClick={() => handAdd(item)}
                                                className={classNames("Item", {
                                                    active: List.some(
                                                        (activeItem) =>
                                                            activeItem.name ==
                                                            item.name
                                                    ),
                                                })}
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default memo(selectlist);
