// 打开数据库
let db;

const request = indexedDB.open("chat_room", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    if (!db.objectStoreNames.contains("message")) {
        db.createObjectStore("message", { autoIncrement: true });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
};

request.onerror = function (event) {
    console.error("数据库创建失败", event.target.error);
};

export const addData = (data) => {
    const transaction = db.transaction("message", "readwrite");
    const store = transaction.objectStore("message");

    const addRequest = store.add(data);

    addRequest.onsuccess = function (event) {};
    addRequest.onerror = function (event) {
        console.error("数据添加失败", event.target.error);
    };
};

export const getData = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("message", "readonly");
        const store = transaction.objectStore("message");

        const getRequest = store.getAll();

        getRequest.onsuccess = function (event) {
            resolve(event.target.result); // 返回获取到的数据
        };

        getRequest.onerror = function (event) {
            console.error("数据获取失败", event.target.error);
            reject(event.target.error); // 处理错误
        };
    });
};

// 监听浏览器关闭或标签页关闭事件
window.addEventListener("beforeunload", (event) => {
    deleteSystemData();
});

const deleteSystemData = () => {
    const transaction = db.transaction("message", "readwrite");
    const store = transaction.objectStore("message");

    // 使用索引查询数据，假设type是一个字段
    const index = store.index("type");
    const request = index.openCursor(IDBKeyRange.only("system"));

    request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            cursor.delete();
            cursor.continue();
        }
    };

    request.onerror = function (event) {
        console.error("删除数据失败", event.target.error);
    };
};
