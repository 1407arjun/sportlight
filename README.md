# Sportlight by The Unknowns
*Next.js, Express.js, NLTK, symbl.ai*

## Inspiration - Problem Statement #3 by Experion Technologies
Publishing highlights after a sports game is a mandatory practice followed in the broadcast industry. A highlights video provides a quick snapshot of the event highlighting the interesting events in the game and thus provides the viewers an opportunity to get a quick summary of the game.
In a manual process, a video editor has to run through the entire game, identify candidate areas for the highlights and compile all the clips into a single compilation video. This can be a cumbersome process and a time-consuming. 

## What it does
The application uses AI enabled methods to automatically generate highlights data feed from an input video file. The expected output data feed contains start/end time stamps of interesting clips from the given video feed. For example, for a cricket game the clips may contain fall of wickets, exceptional fielding, batsman hitting boundaries etc. Finally, the highlights of that particular game would be displayed to the user sequentially. 

## How we plan to build it
1. We would be building a **web application**, where the user can directly upload the video to the web server built using Node.js. 
2. The video will be processed frame by frame. The processing will be convert the audio to text form by the use of **symbl.ai** using an API call.
3. The obtained texts along with the time frames will be processed by a python script consisting of technologies like **NLTK**, **wordnet**and **NLP** to carefully understand the text. 
4. Firstly, the script would pre-process the data by removing the unwanted literals such as punctuation, special characters, connectives and other unnecessary words. 
5. The script will then convert the phrase into its vector form. A phrase can be represented in n-dimensional vector space. A wordnet of some common cricket highlight words would be created and stored in for later use. 
6. All of this is carried keeping in mind the **emotions of the commentators in the audio and the words they speak**. For example, “bowled”, “that’s a six”, and others (for cricket).  
7. The vector would be parsed in a **TF-ID vectorizer**. Different similarity checks would be carried out in order to check the Similarity between the received text and the highlight words. 
8. Once we get the check results, we can use it to decide if that particular frame can be used or not. If yes, we would be giving the start and end timestamp of the highlight (considering a 5-sec time interval). 

## Challenges we ran into
1. One major challenge we faced is to fix the values for different similarity checks in order to see if the given phrase is of a highlight or not.
2. Different TF-ID vectors should be created for different sports in order to encompass all kinds of sports highlights.
3. Segregating different phrases belonging to the same highlight so as to avoid repetitive highlights. 
