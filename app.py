from flask import Flask, request, jsonify

#repository will be deployed to herokus o that algorithm can be run remotely through wix.

app = Flask(__name__)

@app.route('/run-script', methods=['POST'])
def run_script():

    result = {"message": "Script ran successfully!"}
    return jsonify(result)

if __name__ == "__main__":
    app.run()