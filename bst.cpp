#include <iostream>

class node {
    public:
        int data;
        node *left;
        node *right;

    node(int data) {
        this->data = data;
        this->left = NULL;
        this->right = NULL;
    }

};

node* addNode(node *root, node *toBeAdded) {
    if (root == NULL) return toBeAdded;
    if (toBeAdded->data < root->data) {
        root->left = addNode(root->left, toBeAdded);
    } else if (toBeAdded->data > root->data) {
        root->right = addNode(root->right, toBeAdded);
    }
    return toBeAdded;
}

int main() {
    node *tree = new node(10);
    node* toBeAdded = new node(2);
    node * newTree = addNode(tree, toBeAdded);
}