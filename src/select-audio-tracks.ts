#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-run
import * as path from "jsr:@std/path";
import { getAudioChoies } from "./get-audio-choices.ts";
import { trimAudioTracks } from "./trim-audio-tracks.ts";
import { pickAudioTracks } from "./pick-audio-tracks.ts";

// Values needed for error handling
const errorStyle = "color: red";
const emphasisStyle = "color: yellow";

// Listen for SIGING, ie user presses ctrl-c
Deno.addSignalListener("SIGINT", () => {
    console.log("\nAudio track selection aborted!");
    Deno.exit(1);
});

// Some static values
type ValidExtension = ".mkv" | ".mp4";
const validExtensions: string[] = [".mkv", ".mp4"] as const;
function isValidExtension(input: string | undefined): input is ValidExtension {
    return typeof input === "string" && validExtensions.includes(input);
}

try {
    // Get and validate input
    const input = Deno.args[0];

    // Check that input filename was provided
    if (!input) {
        console.error("%cNo input file specified!", errorStyle);
        Deno.exit(2);
    }

    // Check that provided file is exists and is valid
    let fileInfo: Deno.FileInfo;
    try {
        fileInfo = await Deno.stat(input);
    } catch (error) {
        if (!(error instanceof Deno.errors.NotFound)) {
            throw error;
        }
        console.error(
            `%cInput file %c${input} %cis does not exist!`,
            errorStyle,
            emphasisStyle,
            errorStyle,
        );
        Deno.exit(2);
    }
    if (!fileInfo.isFile) {
        console.error(
            `%cInput file %c${input} %cis not a file!`,
            errorStyle,
            emphasisStyle,
            errorStyle,
        );
        Deno.exit(2);
    }
    const extension = path.extname(input).toLowerCase();
    if (!isValidExtension(extension)) {
        console.error(
            `%cInput file %c${input} %cis not MKV or MP4!`,
            errorStyle,
            emphasisStyle,
            errorStyle,
        );
        Deno.exit(2);
    }

    const choices = await getAudioChoies(input);

    const tracks = await pickAudioTracks(choices);

    const { duration, size } = await trimAudioTracks(input, tracks);

    console.log(
        `Audio tracks trimmed in ${duration}, ${size} saved!`,
    );
    Deno.exit(0);
} catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
    }
    console.error(
        `%cInput file does not exist!`,
        errorStyle,
    );
    Deno.exit(2);
}
