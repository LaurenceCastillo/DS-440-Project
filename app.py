from flask import Flask, request, Response
import os

#from movie_recommender import *

app = Flask(__name__)

#@app.route('/', methods=['POST'])
#def home():

#    return 'test'
    #return movie_recommender() #assuming move_recommender returns a csv

    #result = {"message": "Script ran successfully!"}
    #return jsonify(result)


#this part works    
#@app.route('/')
#def home():
#    return 'Welcome to the movie recommender app!'


#@app.route('/run-script', methods=['POST'])
#def run_script():
#    return 'test'

#untested
@app.route('/get-csv', methods = ['GET'])
def get_csv():
    with open('cbf.csv', 'r') as csv_file:
        csv_data = csv_file.read()
        
    return Response(csv_data, mimetype='text/csv',headers={'Conent-Disposition':'attachment;filename=data.csv'})


if __name__ == "__main__":
     # Get the port from the environment variable, default to 5000 if not set
    port = int(os.environ.get('PORT', 5000))

    # Bind to '0.0.0.0' to allow external access and bind to the specified port
    app.run(host='0.0.0.0', port=port)