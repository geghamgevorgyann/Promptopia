import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req: Request) => {
    const { userId, prompt, tag} = await req.json();
    try {
        connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 }); 
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to create a new prompt" }), { status: 500 });
    }
}       