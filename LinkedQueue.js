

/*  Syntax: let n = new Node()
    Purpose: hold a peice of data and a link to another 
        piece of data.
 */
const Node = (function() {
    class Node {
        constructor(data, next) {
            this.data = data;
            this.next = next;
        }
    }

    return Node;
})();


/*  Syntax: let queue = new LinkedQueue()
    Purpose: implement a queue data structure using a 
        linked list.
    
    Maintenance Note: NEVER give users the power to set links
        in the list themselves.
 */
const LinkedQueue = (function() {
    // this will store each instance's private variables...
    const privateProps = new WeakMap();

    class LinkedQueue {

        /* Constructor for a Linked Queue. Every value passed
            to the constructor will then get enqueued into the
            queue in the order the values were given.*/
        constructor(...values) {
            privateProps.set(this, {
                "_size": 0,
                "_front": null,
                "_last": null
            });

            for (let value of values) {
                this.enqueue(value);
            }
        }

        get size() { return privateProps.get(this)._size; }
        isEmpty() {return this.size === 0; }

        /* This returns a string representation of the Linked Queue
            instance. Meant to be used in debugging...
         */
        toString() {
            let arr = [];
            let index = 0;
            for (let cur = privateProps.get(this)._front; 
                        cur instanceof Node; cur = cur.next) {
                arr.push(`${index++}: ${cur.data}`);
            }
            let str = arr.join(", ");
            return str + `\nsize: ${this.size}`;
        }

        /* This adds a value to the end of the linked list. 
            It also returns the instance when done to make the 
            method chainable.
         */
        enqueue(value) {
            let newEnd = new Node(value, null);

            let temp = privateProps.get(this); // hopefully an alias.
            if (this.isEmpty()) {
                temp._front = newEnd;
                temp._last = newEnd;
            }
            else {
                temp._last.next = newEnd;
                temp._last = newEnd;
            }
            temp._size++;
            return this;
        }

        /* This removes a value from the front of the linked list. 
            Then it returns the value that was removed.
         */
        dequeue() {
            if (this.isEmpty()) {
                throw new Error("Can't dequeue an empty queue.");
            }

            let temp = privateProps.get(this); //hopefully an alias
            temp._size--;
            let toReturn = temp._front.data;
            temp._front = temp._front.next;
            
            // Garbage collector, please collect the old temp._front node.
            // I'm afraid to trust you...
            return toReturn;
        }

        /* This returns a value from the front of the linked list without
            removing it from the linked list.
         */
        peek() {
            if (this.isEmpty()) {
                throw new Error("Can't peek at an empty queue.");
            }

            return privateProps.get(this)._front.data;
        }
    }

    return LinkedQueue;
})();

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// tests


// Run this in dev tools and see if it works as expected ...
let q = new LinkedQueue();
let i = 0;
let j = 0;
let interval = setInterval( 
    () => {
        q.enqueue(Math.random() * 100);
        i++;

        if (i === 1000) {
            let sum = 0;
            while (!q.isEmpty()) {
                sum += q.dequeue();
            }
            console.log(sum);
            i = 0;
            j++;
        }

        if (j === 10) {
            clearInterval(interval);
        }
    }, 5)
