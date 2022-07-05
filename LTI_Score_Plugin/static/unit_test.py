"""
Created on Tue May 24 00:31:42 2022

@author: Mohamed Elhayany
@author: RanjiRaj
"""


from testbook import testbook
from flask import Flask, jsonify


app = Flask(__name__)


def get_point(loc, task_number=1, cells = []):
    '''
    Checks weather a task is passed or not and returns a 0 or 1 points back
    '''
    
    point=0.0
    try:
        with testbook(loc, execute=cells) as tb1:
            if tb1.cell_output_text(cells[-1]) == 'Test passed.':
                point+=1
                print(f"Task {task_number} Passed. \u2705")
    except Exception:
        print(f"Task {task_number} failed. \u274c")
        return point
    return point



@app.route('/fetch_score', methods=['GET'])
def get_score(loc="./ssnn_with_autograding_script.ipynb"):
                                          
    for i in range(1):                                  
        print("\n")
    
    print("Testing your solution for Task 1: SGD")
    points_a = get_point(loc, task_number=1, cells = [1,3,5,7])

    print("*"*60)
    print("Testing your solution for Task 2: Fully Connected Layer")
    points_b = get_point(loc, task_number=2, cells = [1,3,9,11,13])

    print("*"*60)
    print("Testing your solution for Task 3: Mean Squared Error")
    points_c = get_point(loc, task_number=3, cells = [1,3,11,15,17])

    print("*"*60)
    print("Testing your solution for Task 4: ReLU (Rectified Linear Unit)")
    points_d = get_point(loc, task_number=4, cells = [1,3,19,21])
    
    return jsonify("score": points_a + points_b + points_c + points_d)

'''
import sys
# total arguments
n = len(sys.argv)

print("*"*85)
print("Note: Please make sure you entered the correct notebook name for a successful grading")
print("*"*85)
print(f"Notebook name recieved: {sys.argv[1]}")
loc = sys.argv[1]
'''

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    #print(f"Your score is: {get_score(loc)['score']} / 4.0")
