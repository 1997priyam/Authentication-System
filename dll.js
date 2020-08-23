function createNode(data) {
    let node = {
        data: data,
        next: undefined,
        previous: undefined
    }
    return node;
}

function insertNode(head, node) {
    if(head == undefined) return node;
    let currentNode;
    while(head != undefined) {
        currentNode = head;
        head = head.next;
    }
    currentNode.next = node;
    node.previous = currentNode;
}

function main() {
    let head = createNode(10);
    insertNode(head, createNode(20));
    insertNode(head, createNode(30));
    insertNode(head, createNode(40));
    insertNode(head, createNode(50));

    while(head != undefined) {
        console.log(head.data);
        head = head.next;
    }
}

main()