import * as path from "jsr:@std/path";
import { MkvmergeIdentificationOutput } from "../../types/mkvmerge-identification-output.ts";
import { Spinner } from "jsr:@std/cli/unstable-spinner";
import { Choice } from "jsr:@sallai/ask";
import { getAllMkvMergeTracks } from "./get-all-mkvmerge-tracks.ts";

import { emphasisStyle, errorStyle } from "../styles.ts";
import { FfprobeOutput } from "../../types/ffprobe-output.ts";
import { getAllFfprobeTracks } from "./get-all-ffprobe-tracks.ts";

export async function getAudioChoies(input: string): Promise<Choice[]> {
    const spinner = new Spinner({ message: "Getting track info" });
    spinner.start();
    const textDecoder = new TextDecoder();
    const extension = path.extname(input).toLowerCase();
    let choices: Choice[] = [];

    if (extension === ".mkv") {
        const command = new Deno.Command("mkvmerge", {
            args: [
                "--identification-format",
                "json",
                "-i",
                input,
            ],
        });

        const result = await command.output();
        if (!result.success) {
            console.error(textDecoder.decode(result.stderr));
            Deno.exit(1);
        }
        const output: MkvmergeIdentificationOutput = JSON.parse(
            textDecoder.decode(result.stdout),
        );
        choices = getAllMkvMergeTracks(output);
    }
    if (extension === ".mp4") {
        // jq '.streams[] | select(.codec_type=="audio") | "\(.index): \(.tags.language), \(.tags.title)"'
        const command = new Deno.Command("ffprobe", {
            args: [
                "-v",
                "quiet",
                "-print_format",
                "json",
                "-show_format",
                "-show_streams",
                input,
            ],
        });

        const result = await command.output();
        if (!result.success) {
            console.error(textDecoder.decode(result.stderr));
            Deno.exit(1);
        }
        const output: FfprobeOutput = JSON.parse(
            textDecoder.decode(result.stdout),
        );

        choices = getAllFfprobeTracks(output);
    }

    if (!choices.length) {
        console.error(
            `%cInput file %c${input} %chas no audio tracks!`,
            errorStyle,
            emphasisStyle,
            errorStyle,
        );
        spinner.stop();
        Deno.exit(2);
    }
    if (choices.length === 1) {
        console.log(
            `%cInput file %c${input} %conly has one audio track!`,
            errorStyle,
            emphasisStyle,
            errorStyle,
        );
        spinner.stop();
        Deno.exit(0);
    }
    spinner.stop();
    return choices;
}
