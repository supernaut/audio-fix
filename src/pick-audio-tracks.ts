import { Ask, Choice } from "jsr:@sallai/ask";
import { errorStyle } from "./styles.ts";

export async function pickAudioTracks(choices: Choice[]): Promise<number[]> {
    const ask = new Ask();
    const responses = await ask.checkbox(
        {
            name: "audio",
            type: "checkbox",
            message: "Select audio tracks:",
            choices,
        },
    );

    if (!responses.audio?.length) {
        console.error(
            "%cNo audio tracks selected!",
            errorStyle,
        );
        Deno.exit(1);
    }
    return responses.audio;
}
