// Xharktank is Rest api where entrepreneur can pitch their start up’s idea and investor can invest in pitched ideas.



Tech stack – Node.js, MonoDb, Javascript

XharkTank application:-

Entrepreneurs will post Pitch by providing these inputs -
  Name of the entrepreneur posting the pitch
  Title of the pitch
  Business Idea for the Product they wish to develop
  Ask Expected Amount for investment
  Percentage of Equity to be diluted

Investors will view all the latest pitches posted till the date-
  If the entrepreneurs post a new pitch, that should also get listed. Note that these submitted pitches will be shown one below the other.
  
Investors will make an counter offer to the pitch by providing these inputs-
  Unique Id of the Pitch made by the entrepreneur
  Name of the investor making a counter offer
  Amount ready to invest in the idea
  Ask Percentage of Equity for a company


// Xharktank API

1. Endpoint to post a pitch to the backend -  

curl --location --request POST 'http://<Server_URL>/pitches' \
--header 'Content-Type: application/json' \
--data-raw '{
"entrepreneur": "Ashok kumar",
"pitchTitle" : "Crio.Do - Work-experience based learning programs for developers",
"pitchIdea" : "Build professional projects like the top 1% developers. Master the latest full stack and backend tech with real work-ex. Crack developer jobs at the best tech companies.",
"askAmount": 10000000.25,
"equity" : 12.5
}'

2. Endpoint to make a counter offer for a pitch to the backend - 
  
curl --location --request POST 'http://<Server_URL>/pitches/<pitchId>/makeOffer' \
--header 'Content-Type: application/json' \
--data-raw '{
"investor": "Anupam Mittal",
"amount" : 10000000.56,
"equity" : 20.2,
"comment": "A new concept in the ed-tech market. I can relate with the importance of the Learn By Doing philosophy. Keep up the Good Work! Definitely interested to work with you to scale the vision of the company!"
}'

3. Endpoint to fetch the all the pitches in the reverse chronological order ( i.e. last created one first ) from the backend 
4. Endpoint to fetch single pitch by pitch id
  


