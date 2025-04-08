import client from "../config/redisConnection.js"
import Games from "../models/games.model.js";
import User from "../models/user.model.js";


const initiallizeGame = async (gameId, playerId)=>{
    try {
        
        // console.log(gameId, playerId);
        const playerData = JSON.stringify({score:0, chances:3 ,isElemenated: false});
        // console.log(playerData)
        const gameKey = `game${gameId}`
        const result = await client.hSet(gameKey, playerId, playerData);

        console.log(result)

        if(result ===1){
            return {
                success: true,
                message: "Join the game successfully",
            }
        }else if(result ===0){
             return {
                success: true,
                message: "You already joint the game"
             }
        }else{
            return {
                success: false,
                message: "Something went wrong"
            }
        }



    } catch (error) {
        console.log("error in redis initiallizegame",error)
    }
}


const getPlayData  = async (gameId, playerId)=>{
    try {
        const gameKey = `game${gameId}`
        const result = await client.hGet(gameKey,playerId);
        const data = JSON.parse(result);

        console.log(data)

        return data ;

    } catch (error) {
        console.log("error in redis getAll players")
    }
}

const incrementInScores = async (gameId, playerId, response)=>{
    try {
        
        // console.log(gameId, playerId, response)
        const gameKey = `game${gameId}`
        const data = await client.hGet(gameKey , playerId)

      const result = JSON.parse(data)

    //   const alldata = await client.hGetAll(gameKey);
    //   console.log(alldata)

        console.log(result)  ;
        if(result.isElemenated === true){
        return result
        }else if(response === true){
        result.score += 5;
         }else if(result.chances < 1){
        result.isElemenated = true
       }else{
        result.chances -= 1;
       }

       await client.hSet(gameKey, playerId, JSON.stringify(result));

       

       return result

    } catch (error) {
        console.log("error in incrementing the points",error)

    }
}




// async function getAllPlayersData(gameId) {
//     const playersData = await redis.hgetall(`game:${gameId}`);
//     const parsedPlayersData = Object.fromEntries(
//       Object.entries(playersData).map(([playerId, data]) => [playerId, JSON.parse(data)])  
//     );
//     return parsedPlayersData;
//   }
//////--------------------------has to be removed----------------------------------------/////

const createGameWithUser = async(req ,res )=>{
    try {
        
        const { gameId , playerId } = req.body ;
        await initiallizeGame(gameId, playerId)

        res.status(200).json({
            success: true,
            message: "join game successfully"
        })
    } catch (error) {
        
        console.log("erro in createGameWithUser");
        throw new Error("error in createGameWithUser");

    }
}

const getPlayerdetails = async (req, res)=>{
    try {
        
        const { gameId, playerId } = req.body ;

       const data =  await getPlayData(gameId , playerId);

       res.status(200).json({
        success: true,
        message: "player data ",
        player: data
       })
    } catch (error) {
        console.log("errror in playerDetails route");
        throw new Error("errror in the playerDetails");
        
    }
}

const getPlayerincreamentScores =async (req,res)=>{
    try {
        
        const {gameId, playerId, answer} = req.body ;

      const data =   await incrementInScores(gameId, playerId, answer);


      res.status(200).json({
        success: true,
        message: "score manage successfully",
        data
      })


    } catch (error) {
        console.log("error in the getPlayerIncreamentScore");
        throw new Error("error in getPlayerIncreamentScore route");
    }
}


const createGames = async (req, res)=>{
    try {
       const { gameName , topic , createdAt } = req.body ;   

       if(! gameName || ! topic || !createdAt){
        res.status(200).json({
            success: false,
            message: "please provide all the fields"
        })
       }

       const id =req.user.uuid ;

       const user =  await User.findOne({
        where:{
            uuid : id
        }
       })

       delete user.dataValues.password ;

    //    console.log(createdAt,"---------------------------")
       const newDate = new Date(createdAt);

    //    console.log(newDate)

       const newGame = await Games.create({
        gameName: gameName,
        topic: topic,
        createdAt: newDate,
        userId : user.id
       })

    //    console.log(user)

      
       res.status(200).json({
        success: true,
        message: "game created successfully"
       })
    } catch (error) {
        
        console.log("error in the creating game createGames routes",error);
        throw new Error("this error is occure in the createGame routes")
    }
}

const getAllGames = async (req, res)=>{
    try {
        
        const result = await Games.findAll();

        res.status(200).json({
            success: true,
            message: "all data fetched successfully",
            games: result
        })

    } catch (error) {
        console.log("error in the getAll games");
        throw new Error("error in the get all funtion")

    }
}


const getGamesQuestions = async (topic)=>{
    try {
        
        const requestBody = {
            contents:[{
                parts:[{
                    text:`
                    Please provide [10] questions related to [${topic}] in the following JSON array format
                   [
                    {
                        "question": "[Your question here]",
                        "imageLink": "https://image/"
                        "answer": "[true or false]"
                    },
                    {
                        "question": "[Your next question here]",
                        "answer": "[true or false]"
                    }
                    ]
                    `}]
            }]
        }

        const data = await fetch(process.env.GEMINI_API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "User-Agent" : "PostmanRuntime/7.43.2",
                "Host": "<calculated when request is sent"
            },
            body:JSON.stringify(requestBody)
        })

        const  result = await data.json()

        console.log(result.candidates[0]?.content)

        const response = result.candidates[0]?.content

//         const rawText = response.parts[0].text;

// // Remove the backticks and extra whitespace
// const jsonString = rawText.match(/```(.*?)```/s)[1].trim();

// // Parse the JSON string into a JavaScript object
// const triviaQuestions = JSON.parse(jsonString);

// console.log(triviaQuestions);

// const rawText = response.parts[0].text;

// const jsonStringMatch = rawText.match(/```([\s\S]+?)```/); 

// if (jsonStringMatch && jsonStringMatch[1]) {
//   const jsonString = jsonStringMatch[1].trim();  

//   try {
    
//     const triviaQuestions = JSON.parse(jsonString);
//     console.log(triviaQuestions);  
//   } catch (error) {
//     console.error("Failed to parse JSON:", error);
//   }
// } else {
//   console.error("No valid JSON found in the response.");
// }


const rawText = response.parts[0].text;

// Use regular expression to find the JSON-like structure between the backticks
const jsonStringMatch = rawText.match(/```json\n([\s\S]+?)\n```/); // Match content inside the json block

// Check if we found a match for the JSON content
if (jsonStringMatch && jsonStringMatch[1]) {
  const jsonString = jsonStringMatch[1].trim();  // Clean up any surrounding whitespace

  try {
    // Try to parse the JSON string into a JavaScript object
    const triviaQuestions = JSON.parse(jsonString);
    console.log(triviaQuestions);  // This should now work without error
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
} else {
  console.error("No valid JSON found in the response.");
}


    } catch (error) {
        console.log("there is error in finding the quesiton", error);
        throw new Error("this error is occure in getGamesQuestion")
    }
}


const generateQuestion = async (req, res)=>{
    try {
         const { topic } = req.body ;

       const response =   await getGamesQuestions(topic) ;

         res.status(200).json({
            success: true,
            message: "fetched the question",
            questoins: response
         })

    } catch (error) {
        console.log("error in ")
    }
}

export { createGameWithUser, getPlayerdetails, getPlayerincreamentScores, initiallizeGame, incrementInScores, getPlayData,
     createGames, getAllGames, generateQuestion
 }