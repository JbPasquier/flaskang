from app import db

class Datas(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    test = db.Column(db.String)
    
    title = db.Column(db.String)
    
    message = db.Column(db.String)
    
    date = db.Column(db.Date)
    

    def to_dict(self):
        return dict(
            test = self.test,
            title = self.title,
            message = self.message,
            date = self.date.isoformat(),
            id = self.id
        )

    def __repr__(self):
        return '<Datas %r>' % (self.id)
