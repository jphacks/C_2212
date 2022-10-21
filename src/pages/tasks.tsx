import React from "react";

// CSSをインポート
import "./tasks.css";

//  画像ファイルをインポート
import pageprevImg from '../images/pageprev.png';
import pagenextImg from '../images/pagenext.png';
import chartplusImg from '../images/chartplus.png';
import charteditImg from '../images/chartedit.png';

// ローカルストレージをインポート
import { LocalStorageManager, TaskGroups } from "../lib/localstorage/manager";

// Reack Hookをインポート
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const lsmanager = new LocalStorageManager()


const Tasks: React.FC = () => {

    const themeColor = [
        "#ff2442",
        "#ffb01a",
        "#3db2ff",
        "#2994b2"
    ]
    // ページ遷移
    const navigate = useNavigate()
    // useState
    const [taskData, setTaskData] = useState<TaskGroups>(lsmanager.getData());
    const [currentDisplayPageNumber, setCurrentDisplayPageNumber] = useState<number>(0);
    const [currentColor, setCurrentColor] = useState<number>(0);
    const [targetIndex, setTargetIndex] = useState<number>(-1);
    const [isChartCreate, setIsChartCreate] = useState<Boolean>(false);
    const [isChartEdit, setIsChartEdit] = useState<Boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    
    // チャート新規作成：初期設定
    const handleClickChartCreate = (page: number, index: number) => {
        setCurrentDisplayPageNumber(page);
        setCurrentColor(0);
        setTargetIndex(index);
        setIsChartCreate(true);
    }

    // チャート情報編集：初期設定
    const handleClickChartEdit = (page: number, index: number) => {
        setCurrentDisplayPageNumber(page);
        setCurrentColor(taskData.task_groups[index].color)
        setTargetIndex(index);
        setIsChartEdit(true);
        setInputValue(taskData.task_groups[index].task_group_name)
    }

    // チャート名表示方法
    const chartNameDisplay = (name: string) => {
        if (name.length >= 7) {
            return (name.substring(0, 6) + '…');
        } else {
            return (name);
        }
    }

    // チャートデータを読み込み
    
    const chartList = taskData.task_groups;
    const chartsCount = chartList.length;
    const chartsOnePageShow = 6; // １ページに表示するチャートの個数

    // チャートリストの最後に透明なダミーチャートを挿入 (画面表示を整える)
    for (let i = 0; chartList.length % chartsOnePageShow !== 0; i++) {
        chartList.push({
            "task_group_name": "",
            "color": 0,
            "content": "",
            "newChart": false,
            "unvisible": true,
            "tasks": []
        });
    }

    // 表示するチャートを切り出し
    const displayCharts = chartList.slice(currentDisplayPageNumber * chartsOnePageShow, (currentDisplayPageNumber + 1) * chartsOnePageShow);

    // 最終レンダリング
    return (
        <div className='chart-page'>
        <h2 className='page-tree'>Home 》チャート一覧</h2>
        <h1 className='page-title'>チャート一覧</h1>
            <div className='chart-container'>
            {displayCharts.map((chartItem, index) => {
                if (chartItem.newChart) {
                    // 新規作成チャートを表示
                    return (
                        <div className='chart-create'
                                onClick={() => {handleClickChartCreate(currentDisplayPageNumber, currentDisplayPageNumber * chartsOnePageShow + index)}}
                                key={'chart-create' + index}
                        >
                            <div className='chart-create-text'>
                                新規作成
                            </div>
                            <div className='chart-create-plus'>
                                <img 
                                    src={chartplusImg} 
                                    alt="add chart" 
                                    onClick={() => setCurrentDisplayPageNumber((prev) => { return prev - 1})}
                                    />
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
                                onClick={() => {navigate(`/tasks?task_class_name=${chartItem.task_group_name}`)}}
                                key={'chart-card' + index}
                        >
                            <div className='chart-card-tools'>
                                <div className='chart-name' style={{backgroundColor: themeColor[chartItem.color]}} key={'chart-name' + index}>
                                    <div className='chart-name-text'>
                                    {chartNameDisplay(chartItem.task_group_name)}
                                    </div>
                                </div>
                                <div className='chart-edit'
                                        onClick={() => {handleClickChartEdit(currentDisplayPageNumber, currentDisplayPageNumber * chartsOnePageShow + index)}}
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
        {/* モーダル：チャート新規作成 */}
        {isChartCreate && 
            <ModalNewChart 
                currentColor={currentColor}
                inputValue={inputValue}
                setTaskData={setTaskData}
                setCurrentColor={setCurrentColor}
                setInputValue={setInputValue}
                setIsChartCreate={setIsChartCreate}
                setTargetIndex={setTargetIndex}
                 />}
        {/* モーダル：チャート情報編集 */}
        {isChartEdit && 
            <ModalEditChart 
                currentColor={currentColor}
                inputValue={inputValue}
                setTaskData={setTaskData}
                setCurrentColor={setCurrentColor}
                setInputValue={setInputValue}
                setIsChartEdit={setIsChartEdit}
                setTargetIndex={setTargetIndex} />}
        {/* 前のページボタン */}
        {currentDisplayPageNumber > 0 && 
        <div className='chart-pageprev'>
            <img 
                src={pageprevImg} 
                alt="prev page"
                onClick={() => setCurrentDisplayPageNumber(prev => prev - 1)} 
                />
            </div>}
        {/* 次のページボタン */}
        {(currentDisplayPageNumber + 1) * chartsOnePageShow < chartsCount && 
            <div className='chart-pagenext'>
            <img 
                src={pagenextImg} 
                alt="next page" 
                onClick={() => setCurrentDisplayPageNumber(prev => prev + 1)} 
                />
            </div>}
        </div>
    );
}


export default Tasks


// モーダル：チャート新規作成
export const ModalNewChart = ({

    // 引数の型宣言
    currentColor,
    inputValue,
    setTaskData,
    setCurrentColor,
    setInputValue,
    setIsChartCreate,
    setTargetIndex
}: {currentColor: number,
    inputValue: string
    setTaskData: (callback: (prev: TaskGroups) => TaskGroups) => void
    setCurrentColor: (currentColor: number) => void,
    setInputValue: (inputValue: string) => void,
    setIsChartCreate: (isChartCreate: Boolean) => void,
    setTargetIndex: (targetIndex: number) => void
}) => {

    // テーマカラー
    const themeColor = [
        "#ff2442",
        "#ffb01a",
        "#3db2ff",
        "#2994b2"
    ]

    // カラーリストを表示
    const colorList = themeColor.map((_, targetIndex) => {
        return (currentColor === targetIndex ? 
            (<div className="modal-chart-color-select"
                onClick={() => {setCurrentColor(targetIndex)}}
                style={{backgroundColor: themeColor[targetIndex]}}
                key={'chart-content' + targetIndex}
                >&nbsp;</div>) : 
            (<div className="modal-chart-color-unselect"
                onClick={() => {setCurrentColor(targetIndex)}}
                style={{backgroundColor: themeColor[targetIndex]}}
                key={'chart-content' + targetIndex}
                >&nbsp;</div>)
        )}
    )
    
    // チャート新規作成：作成完了
    const handleClickChartCreateSubmit = (name: string) => {
        setTaskData((prevState) => {
            alert(JSON.stringify({ 
                task_groups: [
                    ...prevState.task_groups,
                    {
                        task_group_name: name, 
                        color: currentColor,
                        content: "",
                        newChart: false,
                        unvisible: false,
                        tasks: []
                }]
            }))
            return { 
                task_groups: [
                    ...prevState.task_groups,
                    {
                        task_group_name: name,
                        color: currentColor,
                        content: "",
                        newChart: false,
                        unvisible: false,
                        tasks: []
                }]
            }
        })
    }

    // チャート新規作成：やめる
    const handleClickChartClose = () => {
        setIsChartCreate(false);
        setTargetIndex(-1);
    }

    // レンダリング
    return (
        <div className='modal'>
            <div className='modal-inner'>
                <div className='modal-header'></div>
                <div className='modal-introduction'>
                    チャートの新規作成
                </div>
                <form onSubmit={() => {handleClickChartCreateSubmit(inputValue)}}>
                    <div className="modal-chart-name-input">
                        <label className="modal-chart-name-label">
                            {/* inputタグでチャート名を入力 */}
                            <input
                                type="text"
                                placeholder="チャート名"
                                value={inputValue}
                                onChange={(event) => {setInputValue(event.target.value)}}
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
                    <button className='modal-close-btn' onClick={() => {handleClickChartClose()}}>
                        もどる
                    </button>
                </form>
            </div>
        </div>
    );
}


// モーダル：チャート情報編集
export const ModalEditChart = ({

    // 引数の型指定
    currentColor,
    inputValue,
    setTaskData,
    setCurrentColor,
    setInputValue,
    setIsChartEdit,
    setTargetIndex
}: {currentColor: number,
    inputValue: string
    setTaskData: (callback: (prev: TaskGroups) => TaskGroups) => void
    setCurrentColor: (currentColor: number) => void,
    setInputValue: (inputValue: string) => void,
    setIsChartEdit: (isChartCreate: Boolean) => void,
    setTargetIndex: (targetIndex: number) => void
}) => {

    // テーマカラー
    const themeColor = [
        "#ff2442",
        "#ffb01a",
        "#3db2ff",
        "#2994b2"
    ]

    // カラーリストを表示
    const colorList = themeColor.map((_, targetIndex) => {
        return (currentColor === targetIndex ? 
            (<div className="modal-chart-color-select"
                onClick={() => {setCurrentColor(targetIndex)}}
                style={{backgroundColor: themeColor[targetIndex]}}
                key={'chart-content' + targetIndex}
                >&nbsp;</div>) : 
            (<div className="modal-chart-color-unselect"
                onClick={() => {setCurrentColor(targetIndex)}}
                style={{backgroundColor: themeColor[targetIndex]}}
                key={'chart-content' + targetIndex}
                >&nbsp;</div>)
        )}
    )

    // チャート情報編集：編集完了
    const handleClickChartEditSubmit = (name: string) => {
        setTaskData((prevState) => {
            return Object.assign(prevState, {task_groups: [{
                task_group_name: name, 
                color: currentColor
            }]})
        })
        setIsChartEdit(false);
        setTargetIndex(-1);
    }

    // チャート情報編集：削除する
    const handleClickChartDelete = () => {
        // TODO: タスクの削除機能を作る
        setIsChartEdit(false);
        setTargetIndex(-1);
    }

    const handleClickChartEditClose = () => {
        setIsChartEdit(false);
        setTargetIndex(-1);
    }

    // レンダリング
    return (
        <div className='modal'>
            <div className='modal-inner'>
                <div className='modal-header'></div>
                <div className='modal-introduction'>
                    チャート情報の変更
                </div>
                <form onSubmit={() => { handleClickChartEditSubmit(inputValue) }}>
                    <div className="modal-chart-name-input">
                        <label className="modal-chart-name-label">
                            {/* inputタグでチャート名を入力 */}
                            <input
                                type="text"
                                placeholder="チャート名"
                                value={inputValue}
                                onChange={(event) => { setInputValue(event.target.value) }}
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
                    <button className='modal-delete-btn' onClick={() => { handleClickChartDelete() }}>
                        削除する
                    </button>
                    <button className='modal-close-btn' onClick={() => { handleClickChartEditClose() }}>
                        もどる
                    </button>
                </form>
            </div>
        </div>
    );
}