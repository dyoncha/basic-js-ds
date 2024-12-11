const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode ? this.rootNode : null;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return this;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (newNode.data === currentNode.data) {
        return this;
      }

      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      }

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      }

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;

    while (currentNode) {
      if (data === currentNode.data) {
        // no children
        if (!currentNode.left && !currentNode.right) {
          if (!parentNode) {
            this.rootNode = null; 
          } else if (parentNode.left === currentNode) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        }
        // child right
        else if (!currentNode.left) {
          if (!parentNode) {
            this.rootNode = currentNode.right;
          } else if (parentNode.left === currentNode) {
            parentNode.left = currentNode.right;
          } else {
            parentNode.right = currentNode.right;
          }
        } 
        // child left
        else if (!currentNode.right) {
          if (!parentNode) {
            this.rootNode = currentNode.left;
          } else if (parentNode.left === currentNode) {
            parentNode.left = currentNode.left;
          } else {
            parentNode.right = currentNode.left;
          }
        }
        // 2 children
        else {
          let minRightNode = currentNode.right;
          let minRightNodeParent = currentNode;

          while (minRightNode.left) {
            minRightNodeParent = minRightNode;
            minRightNode = minRightNode.left;
          }

          currentNode.data = minRightNode.data;

          if (minRightNodeParent.left === minRightNode) {
            minRightNodeParent.left = minRightNode.right;
          } else {
            minRightNodeParent.right = minRightNode.right;
          }
        }

        return this;
      }

      // looking for the node
      parentNode = currentNode;
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return this;
  }

  min() {
    if (this.rootNode === null) {
      return null;
    } 
    
    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    } 
    
    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};