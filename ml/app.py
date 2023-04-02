
import json
import pandas as pd
import numpy as np
import requests
import nltk
from nltk.corpus import wordnet
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify

app = Flask(__name__)

nltk.download('wordnet')
nltk.download('omw-1.4')

@app.route("/", methods=["POST"])
def return_timestamp():
    d = request.json

    positive = list()

    add = ["Straight", "bat", "ball", "biggie", "Cover", "OnDrive", "Square", "Forward", "stadium", "Defence", "Sweep", "Reverse",
           "FrontFoot ", "LegGlance ", "BackFoot", "SquareCut", "Pull ", "Shot", "Hook", "Uppercut", "Cut", "Helicopter ", "SwitchHit",
           "Dilscoop", "class", "bounce", "Upper", "Uppish", "Scoop ", "Inside", "Out", "Shots", "Bouncer", "Outswinger", "Inswinger",
           "ReverseSwing", "played", "LegCutter", "OffCutter", "Yorker", "Slower", "Spin", "LegBreak ", "OffBreak", "Googly ",
           "Doosra", "Topspin ", "CarromBall", "Slider", "ArmBall", "Infield", "InnerRing", "Outfield", "Catching", "Wicketkeeper",
           "Slip", "Gully", "LegSlip", "LegGully", "Sillypoint", "Sillymidoff", "Shortleg", "Sillymidon", "InnerRing", "Point", "BackwardPoint",
           "MidOff", "Cover", "MidOn", "SquareLeg", "Backward ", "SquareLeg", "MidWicket", "FineLeg", "Outfield", "ThirdMan",
           "DeepPoint", "BackwardPoint", "ExtraCover", "LongOff", "FineLeg", "LongLeg", "LongOn", "Deep", "Cover", "played", "account"
           "cricket", "hard", "sides", "man", "finishes", "one", "crucial", "Captain", "shot", "six", "four", "boundary", "line", "drive",
           "celebrate", "placement", "beauty", "fifty", "century", "perfect", "magnifcient", "world", "cup", "batting", "fielding", "bowling",
           "catch", "caught", "out", "stumped", "one", "bowled", "night", "final", "room", "taken", "edged", "wicket", "review", "DRS", "cuts", "out", "short"]

    for i in add:
        for synset in wordnet.synsets(i):
            for lemma in synset.lemmas():
                positive.append(lemma.name())

    strings = ' '.join(positive)

    l = d['messages']
    phrases = []
    data = []
    starttime = []
    for i in l:
        data.append(list(i.values()))

    for i in range(len(data)):
        phrases.append(data[i][1])
        starttime.append(data[i][5])

    def create_dataframe(matrix, tokens):
        doc_names = [f'doc_{i+1}' for i, _ in enumerate(matrix)]
        df = pd.DataFrame(data=matrix, index=doc_names, columns=tokens)
        return (df)

    ans = []
    for i in phrases:
        data = [i, strings]
        Tfidf_vect = TfidfVectorizer()
        vector_matrix = Tfidf_vect.fit_transform(data)
        tokens = Tfidf_vect.get_feature_names_out()
        create_dataframe(vector_matrix.toarray(), tokens)
        cosine_similarity_matrix = cosine_similarity(vector_matrix)
        result = create_dataframe(
            cosine_similarity_matrix, ['Phrase', 'Strings'])
        ans.append(result['Phrase'].values[1])

    stack_first = []
    stack_last = []
    for i in ans:
        if (i >= 0.00100000000000):
            index = ans.index(i)
            stack_first.append(starttime[index])

    stack_first.sort()
    result = []
    for i in stack_first:
        if (i not in result):
            result.append(i)

    values = list()
    for i in range(len(result)-1):
        if (result[i]+7 < result[i+1]):
            values.append(result[i])
            if (result[i+1] not in values):
                values.append(result[i+1])

    res = list()
    for i in range(len(result)-1):
        if (result[i]+8 < result[i+1]):
            res.append(result[i])
            if (result[i+1] not in values) and (result[i] not in values):
                res.append(result[i+1])

    data = {"keys": res}
    return jsonify(data)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
