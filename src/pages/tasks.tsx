import React from "react";

// CSSをインポート
import "./tasks.css";

//  画像ファイルをインポート
import pageprevImg from '../images/pageprev.png';
import pagenextImg from '../images/pagenext.png';
import chartplusImg from '../images/chartplus.png';
import charteditImg from '../images/chartedit.png';

// ローカルストレージをインポート
import { localStorageManager, LocalStorageManager, TaskGroups } from "../lib/localstorage/manager";

// Reack Hookをインポート
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Diagram from "./diagram";

const lsmanager = new LocalStorageManager()

const Tasks: React.FC = () => {

    const [parms] = useSearchParams();
    const target = parms.get('task_class_name');
    // if (!target) {
    //     return (
    //         <Diagram />
    //     )
    // }

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
    const chartsList = taskData.task_groups.concat();   // チャートリストの値渡し
    const chartsOnePageShow = 6;                        // １ページに表示するチャートの個数
    
    // チャートリストの前半に既存のチャートを挿入
    const displayCharts = chartsList.slice(currentDisplayPageNumber * chartsOnePageShow, (currentDisplayPageNumber + 1) * chartsOnePageShow);
    const formerList : any = []; // 前半部分専用のリスト

    for (let i = 0; i < displayCharts.length; i++) {
        formerList.push(
            <div className='chart-card'
                onClick={() => {navigate(`/tasks?task_class_name=${displayCharts[i].task_group_name}`)}}
                key={'chart-card' + i}
            >
                <div className='chart-card-tools'>
                    <div className='chart-name' style={{backgroundColor: themeColor[displayCharts[i].color]}} key={'chart-name' + i}>
                        <div className='chart-name-text'>
                        {chartNameDisplay(displayCharts[i].task_group_name)}
                        </div>
                    </div>
                    <div className='chart-edit'
                            onClick={(event) => {
                                event.stopPropagation();
                                handleClickChartEdit(currentDisplayPageNumber, currentDisplayPageNumber * chartsOnePageShow + i)
                            }}
                            key={'chart-edit' + i}
                    >
                            <img src={charteditImg} alt='edit chart' />
                    </div>
                </div>
                <div className='chart-content' key={'chart-content' + i}>
                    {displayCharts[i].content}
                </div>
            </div>
        );
    }

    // チャートリストの最後に新規作成＆透明なダミーチャートを挿入 (画面表示を整える)
    const latterList : any = []; // 後半部分専用のリスト


    for (let i = 0; (formerList.length + latterList.length) % chartsOnePageShow > 0 || (formerList.length + latterList.length) === 0; i++) {
        if (i === 0) {
            latterList.push(
                // 新規作成のチャート
                <div className='chart-create'
                    onClick={() => {handleClickChartCreate(currentDisplayPageNumber, currentDisplayPageNumber * chartsOnePageShow + formerList.length)}}
                    key={'chart-create'}
                >
                    <div className='chart-create-text'>
                        新規作成
                    </div>
                    <div className='chart-create-plus'>
                        <img src={chartplusImg} alt="add chart"/>
                    </div>
                </div>
            );        
        } else {
            // 透明なダミーチャート
            latterList.push(
                <div className='chart-card' style={{visibility: "hidden"}} key={'chart-unvisible' + i}>
                </div>
            );
        }
    }

    // 最終レンダリング
    return (
        <>
            <Navbar />
            {target && <Diagram task_group_name={target} />}
            {!target && 
            <div className='chart-page'>
                <h2 className='page-tree'>Home 》チャート一覧</h2>
                <h1 className='page-title'>チャート一覧</h1>
                <div className='chart-container'>
                    {formerList}
                    {latterList}
                </div>
                {/* モーダル：チャート新規作成 */}
                {isChartCreate && 
                    <ModalNewChart 
                        currentColor={currentColor}
                        inputValue={inputValue}
                        targetIndex={targetIndex}
                        taskData={taskData}
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
                        targetIndex={targetIndex}
                        taskData={taskData}
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
                {(currentDisplayPageNumber + 1) * chartsOnePageShow < (chartsList.length + 1) && 
                    <div className='chart-pagenext'>
                        <img 
                            src={pagenextImg} 
                            alt="next page" 
                            onClick={() => setCurrentDisplayPageNumber(prev => prev + 1)} 
                            />
                    </div>}
            </div>}
        </>
    );
}


export default Tasks


// モーダル：チャート新規作成
export const ModalNewChart = ({

    // 引数の型宣言
    currentColor,
    inputValue,
    targetIndex,
    taskData,
    setTaskData,
    setCurrentColor,
    setInputValue,
    setIsChartCreate,
    setTargetIndex
}: {currentColor: number,
    inputValue: string,
    targetIndex: number,
    taskData: any,
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
            prevState["task_groups"][targetIndex] = ({
                task_group_name: name,
                color: currentColor,
                content: "",
                tasks: []
            });
            // alert(JSON.stringify(prevState["task_groups"]));
            lsmanager.update(prevState);
            console.log(lsmanager.getData())
            return prevState;
        })
        setIsChartCreate(false);
        setTargetIndex(-1);
        setInputValue("");
    }

    // チャート新規作成：やめる
    const handleClickChartClose = () => {
        setIsChartCreate(false);
        setTargetIndex(-1);
        setInputValue("");
    }

    // エラーメッセージを表示
    let errorStatus = false;
    const errorMessage = () => {
        for (let i = 0; i < taskData.task_groups.length; i++) {
            if (inputValue === taskData.task_groups[i]['task_group_name']) {
                errorStatus = true;
                return(
                    <div className="modal-chart-name-input-error">
                    既に存在するチャート名です
                    </div>
                );                
            }
        }
        if (inputValue === '') {
            errorStatus = true;
            return(
                <div className="modal-chart-name-input-error">
                チャート名を入力してください
                </div>
            );
        } else {
            errorStatus = false;
            return(
                <div className="modal-chart-name-input-error">
                &nbsp;
                </div>
            );
        }
    }

    // レンダリング
    return (
        <div className='modal'>
            <div className='modal-inner'>
                <div className='modal-header'></div>
                <div className='modal-introduction'>
                    チャートの新規作成
                </div>
                <div className="modal-form">
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
                        { errorMessage() }
                    </div>
                    <div className="modal-chart-color-input">
                        テーマカラー
                        <div className="modal-chart-color-labels">
                        {colorList}
                        </div>
                    </div>
                    <button
                        className='modal-create-btn'
                        onClick={() => {
                            if (!errorStatus) {
                            handleClickChartCreateSubmit(inputValue)
                            }
                        }}>
                        新規作成
                    </button>
                    <button className='modal-close-btn' onClick={() => {handleClickChartClose()}}>
                        もどる
                    </button>
                </div>
            </div>
        </div>
    );
}


