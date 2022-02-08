from pymongo import MongoClient


class Database():
    def __init__(self, link, port) -> None:
        self.driver=MongoClient(link, port)
        mydb=self.driver['database']
        collist = mydb.list_collection_names()
        if 'users' not in collist or 'photos' not in collist:
            self.users=mydb.create_collection(name='users')
            self.users=mydb.create_collection(name='photos')
        else:
            self.users=mydb['users']
            self.photos=mydb['photos']
        collist = mydb.list_collection_names()
        print(collist)

    def insertUser(self, user, password):
        if len(list(self.users.find({'user':user})))==0:
            self.users.insert_one({'user':user, 'password':password, 'asked':{}})
            return True
        else:
            return False
    
    def returnUser(self, user, password):
        if len(list(self.users.find({'user':user, 'password':password})))!=0:
            return True
        else:
            return False

    def insertPhoto(self, user, imgsrc):
        if len(list(self.photos.find({'src':imgsrc})))==0:
            self.photos.inser_one({'users':[user], 'src':imgsrc})
            return True
        else:
            return False

    def addUserPhoto(self, user, imgsrc):
        if len(list(self.photos.find({'src':imgsrc}).count()!=0 and self.photos.find({'src':imgsrc, 'users':user})))==0:
            self.photos.update({'src':imgsrc}, {'$push':{'users':user}})
            return True
        else:
            return False

    def returnAllPhotos(self):
        pom=self.photos.find({})
        imgs=list()
        for p in pom:
            imgs.append(p['src'])
        return imgs

    def returnUserPhotos(self, user):
        if len(list(self.users.find({'user':user})))!=0:
            imgs=list()
            for p in self.photos.find({'users':user}):
                imgs.append(p['src'])
            return (True, imgs)
        else:
            return (False, None)

    def requestPhoto(self, user, imgsrc):
        if len(list(self.photos.find({'src':imgsrc})))!=0:
            for u in self.photos.find_one({'src':imgsrc})['users']:
                self.users.update({'user':u}, {'$push':{'asked':{'usr':user, 'img':imgsrc}}})
            return True
        else:
            return False