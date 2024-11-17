import * as path from "jsr:@std/path";
import { MkvmergeIdentificationOutput } from "../types/mkvmerge-identification-output.ts";
import { Spinner } from "jsr:@std/cli/unstable-spinner";
import { getMkvMergeTrack } from "./get-mkvmerge-track.ts";
import { Ask, CheckboxOpts, Choice } from "jsr:@sallai/ask";
import { getAllMkvMergeTracks } from "./get-all-mkvmerge-tracks.ts";
import { filesize } from "npm:filesize";
import prettyMilliseconds from "npm:pretty-ms";
import { emphasisStyle, errorStyle } from "./styles.ts";

export async function trimAudioTracks(
    input: string,
    tracks: number[],
): Promise<{ duration: string; size: string }> {
    const spinner = new Spinner({ message: "Trimming audio tracks" });
    spinner.start();

    const textDecoder = new TextDecoder();
    const extension = path.extname(input).toLowerCase();
    const fileInfo = await Deno.stat(input);

    const tempFile = input + ".temp";

    const mergeStart = performance.now();

    if (extension === ".mkv") {
        const command = new Deno.Command("mkvmerge", {
            args: [
                "-o",
                tempFile,
                "--audio-tracks",
                tracks.join(","),
                "--no-subtitles",
                input,
            ],
        });

        const result = await command.output();

        if (!result.success) {
            console.error(textDecoder.decode(result.stderr));
            Deno.exit(1);
        }
    }
    if (extension === ".mp4") {
        const command = new Deno.Command("ffmpeg", {
            args: [
                "-i",
                input,
                "-map",
                "0:0",
                ...tracks.flatMap((track) => ["-map", `0:${track}`]),
                "-c",
                "copy",
                "-f",
                "mp4",
                tempFile,
            ],
        });
        const result = await command.output();

        if (!result.success) {
            console.error(textDecoder.decode(result.stderr));
            Deno.exit(1);
        }
    }

    let resultFileInfo: Deno.FileInfo;
    try {
        resultFileInfo = await Deno.lstat(tempFile);
    } catch (error) {
        if (!(error instanceof Deno.errors.NotFound)) {
            throw error;
        }
        console.error(
            `%cOutput file was not generated!`,
            errorStyle,
        );
        Deno.exit(1);
    }
    const size = filesize(fileInfo.size - resultFileInfo.size);

    const backupFile = input + ".bak";

    await Deno.rename(input, backupFile);
    await Deno.rename(tempFile, input);
    await Deno.remove(backupFile);

    const mergeEnd = performance.now();
    const duration = prettyMilliseconds(Math.round(mergeEnd - mergeStart));
    spinner.stop();
    return { duration, size };
}
export type TrimAudioTracksResult = Awaited<ReturnType<typeof trimAudioTracks>>;
