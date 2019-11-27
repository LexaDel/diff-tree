import { STATE } from "../constants/Constants";

export const getContentFromFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const msgDiv = document.getElementById("file-status-msg");
            msgDiv.innerText = `Файл: ${file.name} загружен`;
            resolve(event.target.result);
        }
        reader.onerror = (event) => {
            reject(event.target.error.code);
        }
        reader.readAsText(file);
    });
}

export const getDataFromContent = data => {
    if (data.length) {
        const regexp = new RegExp(/(.*[^\s])/,"gi");
        return data.match(regexp).map(value => {
            const [id, name, parentid] = value.split(",");
            return { id, name, parentid }
        });
    }
    return false;
}

export const createTreeStore = store => {
    const nodeMap = new Map();
    let result;
    store.forEach(item => {
        const newItem = {
            children: [],
            name: "",
            comment: "",
            state: STATE.UNCHANGED,
            ...item
        };
        nodeMap.set(newItem.id, newItem);
        const parentItem = nodeMap.get(newItem.parentid);
        if(parentItem) {
            parentItem.children.push(newItem);
        } else {
            result = newItem;
        }
    });

    sortTree(result.children);
    return result;
}

export const sortTree = tree => {
    if (tree.length > 1) {
        tree.sort((a,b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            const hasChildrenA = a.children.length > 0;
            const hasChildrenB = b.children.length > 0;
            if (hasChildrenA === hasChildrenB) {
                return (nameA > nameB) ? 1 : (nameB > nameA) ? -1 : 0;
            } else {
                return (hasChildrenA < hasChildrenB) ? 1 : -1;
            }
        });
    }
    tree.forEach(item => item.children.length && sortTree(item.children));    
}

export const compareTree = (newTree, oldTree, diffTree) => {
    newTree.forEach(itemNewTree => {
        const diffItem = {
            name: itemNewTree.name,
            children: [],
            state: STATE.UNCHANGED,
            comment: ""
        };
        const [oldTreeFilter] = oldTree.filter(itemOldTree => itemNewTree.name === itemOldTree.name);
        if (oldTreeFilter) {
            compareTree(itemNewTree.children, oldTreeFilter.children, diffItem.children);
        } else {
            diffItem.state = STATE.NEW;
            diffItem.children = itemNewTree.children;
        }
        diffTree.push(diffItem);
    });

    oldTree.forEach(itemOldTree => {
        const diffItem = {
            name: itemOldTree.name,
            children: [],
            state: STATE.UNCHANGED,
            comment: ""
        };
        const [newTreeFilter] = newTree.filter(itemNewTree => itemNewTree.name === itemOldTree.name);
        if (newTreeFilter) {
            compareTree(newTreeFilter.children, itemOldTree.children, diffItem.children);
        } else {
            diffItem.state = STATE.DELETE;
            diffItem.children = itemOldTree.children;
            diffTree.push(diffItem);
        }
    });
}