# AI-powered-visual-storytelling-telling-journal
## Project Description:
The Visual Storytelling Journal is a web-based Single Page Application (SPA) that transforms users’
personal photo collections into engaging narrative storybooks. By integrating the Google Vision API,
the system extracts meaningful details such as objects, scenes, and text from images, while the Google
Gemini API weaves these insights into creative, diary-like narratives. Users can connect their Google
Photos or Pinterest accounts, select albums, and instantly generate unique storybooks that combine
visuals with AI-driven storytelling. All results are stored securely in Google Firestore, allowing users to
revisit, share, and personalize their journals, making photo memories more meaningful and
interactive.
## Mock up interfaces
### Homepage 
![alt text](https://github.com/anushkaDev9/AI-powered-visual-storytelling-telling-journal/blob/main/homepage1.png)
### Dashboard 
![alt text](https://github.com/anushkaDev9/AI-powered-visual-storytelling-telling-journal/blob/main/Dashboardfinal.png)
### MediaLibrary
![alt text](https://github.com/anushkaDev9/AI-powered-visual-storytelling-telling-journal/blob/main/Media%20library.png)
### Storybook
![alt text](https://github.com/anushkaDev9/AI-powered-visual-storytelling-telling-journal/blob/main/storybook.png)
## System Diagram
![alt text](https://github.com/anushkaDev9/AI-powered-visual-storytelling-telling-journal/blob/main/system%20diagram.png)
## Flow of Control Details
### STEP 1+2 – Retrieve User Photos [UP]
Trigger: User clicks “Import Photos” in the New Storybook Page.<br/>
Action: <br/>
   o Authenticate with Social Network X (Google Photos / Pinterest) via OAuth.<br/>
   o Fetch list of albums/photos via their API.<br/>
   o Log API call for analytics.v
   o Output: [UP] → array of user photos (URLs, titles, timestamps).<br/>
### STEP 3a – Filter Already Processed Photos
• Action:<br/>
o Query Firestore to check which photo URLs are already processed.<br/>
o Filter [UP] → [UP'] containing only new photos.<br/>
o Log analytics<br/>
o Output: [UP'] → new photos to process.<br/>
### STEP 3b – Process Photos with AI
• Loop over each photo i in [UP']:<br/>
1. Vision API Call:<br/>
▪ Analyze images for objects, scenes, faces, text.<br/>
▪ Store output as OutputXXX[i].<br/>
▪ Log API call with latency & response<br/>
2. Gemini API Call:<br/>
• Generate narrative based on OutputXXX[i] and user context.<br/>
• Store output as OutputZZZ[i].<br/>
• Log API calls and processing times<br/>
3. Store in Hash / Data Structure<br/>
   <code>Hash[photoURL] = {
"userName": userName,
"photoURL": photoURL,
"visionOutput": OutputXXX[i],
"geminiOutput": OutputZZZ[i]
}</code>
### STEP 4 – Process with Gemini (Storybook Aggregation)
• Action:<br/>
o Optionally combine multiple images’ visionOutput + geminiOutput into a single<br/>
storybook narrative.<br/>
o Store as StorageRecordZZZ (AI-generated storybook).<br/>
o Log aggregation analytics<br/>
### STEP 5 – Store storybook in Google Database
• Action:<br/>
o Save individual photo analysis + narrative outputs + aggregated storybook in Firestore.<br/>
o Structure:<br/>
<pre>Collection: users/{userID}/storybooks/{storybookID}- photos: [photoURL, visionOutput, geminiOutput,mood, theme]- aggregatedNarrative: ZZZ- timestamp</pre>
o Log storage action<br/>
### STEP 6 – Retrieve Storybooks for Display
• Action:<br/>
o Query Firestore for all or relevant storybooks for the user.<br/>
o Display results in Dashboard / Insights / Storybook View.<br/>
o Log retrieval.<br/>
![alt text](https://github.com/anushkaDev9/AI-powered-visual-storytelling-telling-journal/blob/main/flow-diagram.PNG)
## Purpose embedded
The retrieved storybooks are the final AI-generated narratives reflecting the user’s personal photos
and journaling experience.

