from flask import Flask, render_template
import flask
from flask_cors import CORS
import threading
from database import Database




app=Flask(__name__)
cors = CORS(app)
db=Database('localhost',27017)

@app.route('/')
def main():
    return render_template("index.html")


@app.route('/login', methods=['POST'])
def login():
    msg=flask.request.json
    dct=dict()
    if db.returnUser(msg['username'], msg['password']):
        dct['my_photos']=db.returnUserPhotos(msg['username'])[1]
        dct['status']='ok'
        response= app.response_class(
        response=flask.json.dumps(dct))
    else:
        dct['status']='not ok'
        response= app.response_class(
        response=flask.json.dumps(dct))

    return response

@app.route('/register', methods=['POST'])
def register():
    msg=flask.request.json
    dct=dict()
    if db.insertUser(msg['username'], msg['password']):
        dct['status']='ok'
        response= app.response_class(
        response=flask.json.dumps(dct))
    else:
        dct['status']='not ok'
        response= app.response_class(
        response=flask.json.dumps(dct))
    
    return response

@app.route('/insertPhoto', methods=['POST'])
def insertPhoto():
    msg=flask.request.json
    dct=dict()
    if db.insertPhoto(msg['username'], msg['imgsrc']):
        dct['status']='ok'
        response= app.response_class(
        response=flask.json.dumps(dct))
    else:
        dct['status']='not ok'
        response= app.response_class(
        response=flask.json.dumps(dct))
    
    return response


@app.route('/askForPhoto', methods=['POST'])
def askForPhoto():
    msg=flask.request.json
    dct=dict()
    if db.requestPhoto(msg['username'], msg['imgsrc']):
        dct['status']='ok'
        response= app.response_class(
        response=flask.json.dumps(dct))
    else:
        dct['status']='not ok'
        response= app.response_class(
        response=flask.json.dumps(dct))

    return response

@app.route('/allPhotos', methods=['POST'])
def allPhotos():
    imgs=db.returnAllPhotos()
    response= app.response_class(
    response=flask.json.dumps(imgs))
    return response

if __name__ == "__main__":
    threading.Thread(target=lambda: app.run( debug=True, use_reloader=False)).start()