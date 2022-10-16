import React from "react";
import pageprevImage from "../images/pageprev.png";
import pagenextImage from "../images/pagenext.png";

// チャートページのクラス
class Todolist extends React.Component {

    // コンストラクタ
    constructor(props) {
        super(props);
        this.state = {pageNum: 0};
    }

    // ページ番号を変更する
    pageChange(page) {
        this.setState({pageNum: page});
    }

    // レンダリング
    render() {

        // チャートリスト
        const chartList = [
            {
                name: "車校①",
                color: "#ff2442",
                content: "テスト1"
            },
            {
                name: "車校②",
                color: "#ffb01a",
                content: "あいあいあい"
            },
            {
                name: "テス勉",
                color: "#3db2ff",
                content: "コンテンツのテスト"
            },
            {
                name: "部活動",
                color: "#ffb01a"
            },
            {
                name: "旅行",
                color: "#3db2ff"
            },
            {
                name: "旅行②",
                color: "#ff2442"
            },
            {
                name: "旅行②",
                color: "#ff2442"
            }
        ];
        const chartsCount = chartList.length;
        const currentPageNum = this.state.pageNum;
        
        // ページ送り
        let pageprev;
        let pagenext;
        if (currentPageNum > 0) {
            pageprev = (<div className='chart-pageprev'><img src={pageprevImage} alt="prevpage" onClick={() => this.pageChange(currentPageNum - 1)} /></div>);
        }
        if (currentPageNum * 6 + 6 < chartsCount) {
            pagenext = (<div className='chart-pagenext'><img src={pagenextImage} alt="nextpage" onClick={() => this.pageChange(currentPageNum + 1)} /></div>);
        } else if (chartsCount % 6 > 0) {
            // 最終ページには灰色のチャートを作成
            for (var i = 0; i < 6 - chartsCount % 6; i++) {
                chartList.push({
                    name: "未作成",
                    color: "#bdbdbd"
                });
            }
        }
        const displayCharts = chartList.slice(currentPageNum * 6, currentPageNum * 6 + 6);

        // 一覧を表示
        return (
            <div className='chart-page'>
            <h2 className='page-tree'>Home 》チャート一覧</h2>
            <h1 className='page-title'>チャート一覧</h1>
                <div className='chart-container'>
                {displayCharts.map((chartItem, index) => {
                    return (
                        <div className='chart-card' key={'chart-card' + index}>
                            <div className='chart-name' style={{backgroundColor: chartItem.color}} key={'chart-name' + index}>
                                <div className='chart-name-text' key={'chart-name-text' + index}>{chartItem.name}</div>
                            </div>
                            <div className='chart-content' key={'chart-content' + index}>
                                {chartItem.content}
                            </div>
                        </div>
                    );
                })}
                </div>
            {pageprev}
            {pagenext}
            </div>
        );
    }
}

export default Todolist;