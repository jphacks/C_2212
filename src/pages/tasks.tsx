import React from "react";
import "./tasks.css";
import task_ls from "../lib/data/task_ls.json"; // JSONをインポート

// 画像ファイルをインポート
import pageprevImg from '../images/pageprev.png';
import pagenextImg from '../images/pagenext.png';
import chartplusImg from '../images/chartplus.png';
import charteditImg from '../images/chartedit.png';

// URLコンポーネントをインポート
import URLParams from '../components/params';

// チャートページのクラス
class Tasks extends React.Component {
    
    // 型定義・初期化
    // State
    state: {
        displayPageNumber: number, 
        currentColor: number,
        targetIndex: number,
        isChartCreate: boolean,
        isChartEdit: boolean,
        inputValue: string,
        renderReload: boolean
    };

    // コンストラクタ
    constructor(props: object) {
        super(props);

        this.state = {
            displayPageNumber: 0,
            currentColor: 0,
            targetIndex: -1,
            isChartCreate: false,
            isChartEdit: false,
            inputValue: '',
            renderReload: false
        };
    }

    // レンダリング
    render() {
        console.log(URLParams.get('task_class_name') !== undefined);
        if (URLParams.get('task_class_name') !== undefined) {
            return (this.render_indivisualTask());
        } else {
            return (this.render_chartSelect());
        }
    }

