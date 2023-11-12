from flask import Flask,jsonify,request
from flask_cors import CORS
from summarize import generate_summary
app= Flask(__name__)
CORS(app)
response=""
@app.route('/api',methods=['POST','GET'])
def putData():
    global response
    if request.method=='POST':
        response=request.get_json()
    return jsonify(generate_summary(response['msg'],int(response['len'])))
    
if __name__=="__main__":
    app.run(debug=True)