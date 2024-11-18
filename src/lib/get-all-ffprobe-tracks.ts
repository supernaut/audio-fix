import { Choice } from "jsr:@sallai/ask";
import { FfprobeOutput } from "../../types/ffprobe-output.ts";
import { getFfprobeTrack } from "../lib/get-ffprobe-track.ts";

function getTracks(
    input: FfprobeOutput,
    type: "audio" | "subtitles" = "audio",
): Choice[] {
    return (input?.streams?.filter((track) => track?.codec_type === type)?.map(
        getFfprobeTrack,
    ).filter(Boolean) as Choice[]) || [];
}

export function getAllFfprobeTracks(input: FfprobeOutput) {
    return getTracks(input, "audio");
}
