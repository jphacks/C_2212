import React from "react";

class URLParams extends React.Component {

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

export default URLParams;