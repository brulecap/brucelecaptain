# app brucelecaptain models.py
from mongoengine import *

class Quotes(Document):
	quote = StringField()
	source = StringField()