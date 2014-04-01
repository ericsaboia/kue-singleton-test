Kue Singleton Test
==================
This is a simple project to benchmark the [original kue](https://github.com/LearnBoost/kue) implementation (which create a redis connection for each handler attached), against my [fork](https://github.com/ericsaboia/kue) (which use the same "jobs" connection to all handlers).

## Installation

    $ npm install
    
## Populate Jobs

    $ redis-cli FLUSHALL
    $ node enqueue.js
    
## Run worker with original kue

    $ node worker_original.js
    

![Original](http://i.imgur.com/YxUyaWJ.png)
    
## Run worker with singleton kue

    $ node worker_singleton.js

![Singleton](http://i.imgur.com/sU0lDTM.png)