    // レンダリング：チャート選択画面
    render_chartSelect() {

        const chartList = Object.assign([], task_ls.tasks);

        // 最後に新規作成用のダミーチャートを挿入
        chartList.push({
            "name": "",
            "color": 0,
            "content": "",
            "newChart": true,
            "unvisible": false
        });

        const currentDisplayPageNumber = this.state.displayPageNumber;
        const chartsCount = chartList.length;
        
        // ページ送り
        let pageprev: any;
        let pagenext: any;
        let displayCharts: any;
        if (currentDisplayPageNumber > 0) {
            pageprev = (<div className='chart-pageprev'><img src={pageprevImg} alt="prev page" onClick={() => this.prevPageChange(currentDisplayPageNumber)} /></div>);
        }
        if (currentDisplayPageNumber * 6 + 6 < chartsCount) {
            pagenext = (<div className='chart-pagenext'><img src={pagenextImg} alt="next page" onClick={() => this.nextPageChange(currentDisplayPageNumber)} /></div>);
        } else if (chartsCount % 6 > 0) {

            // 余ったスペースは透明なダミーチャートで埋める
            for (let i = 0; i < 6 - chartsCount % 6; i++) {
                chartList.push({
                    "name": "",
                    "color": 0,
                    "content": "",
                    "newChart": false,
                    "unvisible": true
                });
            }

        }
        displayCharts = chartList.slice(currentDisplayPageNumber * 6, currentDisplayPageNumber * 6 + 6);

        // モーダル(子ウィンドウ)関連のレンダリング
        let modal: any;
        // モーダル：新規作成ページ
        if (this.state.isChartCreate) {
            modal = this.modal_newChart(this.state.currentColor);
        }
        // モーダル：チャート情報の編集
        if (this.state.isChartEdit) {
            modal = this.modal_editChart(this.state.currentColor);
        }

        // 最終レンダリング
        return (
            <div className='chart-page'>
            <h2 className='page-tree'>Home 》チャート一覧</h2>
            <h1 className='page-title'>チャート一覧</h1>
                <div className='chart-container'>
                {displayCharts.map((chartItem: any, index: number) => {
                    if (chartItem.newChart) {
                        // 新規作成チャートを表示
                        return (
                            <div className='chart-create'
                                onClick={() => {this.handleClickChartCreate(currentDisplayPageNumber, currentDisplayPageNumber * 6 + index)}}
                                key={'chart-create' + index}
                            >
                                <div className='chart-create-text' key={'chart-create-text' + index}>
                                    新規作成
                                </div>
                                <div className='chart-create-plus' key={'chart-create-plus' + index}>
                                    <img src={chartplusImg} alt="add chart" onClick={() => this.prevPageChange(currentDisplayPageNumber)}/>
                                </div>
                            </div>
                        );
                    } else if (chartItem.unvisible) {
                        // 透明なダミーチャートを表示
                        return (
                            <div className='chart-card' style={{visibility: "hidden"}} key={'chart-card' + index}>
                            </div>
                        );
                    } else {
                        // 既存のチャートを表示
                        return (
                            <div className='chart-card'
                                onClick={() => {this.chartThumbnailOnClick(currentDisplayPageNumber * 6 + index)}}
                                key={'chart-card' + index}
                            >
                                <div className='chart-card-tools'>
                                    <div className='chart-name' style={{backgroundColor: task_ls.themeColor[chartItem.color]}} key={'chart-name' + index}>
                                        <div className='chart-name-text' key={'chart-name-text' + index}>
                                        {this.chartNameDisplay(chartItem.name)}
                                        </div>
                                    </div>
                                    <div className='chart-edit'
                                        onClick={() => {this.handleClickChartEdit(currentDisplayPageNumber, currentDisplayPageNumber * 6 + index)}}
                                        key={'chart-edit' + index}
                                    >
                                            <img src={charteditImg} alt='edit chart' />
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

    // レンダリング：チャートの予定一覧
    render_indivisualTask() {
        let target = URLParams.get('task_class_name')
        return (
            <div>
                <h1 className='title'>{target}の計画表</h1>
            </div>
        )
    }

    // チャート予定表：初期設定
    chartThumbnailOnClick(index: number) {
        URLParams.update('task_class_name', task_ls.tasks[index].name);
        window.location.href = "/C_2212/tasks" + "?task_class_name=" + task_ls.tasks[index].name;
        //this.setState({renderReload: true});
    }

    // ページ番号：前のページへ変更
    prevPageChange(page: number) {
        this.setState({displayPageNumber: page - 1});
    };

    // ページ番号：次のページへ変更
    nextPageChange(page: number) {
        this.setState({displayPageNumber: page + 1});
    };

    // チャート新規作成：初期設定
    handleClickChartCreate(page: number, index: number) {
        this.setState({
            displayPageNumber: page,
            currentColor: 0,
            targetIndex: index,
            isChartCreate: true,
        });
    }

    // チャート新規作成：チャート作成
    handleClickChartCreateSubmit(name: string) {
        task_ls.tasks[this.state.targetIndex] =({
            "name": name,
            "color": this.state.currentColor,
            "content": "",
            "newChart": false,
            "unvisible": false 
        });
        URLParams.update('task_class_name', task_ls.tasks[this.state.targetIndex].name)
        this.setState({
            isChartCreate: false,
            targetIndex: null
        });
    }

    // チャート新規作成：キャンセル・閉じる
    handleClickChartClose() {
        this.setState({
            isChartCreate: false,
            targetIndex: null
        });
    }

    // チャート情報編集：初期設定
    handleClickChartEdit(page: number, index: number) {
        this.setState({
            displayPageNumber: page,
            currentColor: task_ls.tasks[index].color,
            targetIndex: index,
            isChartEdit: true,
            inputValue: task_ls.tasks[index].name
        });
    }

    // チャート情報編集：変更点を反映
    handleClickChartEditSubmit(name: string) {
        task_ls.tasks[this.state.targetIndex].name = name;
        task_ls.tasks[this.state.targetIndex].color = this.state.currentColor;
        URLParams.update('task_class_name', task_ls.tasks[this.state.targetIndex].name)
        this.setState({
            isChartEdit: false,
            targetIndex: null
        });
    }

    // チャート情報編集：チャートの削除
    handleClickChartDelete() {
        task_ls.tasks.splice(this.state.targetIndex, 1);
        this.setState({
            isChartEdit: false,
            targetIndex: null
        });
    }

    // チャート情報編集：キャンセル・閉じる
    handleClickChartEditClose() {
        this.setState({
            isChartEdit: false,
            targetIndex: null
        });
    }

    // 既存チャート一覧の名前が長すぎたら省略
    chartNameDisplay(name: string) {
        if (name.length >= 7) {
            return(name.substring(0, 6) + '…');
        } else {
            return(name);
        }
    }

    // モーダル：チャート新規作成
    modal_newChart(currentColor: number) {

        const colorList: any[] = [];
        
        for (let i = 0; i < task_ls.themeColor.length; i++) {
            if (currentColor === i) {
                colorList.push(
                    <div className="modal-chart-color-select"
                        onClick={() => {this.setState({currentColor: i})}}
                        style={{backgroundColor: task_ls.themeColor[i]}}
                        key={'chart-content' + i}
                    >
                    &nbsp;</div>
                );
            } else {
                colorList.push(
                    <div className="modal-chart-color-unselect"
                        onClick={() => {this.setState({currentColor: i})}}
                        style={{backgroundColor: task_ls.themeColor[i]}}
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
                        チャートの新規作成
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
    modal_editChart(currentColor: number) {
        
        const colorList: any[] = [];
 
        for (let i = 0; i < task_ls.themeColor.length; i++) {
            if (currentColor === i) {
                colorList.push(
                    <div className="modal-chart-color-select"
                        onClick={() => {this.setState({currentColor: i})}}
                        style={{backgroundColor: task_ls.themeColor[i]}}
                        key={'chart-content' + i}
                    >
                    &nbsp;</div>
                );
            } else {
                colorList.push(
                    <div className="modal-chart-color-unselect"
                        onClick={() => {this.setState({currentColor: i})}}
                        style={{backgroundColor: task_ls.themeColor[i]}}
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
                        チャート情報の変更
                    </div>
                    <form onSubmit={() => {this.handleClickChartEditSubmit(this.state.inputValue)}}>
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
                            変更する
                        </button>
                        <button className='modal-delete-btn' onClick={() => {this.handleClickChartDelete()}}>
                            削除する
                        </button>
                        <button className='modal-close-btn' onClick={() => {this.handleClickChartEditClose()}}>
                            もどる
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Tasks;