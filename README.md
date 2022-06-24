# **LMS-JupyterHub-Plugin** 

This work is inspired by [this](https://github.com/CSSPLICE/webcatjupyterplugin) repository.


**AI Sudoku Solver**

The goal of this project is the following:
* Build a Jupyterlab plugin to send a score/grade from a given notebook to a LMS through LTI


---

### Reflection

### 1. What is JupyterHub/Lab?

# JupyterHub

JupyterHub is the best way to serve Jupyter notebook for multiple users. 
It can be used in a class of students, a corporate data science group or scientific research group. 
It is a multi-user Hub that spawns, manages, and proxies multiple instances of the single-user Jupyter notebook server.

## How does it work

JupyterHub performs the following functions:
    
*  The Hub launches a proxy
*   The proxy forwards all requests to the Hub by default
*   The Hub handles user login and spawns single-user servers on demand
*   The Hub configures the proxy to forward URL prefixes to the single-user notebook servers

### Components

Four subsystems make up JupyterHub:

*  a Hub (tornado process) that is the heart of JupyterHub
*  a configurable http proxy (node-http-proxy) that receives the requests from the client’s browser
*  multiple single-user Jupyter notebook servers (Python/IPython/tornado) that are monitored by Spawners
*  an authentication class that manages how users can access the system

Besides these central pieces, you can add optional configurations through a config.py file and manage users kernels on an admin panel. 

A simplification of the whole system can be seen in the figure below:

![Jupyterhub System](images/jhub.jpeg)


Naming Convention:

* The rows will be labelled by the letters A, B, C, D, E, F, G, H, I.
* The columns will be labelled by the numbers 1, 2, 3, 4, 5, 6, 7, 8, 9.
* The individual squares at the intersection of rows and columns will be called `boxes`. These boxes will have labels 'A1', 'A2', …, 'I9'.
* The complete rows, columns, and 3x3 squares, will be called `units`. Thus, each unit is a set of 9 boxes, and there are 27 units in total.
* For a particular box (such as 'A1'), its `peers` will be all other boxes that belong to a common unit (namely, those that belong to the same row, column, or 3x3 square).


### 2. Pipeline Description.

Two powerful techniques that are used throughout the field of AI are used:

* Constraint Propagation

In constraint propagation, two strategies are used in my code. They are `Elimination` and `Only_choice`. Iterating throw them helps optimize the solution  and provide us with an answer to the sudoku.

for the easy sudoku problem shown above, the code provides the correct solution which can be seen here:

![alt text][image2]

When using the reduction method on a harder sudoku, the following answer is given:

![alt text][image3]

The constraint propagation technique is not enough to solve it. Hence the need for the third strategy which is the `search` technique

* Search

After using a recursive search technique, the solution for the puzzle was successfully given as follows:


![alt text][image4]




