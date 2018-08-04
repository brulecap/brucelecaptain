import pymongo
mongoclient = pymongo.MongoClient("mongodb://localhost:27017/")
pythondb = mongoclient["python"]
pythondb.drop_collection("quotes")
quotes = pythondb["quotes"]

f = open("quotes.txt", encoding='utf-8-sig')
line = 0
quote = ""
source = ""
for x in f:
	if line % 2:
		source = x.strip()
		source = source.strip('()')
		quotes.insert_one({"quote": quote, "source": source})
	else:
		quote = x.strip()
		quote = quote.strip('"')
	line += 1