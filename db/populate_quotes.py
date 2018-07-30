import pymongo
mongoclient = pymongo.MongoClient("mongodb://localhost:27017/")
pythondb = mongoclient["python"]
quotes = pythondb["quotes"]
#source = "testsource"
#quote = "testquote"
#mydict = { "quote": quote, "source": source }

#x = quotes.insert_one(mydict)

f = open("quotes.txt")
line = 0
quote = ""
source = ""
for x in f:
	if line % 2:
		source = x.strip()
		source = source.strip('()')
		quotes.insert_one({"quote": quote, "source": source})
#		print("quote:", quote, "source: ", source)
	else:
		quote = x.strip()
		quote = quote.strip('"')
	line += 1