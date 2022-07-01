"""
Created on Tue May 24 00:31:42 2022

@author: RanjiRaj
@co-author: Mohamed Elhayany
"""


from testbook import testbook
from flask import Flask, jsonify


app = Flask(__name__)

"""
    TASK 1: SGD
"""

def test_a(loc):
    score_a = 0.0
    
    try:
    		with testbook(loc, execute=[1,3,5,7]) as tb1:
    			if tb1.cell_output_text(7) == 'Test passed.':
    		 		score_a += 1
    		 		print("Task 1 Passed. \u2705")
    except Exception:
    		
    		print("Task 1 failed. \u274c")
    		return score_a
    return score_a


"""
    TASK 2: Fully Connected Layer
"""

def test_b(loc):
    score_b = 0.0
    
    try:
    		with testbook(loc, execute=[1,3,9,11,13]) as tb2:
    			if tb2.cell_output_text(13) == 'Test passed.':
    		 		score_b += 1
    		 		print("Task 2 Passed. \u2705")
    except Exception:
    		
    		print("Task 2 failed. \u274c")
    		return score_b
    
    return score_b


"""
    TASK 3: Mean Squared Error
"""

def test_c(loc):
    score_c = 0.0
    
    try:
    		with testbook(loc, execute=[1,3,11,15,17]) as tb3:
    			if tb3.cell_output_text(17) == 'Test passed.':
    		 		score_c += 1
    		 		print("Task 3 Passed. \u2705")
    except Exception:
    		
    		print("Task 3 failed. \u274c")
    		return score_c
    
    return score_c


"""
    TASK 4: ReLU (Rectified Linear Unit)
"""

def test_d(loc):
    score_d = 0.0
    
    try:
    		with testbook(loc, execute=[1,3,19,21]) as tb4:
    			if tb4.cell_output_text(21) == 'Test passed.':
    		 		score_d += 1
    		 		print("Task 4 Passed. \u2705")
    except Exception:
    		
    		print("Task 4 failed. \u274c")
    		return score_d
    
    return score_d



for i in range(1):
    print("\n")


@app.route('/fetch_score', methods=['GET'])
def get_score(loc="./ssnn_with_autograding_script.ipynb"):
    
    print("Testing your solution for Task 1: SGD")
    points_a = test_a(loc)

    print("*"*60)
    print("Testing your solution for Task 2: Fully Connected Layer")
    points_b = test_b(loc)

    print("*"*60)
    print("Testing your solution for Task 3: Mean Squared Error")
    points_c = test_c(loc)

    print("*"*60)
    print("Testing your solution for Task 4: ReLU (Rectified Linear Unit)")
    points_d = test_d(loc)
    
    return {"score": points_a + points_b + points_c + points_d}

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    #get_score('./ssnn_with_autograding_script.ipynb')

#print(f"Your score: {points_a + points_b + points_c + points_d} / 4.0")
