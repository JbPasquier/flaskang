from app import app, db
from app.models import datas
from flask import abort, jsonify, request
import datetime
import json

@app.route('/flaskang/datas', methods = ['GET'])
def get_all_datas():
    entities = datas.Datas.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/flaskang/datas/<int:id>', methods = ['GET'])
def get_datas(id):
    entity = datas.Datas.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/flaskang/datas', methods = ['POST'])
def create_datas():
    entity = datas.Datas(
        test = request.json['test']
        , title = request.json['title']
        , message = request.json['message']
        , date = datetime.datetime.strptime(request.json['date'], "%Y-%m-%d").date()
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/flaskang/datas/<int:id>', methods = ['PUT'])
def update_datas(id):
    entity = datas.Datas.query.get(id)
    if not entity:
        abort(404)
    entity = datas.Datas(
        test = request.json['test'],
        title = request.json['title'],
        message = request.json['message'],
        date = datetime.datetime.strptime(request.json['date'], "%Y-%m-%d").date(),
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/flaskang/datas/<int:id>', methods = ['DELETE'])
def delete_datas(id):
    entity = datas.Datas.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
