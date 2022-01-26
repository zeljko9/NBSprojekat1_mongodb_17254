from pymongo import MongoClient


class Database():
    def __init__(self, link, port) -> None:
        self.driver=MongoClient(link, port)
        self.users=self.driver['users']
        self.photos=self.driver['photos']

    def insertUser(self, user, password):
        if self.users.find({'user':user}).count()==0:
            self.users.insert_one({'user':user, 'password':password, 'asked':{}})
            return True
        else:
            return False
    
    def returnUser(self, user, password):
        if self.users.find({'user':user, 'password':password}).count()!=0:
            return True
        else:
            return False

    def insertPhoto(self, user, imgsrc):
        if self.photos.find({'src':imgsrc}).count()==0:
            self.photos.inser_one({'users':[user], 'src':imgsrc})
            return True
        else:
            return False

    def addUserPhoto(self, user, imgsrc):
        if self.photos.find({'src':imgsrc}).count()!=0 and self.photos.find({'src':imgsrc, 'users':user}).count()==0:
            self.photos.update({'src':imgsrc}, {'$push':{'users':user}})
            return True
        else:
            return False

    def returnAllPhotos(self):
        return self.photos.find({})

    def returnUserPhotos(self, user):
        if self.users.find({'user':user}).count()!=0:
            return (True, self.photos.find({'users':user}))
        else:
            return (False, None)

    def requestPhoto(self, user, imgsrc):
        if self.photos.find({'src':imgsrc}).count()!=0:
            for u in self.photos.find_one({'src':imgsrc})['users']:
                self.users.update({'user':u}, {'$push':{'asked':{'usr':user, 'img':imgsrc}}})