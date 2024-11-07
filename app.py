from flask import Flask, request, jsonify

#repository will be deployed to herokus so that algorithm can be triggered by wix.

app = Flask(__name__)

@app.route('/run-script', methods=['POST'])
def run_script():

   #doesn't do anything yet

    result = {"message": "Script ran successfully!"}
    return jsonify(result)

if __name__ == "__main__":
    app.run()