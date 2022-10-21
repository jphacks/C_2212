/*
function choose(props: any) {
    return ["10/23(Thu) FocusGold IA",]
}

// タグを表示する
const TagPaper = (props: any) => {
    let express = choose(props);
    return (
        <div className="tag_contents" >
            {express.map((name, index) => {
                if(name !== ""){
                    return(<p>{name}</p>)
                }
            })}
        </div>
    )
}
*/

// ローカルストレージをインポート
import { localStorageManager, LocalStorageManager, TaskGroups } from "../lib/localstorage/manager";

// 付箋を表示する
const TagPaper = ({chartItem}: {chartItem: any}) => {

    return(
        <div className="tag_contents" >
            <p>{chartItem.tasks[0].task_name}</p>
            <p>{chartItem.tasks[1].task_name}</p>
        </div>
    );
}

export default TagPaper;