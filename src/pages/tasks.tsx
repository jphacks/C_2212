import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";

import "./tasks.css";

import pageprevImg from '../images/pageprev.png';
import pagenextImg from '../images/pagenext.png';
import chartplusImg from '../images/chartplus.png';

// チャートページのクラス
class Todolist extends React.Component {
    
    state: {
        pageNum: number, 
        chartCreateIndex: number,
        isChartCreate: boolean
        inputValue: string
    };

    chartData: {
        name?: string,
        color?: string,
        content?: string,
        newFlag?: boolean,
        unvisible?: boolean,
    }[];

    // コンストラクタ
    constructor(props: object) {
        super(props);

        this.state = {
            pageNum: 0,
            chartCreateIndex: -1,
            isChartCreate: false,
            inputValue: ''
        };

        // チャートリスト
        this.chartData = [
            {
                name: "あああああああ",
                color: "#ff2442",
                content: "テスト1",
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
                name: "旅行③",
                color: "#ff2466"
            }
        ];
    }

    // レンダリング
    render() {

        const chartList = Object.assign([], this.chartData);
        const currentPageNum = this.state.pageNum;
        chartList.push({
            newFlag: true
        });
        const chartsCount = chartList.length;
        
        // ページ送り
        let pageprev: any;
        let pagenext: any;
        let displayCharts: any;
        if (currentPageNum > 0) {
            pageprev = (<div className='chart-pageprev'><img src={pageprevImg} alt="prev page" onClick={() => this.prevPageChange(currentPageNum)} /></div>);
        }
        if (currentPageNum * 6 + 6 < chartsCount) {
            pagenext = (<div className='chart-pagenext'><img src={pagenextImg} alt="next page" onClick={() => this.nextPageChange(currentPageNum)} /></div>);
        } else if (chartsCount % 6 > 0) {
            for (let i = 0; i < 6 - chartsCount % 6; i++) {
                chartList.push({
                    unvisible: true
                });
            }
        }
        displayCharts = chartList.slice(currentPageNum * 6, currentPageNum * 6 + 6);

        // モーダル部分
        let modal: any;

        // 新規作成ページを表示するか
        if (this.state.isChartCreate) {
            modal = (
                <div className='modal'>
                    <div className='modal-inner'>
                        <div className='modal-header'></div>
                        <div className='modal-introduction'>
                            新規チャート名を入力してください
                        </div>
                        <form onSubmit={() => {this.handleClickChartCreateSubmit(this.state.inputValue)}}>
                            <div className="modal-chart-name-input">
                                <label className="modal-chart-name-label">
                                    {/* inputタグでチャート名を入力 */}
                                    <input
                                        type="text"
                                        placeholder="チャート名"
                                        value={this.state.inputValue}
                                        onChange={(event) => {this.setState({inputValue: event.target.value})}}
                                    />
                                </label>
                            </div>
                            <button type='submit' className='modal-create-btn'>
                                新規作成
                            </button>
                            <button className='modal-close-btn' onClick={() => {this.handleClickChartClose()}}>
                                もどる
                            </button>
                        </form>
                    </div>
                </div>
            );
        }

        // 最終レンダリング
        return (
            <div className='chart-page'>
            <h2 className='page-tree'>Home 》チャート一覧</h2>
            <h1 className='page-title'>チャート一覧</h1>
                <div className='chart-container'>
                {displayCharts.map((chartItem: any, index: number) => {
                    if (chartItem.newFlag) {
                        // チャート新規作成を表示
                        return (
                            <div className='chart-create'
                                 onClick={() => {this.handleClickChartCreate(currentPageNum, currentPageNum * 6 + index)}}
                                 key={'chart-create' + index}
                            >
                                <div className='chart-create-text' key={'chart-create-text' + index}>
                                    新規作成
                                </div>
                                <div className='chart-create-plus' key={'chart-create-plus' + index}>
                                    <img src={chartplusImg} alt="add chart" onClick={() => this.prevPageChange(currentPageNum)}/>
                                </div>
                            </div>
                        );
                    } else if (chartItem.unvisible) {
                        // 空(透明)のチャートを表示
                        return (
                            <div className='chart-card' style={{visibility: "hidden"}} key={'chart-card' + index}>
                            </div>
                        );
                    } else {
                        // 既存のチャートを表示
                        return (
                            <div className='chart-card'
                                 onClick={() => {this.chartThumbnailOnClick(currentPageNum * 6 + index)}}
                                 key={'chart-card' + index}
                            >
                                <div className='chart-name' style={{backgroundColor: chartItem.color}} key={'chart-name' + index}>
                                    <div className='chart-name-text' key={'chart-name-text' + index}>
                                    {this.chartNameDisplay(chartItem.name)}
                                    </div>
                                </div>
                                <div className='chart-content' key={'chart-content' + index}>
                                    {chartItem.content}
                                </div>
                            </div>
                        );
                    }
                })}
                </div>
            {pageprev}
            {pagenext}
            {modal}
            </div>
        );
    }

    // ページ番号を変更する
    prevPageChange(page: number) {
        this.setState({pageNum: page - 1});
    };

    nextPageChange(page: number) {
        this.setState({pageNum: page + 1});
    };

    // チャート新規作成をする
    handleClickChartCreate(page: number, index: number) {
        this.setState({
            isChartCreate: true,
            chartCreateIndex: index,
            pageNum: page
        });
    }

    handleClickChartCreateSubmit(name: string) {
        this.chartData[this.state.chartCreateIndex] =({
            name: name,
            color: "#bdbdbd",
            newFlag: false
        });
        Todolist.update('task_class_name', this.chartData[this.state.chartCreateIndex].name)
        this.setState({
            isChartCreate: false,
            chartCreateIndex: null
        });
    }

    handleClickChartClose() {
        this.setState({
            isChartCreate: false,
            chartCreateIndex: null
        });
    }

    // チャート一覧の名前の表示方法
    chartNameDisplay(name: string) {
        if (name.length >= 7) {
            return(name.substring(0, 6) + '…');
        } else {
            return(name);
        }
    }

    // 既存チャートをクリックしたらクエリパラメータを追加
    chartThumbnailOnClick(index: number) {
        Todolist.update('task_class_name', this.chartData[index].name)
        console.log(Todolist.toObject());
    }

    // チャートカラーを変更
    
    // チャートを消去

    // クエリパラメーターを作成・更新
    static update(key: string, value?: string): boolean {
        const params: any = this.toObject();
        params[key] = value;
        const url = "?" + Object.keys(params).map(
            (key: string) => key + "=" + params[key]).join("&");
        window.history.replaceState('', '', url);
        window.history.pushState('', '', url);

        return true;
    }

    static get(key: string): string {
        const params: any = this.toObject();
        return params[key];
    }

    static toObject(): Object {
        let vars : any = {}, max: number, hash: any, array: any = "";
        let url = window.location.search;

        if (url.length === 0) {
            return vars;
        }
        hash = url.slice(1).split('&');
        max = hash.length;
        for (let i = 0; i < max; i++) {
            array = hash[i].split('=');
            vars[array[0]] = array[1];
        }

        return vars;
    }
}

export default Todolist;