#include <stdio.h>
#include <stdlib.h>

struct Tree {
    struct Tree *right;
    struct Tree *left;
    int value;
};

struct Tree* insertValue(struct Tree *T, int value){
    if(T == NULL){
        struct Tree *new_node = (struct Tree*)malloc(sizeof(struct Tree));
        new_node->value = value;
        new_node->right = NULL;
        new_node->left = NULL;
        return new_node;
    }else{
        if(value < T->value){
            T->left = insertValue(T->left,value);
        }else{
            T->right = insertValue(T->right,value);
        }
        return T;
    }
}

void printTree(struct Tree *T){
    if(T != NULL){
        printTree(T->left);
        printf("%d ",T->value);
        printTree(T->right);
    }
}

int main(){
    int n,value;
    scanf("%d",&n);

    struct Tree *T = (struct Tree*)malloc(sizeof(struct Tree));
    T->right = NULL;
    T->left = NULL;
    scanf("%d",&T->value);

    for(int i = 0; i < n-1; i++){
        scanf("%d",&value);
        insertValue(T,value);
    }

    printTree(T);

    int *Queue = (int*)malloc(sizeof(int)*n);

    return 0;
}
