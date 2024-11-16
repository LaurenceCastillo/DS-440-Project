from flask import Flask, request, Response, jsonify
import os
import subprocess

#from movie_recommender import *

app = Flask(__name__)

#@app.route('/', methods=['POST'])
#def home():

#    return 'test'
    #return movie_recommender() #assuming move_recommender returns a csv

    #result = {"message": "Script ran successfully!"}
    #return jsonify(result)


#this part works    
@app.route('/')
def home():
    return 'Welcome to the movie recommender app!'


#@app.route('/run-script', methods=['POST'])
def run_script():
    data = request.get_json()
    user_id = data.get("userId")

    if not user_id:
        return jsonify({"error": "user ID is required}"}), 400
    
    script_path = os.path.join(os.path.dirname(__file__), 'your_script.py')

    try:
        result = subprocess.run(['python3', script_path, user_id], capture_output=True, text=True)
        
        # Capture the output and error (if any) from the script
        script_output = result.stdout
        script_error = result.stderr
        
        if result.returncode != 0:
            return jsonify({"error": "Script failed", "details": script_error}), 500

        return jsonify({"message": "Script ran successfully", "output": script_output})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-csv', methods = ['GET']) #Send csv from app to Wix
def get_csv():
    with open('cbf.csv', 'r') as csv_file:
        csv_data = csv_file.read()
        
    return Response(csv_data, mimetype='text/csv',headers={'Conent-Disposition':'attachment;filename=data.csv'})

@app.route('/upload-csv', methods = ['POST']) #Send csv from Wix to app
def upload_csv():
    data = request.get_json()
    csv_content = data.get('csvContent')
    csv_path = os.path.join(os.path.dirname(__file__), 'User_Preferences.csv')

    with open(csv_path, "w") as csv_file:
        csv_file.write(csv_content)

    return jsonify({"message": "CSV received and saved successfully", "csv_path": csv_path})

#@app.route('/receive-user-id', method = ['POST']) #Send user id from Wix to app
#def 


if __name__ == "__main__":
     # Get the port from the environment variable, default to 5000 if not set
    port = int(os.environ.get('PORT', 5000))

    # Bind to '0.0.0.0' to allow external access and bind to the specified port
    app.run(host='0.0.0.0', port=port)