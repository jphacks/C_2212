import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";

import "./tasks.css";

import pageprevImg from '../images/pageprev.png';
import pagenextImg from '../images/pagenext.png';
import chartplusImg from '../images/chartplus.png';

// チャートページのクラス
class Tasks extends React.Component {
    
    // 型定義・初期化
    // State
    state: {
        pageNum: number, 
        currentColor: number,
        chartCreateIndex: number,
        isChartCreate: boolean,
        inputValue: string
    };

    // チャートデータ
    chartData: {
        name?: string,
        color?: number,
        content?: string,
        newFlag?: boolean,
        unvisible?: boolean,
    }[];

    // テーマカラー
    themeColor = [
        "#ff2442",  // 赤色
        "#ffb01a",  // 黄色
        "#3db2ff",  // 水色
        "#2994b2"   // エメラルド色
    ]

    // コンストラクタ
    constructor(props: object) {
        super(props);

        this.state = {
            pageNum: 0,
            chartCreateIndex: -1,
            isChartCreate: false,
            inputValue: '',
            currentColor: 0
        };

        // チャートリスト
        this.chartData = [
            {
                name: "あああああああ",
                color: 0,
                content: "テスト1",
            },
            {
                name: "車校②",
                color: 1,
                content: "あいあいあい"
            },
            {
                name: "テス勉",
                color: 2,
                content: "コンテンツのテスト"
            },
            {
                name: "部活動",
                color: 1
            },
            {
                name: "旅行",
                color: 2
            },
            {
                name: "旅行②",
                color: 0
            },
            {
                name: "旅行③",
                color: 3
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

        // モーダル(子ウィンドウ)
        let modal: any;
        // モーダル：新規作成ページ
        if (this.state.isChartCreate) {
            modal = this.modal_newChart(this.state.currentColor);
        }
        // モーダル：チャート情報の編集

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
                                <div className='chart-name' style={{backgroundColor: this.themeColor[chartItem.color]}} key={'chart-name' + index}>
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
            pageNum: page,
            currentColor: 0
        });
    }

    handleClickChartCreateSubmit(name: string) {
        this.chartData[this.state.chartCreateIndex] =({
            name: name,
            color: this.state.currentColor
        });
        Tasks.update('task_class_name', this.chartData[this.state.chartCreateIndex].name)
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
        Tasks.update('task_class_name', this.chartData[index].name)
        console.log(Tasks.toObject());
    }

    // モーダル：チャート新規作成
    modal_newChart(currentColor: number) {

        const colorList: any[] = [];
        for (let i = 0; i < this.themeColor.length; i++) {
            if (currentColor == i) {
                colorList.push(
                    <div className="modal-chart-color-select"
                        onClick={() => {this.setState({currentColor: i})}}
                        style={{backgroundColor: this.themeColor[i]}}
                        key={'chart-content' + i}
                    >
                    &nbsp;</div>
                );
            } else {
                colorList.push(
                    <div className="modal-chart-color-unselect"
                        onClick={() => {this.setState({currentColor: i})}}
                        style={{backgroundColor: this.themeColor[i]}}
                        key={'chart-content' + i}
                    >
                    &nbsp;</div>
                );
            }
        }

        return (
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
                        <div className="modal-chart-color-input">
                            テーマカラー
                            <div className="modal-chart-color-labels">
                            {colorList}
                            </div>
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

    // モーダル：チャート情報を編集
    

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

    // 指定したキーワードのクエリパラメータを取得
    static get(key: string): string {
        const params: any = this.toObject();
        return params[key];
    }

    // クエリパラメータの一覧を連想配列で取得
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

export default Tasks;