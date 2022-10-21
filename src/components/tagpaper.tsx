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

// 付箋を表示する
const TagPaper = ({chartItem}: {chartItem: any}) => {

    const displayTags = 2;  // 表示する付箋の最大枚数
    const tagRenders = [];  // 出力する付箋データ
    const dayOfWeekStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  // 曜日の英語表記リスト

    // 付箋のカラーテーマ
    const themeColor = [
        ["#F9D2D2", "#F8C0C0"], // 赤系統
        ["#81BDCE", "#2994B2"], // 緑系統
        ["#FBE5B2", "#FFD36A"], // 黄系統
        ["#EDEAE8", "#D5D2CF"], // 白系統
    ];
    
    for (let i = 0; i < displayTags && i < chartItem.tasks.length; i++) {

        // Date文字列に変換
        const startDate = new Date(Date.parse(chartItem.tasks[i].scheduled_date));
        const endDate   = new Date(Date.parse(chartItem.tasks[i].deadline));

        const colorCSS = {
            backgroundColor: themeColor[chartItem.tasks[i].color][0],
            borderLeft: '25px solid' + themeColor[chartItem.tasks[i].color][1]
        }

        // 日付の開始日と締切日が同じかで表記を変える
        if (startDate.getMonth() === endDate.getMonth() && startDate.getDate() === endDate.getDate()) {
            tagRenders.push(
                <p style={colorCSS} key={chartItem.task_group_name + '-patern1-' + i}>
                    {startDate.getMonth() + 1}/{startDate.getDate()}({dayOfWeekStr[startDate.getDay()]}): {chartItem.tasks[i].task_name}
                </p>
            );
        } else {
            tagRenders.push(
                <p style={colorCSS} key={chartItem.task_group_name + '-patern2-' + i}>
                    {startDate.getMonth() + 1}/{startDate.getDate()}({dayOfWeekStr[startDate.getDay()]}) ～ {endDate.getMonth() + 1}/{endDate.getDate()}({dayOfWeekStr[endDate.getDay()]}): {chartItem.tasks[i].task_name}
                </p>
            );
        }
    }

    // レンダリング
    return(
        <div className="tag_contents" key={chartItem.task_group_name}>
            {tagRenders}
        </div>
    );
}

export default TagPaper;