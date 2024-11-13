from flask import Flask, request, jsonify
import os
#from movie_recommender import *
#repository will be deployed to herokus so that algorithm can be triggered by wix.

app = Flask(__name__)

#@app.route('/', methods=['POST'])
#def home():

#    return 'test'
    #return movie_recommender() #assuming move_recommender returns a csv

    #result = {"message": "Script ran successfully!"}
    #return jsonify(result)
@app.route('/')
def home():
    return 'Welcome to the movie recommender app!'

#@app.route('/run-script', methods=['POST'])
#def run_script():
#    return 'test'


if __name__ == "__main__":
     # Get the port from the environment variable, default to 5000 if not set
    port = int(os.environ.get('PORT', 5000))

    # Bind to '0.0.0.0' to allow external access and bind to the specified port
    app.run(host='0.0.0.0', port=port)