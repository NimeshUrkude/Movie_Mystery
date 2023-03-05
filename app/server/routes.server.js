import { json } from "react-router";
import {prisma} from "./database.server";

export async function addnewdatatodatabase(board){
    if(board.boardname.length!==0 && board.boardscore>=0){
        try{
            await prisma.nsi.create({
                data:{
                    name:board.boardname,
                    score:board.boardscore,
                },
            });
            return({
                message:"Created success",
                status:"201",
            });
        }
        catch(e){
            throw json({
                message:"Internal Server Error",
                status:"500",
            })
        }
    }
    else{
        console.log(e);
        throw json({
            menubar:"Unprocessable Content",
            status:"422",
        })
    }
}

export async function findallfromdatabase(){
    try{
        const temp = await prisma.nsi.findMany({ orderBy: { score: 'desc' } });
        if(temp.length === 0){
            throw json({
                message:"No Content",
                status:"204",
            })
        }
        else{
            return temp;
        }
    }
    catch(e){
        console.log(e);
        throw json({
            message:"Internal Server Error",
            status:"500",
        })
    }
}