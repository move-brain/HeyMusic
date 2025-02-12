export const getCookie = () => {
    // 过期时间
    // const timestampBefore = Number(localStorage.getItem('timestampBefore'));
    // // 已过期
    // if (Date.now() >= timestampBefore) {
    //     localStorage.removeItem('timestampBefore');
    //     localStorage.removeItem('cookie');
    //     return null;
    // }

    const token = localStorage.getItem("cookie");
    return token;
};

/**
 * 将秒数转换成形如 01:42 的字符串
 */
export const convertTime = (time: number): string => {
    const minutes = (time / 60) >> 0;
    const seconds = time % 60 >> 0;
    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
};

/**
 * 将时间戳转换成形如
 * 刚刚、x 分钟前、x 小时前、x 天前、x 月前、x 年前的字符串
 */
export const convertDate = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const d = new Date(diff);
    return diff <= 60000
        ? "刚刚" // 60秒内
        : diff <= 3600000
        ? `${(diff / 60000) >> 0} 分钟前` // 60分钟内
        : diff <= 86400000
        ? `${(diff / 3600000) >> 0} 小时前` // 24小时内
        : d.getFullYear() > 1970
        ? `${d.getFullYear() - 1970} 年前`
        : d.getMonth()
        ? `${d.getMonth()} 月前`
        : `${d.getDate() - 1} 天前`;
};

/**
 * 节流， timeout 时间内多次调用，也只会执行一次函数
 */
export const throttle = (fn: Function, timeout: number) => {
    let canRun = true;
    return function (...args: any[]) {
        // 使用 function，防止丢失 this
        if (canRun) {
            canRun = false;
            // @ts-ignore
            fn.call(this, ...args);
            setTimeout(() => {
                canRun = true;
            }, timeout);
        }
    };
};

/**
 * 防抖，在最后一次调用的 timeout 时间后才执行函数
 */
// export const debounce = (fn: Function, timeout: number) => {
//     //获取setTimeout函数返回的类型
//     let timer: ReturnType<typeof setTimeout>;
//     return function (...args: any[]) {  // 使用 function，防止丢失 this
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             // @ts-ignore
//             fn.call(this, ...args);
//         }, timeout);
//     }
// }

export function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function () {
        const args = [...arguments];
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            //  @ts-ignore
            func.apply(this, args);
        }, wait);
    };
}

/**
 * 将 http 转换为 https
 */
export const replaceHttpToHttps = (url: string) =>
    url.replace(/http\:/, "https:");

export const transitionCount = (Count: number) => {
    if (Count > 100000000) {
        return (Count / 100000000).toFixed(2) + "亿";
    }
    if (Count > 10000) {
        return (Count / 10000).toFixed(2) + "万";
    }
    return Count;
};
