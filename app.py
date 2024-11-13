from flask import Flask, request, jsonify
#from movie_recommender import *
#repository will be deployed to herokus so that algorithm can be triggered by wix.

app = Flask(__name__)

@app.route('/run-script', methods=['POST'])
def run_script():

    return 'test'
    #return movie_recommender() #assuming move_recommender returns a csv

    #result = {"message": "Script ran successfully!"}
    #return jsonify(result)

if __name__ == "__main__":
    app.run()