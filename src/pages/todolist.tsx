import React from "react";
import pagenextPrev from "../images/pageprev.png";
import pagenextImg from "../images/pagenext.png";
import "./todolist.css";
import chartList from "../lib/data/task_ls.json"
import TagPaper from "../components/tagpaper";

// チャートページのクラス
class Todolist extends React.Component {
    
    state: any = {pageNum: 0};

    // コンストラクタ
    constructor(props: object) {
        super(props);
        this.state = {pageNum: 0};
    }

    // ページ番号を変更する
    prevPageChange(page: number) {
        this.setState({pageNum: page - 1});
    };

    nextPageChange(page: number) {
        this.setState({pageNum: page + 1});
    };

    // レンダリング
    render() {

        // チャートリスト
        
        const chartsCount = chartList.tasks.length;
        const currentPageNum = this.state.pageNum;
        
        // ページ送り
        let pageprev: any;
        let pagenext: any;
        if (currentPageNum > 0) {
            pageprev = (<div className='chart-pageprev'><img src={pagenextPrev} alt="prevpage" onClick={() => this.prevPageChange(currentPageNum)} /></div>);
        }
        if (currentPageNum * 6 + 6 < chartsCount) {
            pagenext = (<div className='chart-pagenext'><img src={pagenextImg} alt="nextpage" onClick={() => this.nextPageChange(currentPageNum)} /></div>);
        } else if (chartsCount % 6 > 0) {

            // 最終ページには灰色のチャートを作成
            for (let i = 0; i < 6 - chartsCount % 6; i++) {
                chartList.tasks.push({
                    name: "未作成",
                    content: "",
                    color: "#bdbdbd",
                    content: "",
                    newFlag: true
                });
            }

        }
        const displayCharts = chartList.tasks.slice(currentPageNum * 6, currentPageNum * 6 + 6);

        // 一覧を表示
        return (
            <div className='chart-page'>
            <h2 className='page-tree'>Home 》チャート一覧</h2>
            <h1 className='page-title'>チャート一覧</h1>
                <div className='chart-container'>
                {displayCharts.map((chartItem, index) => {
                    if (chartItem.newFlag === false) {
                        return (
                            <div className='chart-card' key={'chart-card' + index}>
                                <div className='chart-name' style={{backgroundColor: chartItem.color}} key={'chart-name' + index}>
                                    <div className='chart-name-text' key={'chart-name-text' + index}>{chartItem.name}</div>
                                </div>
                                <div className='chart-content' key={'chart-content' + index}>
                                    {TagPaper(chartItem.content)}
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className='chart-card' style={{backgroundColor: '#FBE5B2'}} key={'chart-card' + index}>
                                <div className='chart-create-text' key={'chart-create-text' + index}>
                                    新規作成
                                </div>
                                <div className='chart-content' key={'chart-content' + index}>
                                    ＋
                                </div>
                            </div>
                        );
                    }
                })}
                </div>
            {pageprev}
            {pagenext}
            {}
            </div>
        );
    }
}

export default Todolist;

/*
<div className='chart-card' key={'chart-card' + index}>
<div className='chart-name' style={{backgroundColor: chartItem.color}} key={'chart-name' + index}>
    名前です
</div>
<div className='chart-content' key={'chart-content' + index}>
    {chartItem.content}
</div>
</div>
*/

/*

*/