// モーダル：チャート情報編集
export const ModalEditChart = ({

    // 引数の型指定
    currentColor,
    inputValue,
    targetIndex,
    taskData,
    setTaskData,
    setCurrentColor,
    setInputValue,
    setIsChartEdit,
    setTargetIndex
}: {currentColor: number,
    inputValue: string,
    targetIndex: number,
    taskData: any,
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
            prevState["task_groups"].map((value, index) => {
                if (index === targetIndex) {
                    value['task_group_name'] = name;
                    value['color'] = currentColor;
                }
                return(value);
            });
            // alert(JSON.stringify(prevState["task_groups"]));
            lsmanager.update(prevState);
            console.log(lsmanager.getData())
            return prevState;
        })
        setIsChartEdit(false);
        setTargetIndex(-1);
        setInputValue("");
    }

    // チャート情報編集：削除する
    const handleClickChartDelete = (task_group_name: string) => {
        console.log(task_group_name)
        setTaskData((prevState) => {
            prevState.task_groups = prevState.task_groups.filter((task_group) => task_group.task_group_name !== task_group_name);
            console.log(prevState)
            localStorageManager.update(prevState);
            return prevState;
        })
        setIsChartEdit(false);
        setTargetIndex(-1);
        setInputValue("");
    }

    const handleClickChartEditClose = () => {
        setIsChartEdit(false);
        setTargetIndex(-1);
        setInputValue("");
    }

    // エラーメッセージを表示
    let errorStatus = false;
    const errorMessage = () => {
        for (let i = 0; i < taskData.task_groups.length; i++) {
            if (i !== targetIndex && inputValue === taskData.task_groups[i]['task_group_name']) {
                errorStatus = true;
                return(
                    <div className="modal-chart-name-input-error">
                    既に存在するチャート名です
                    </div>
                );                
            }
        }
        if (inputValue === '') {
            errorStatus = true;
            return(
                <div className="modal-chart-name-input-error">
                チャート名を入力してください
                </div>
            );
        } else {
            errorStatus = false;
            return(
                <div className="modal-chart-name-input-error">
                &nbsp;
                </div>
            );
        }
    }

    // レンダリング
    return (
        <div className='modal'>
            <div className='modal-inner'>
                <div className='modal-header'></div>
                <div className='modal-introduction'>
                    チャート情報の変更
                </div>
                <div className="modal-form">
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
                        { errorMessage() }
                    </div>
                    <div className="modal-chart-color-input">
                        テーマカラー
                        <div className="modal-chart-color-labels">
                            {colorList}
                        </div>
                    </div>
                    <button
                        className='modal-create-btn'
                        onClick={() => {
                            if (!errorStatus) {
                            handleClickChartEditSubmit(inputValue)
                            }
                        }}>
                        変更する
                    </button>
                    <button className='modal-delete-btn' onClick={() => { handleClickChartDelete(inputValue) }}>
                        削除する
                    </button>
                    <button className='modal-close-btn' onClick={() => { handleClickChartEditClose() }}>
                        もどる
                    </button>
                </div>
            </div>
        </div>
    );
}

