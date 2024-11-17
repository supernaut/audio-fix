import { Choice } from "jsr:@sallai/ask";
import { MkvmergeIdentificationOutput } from "../types/mkvmerge-identification-output.ts";
import { getMkvMergeTrack } from "./get-mkvmerge-track.ts";

function getTracks(
    input: MkvmergeIdentificationOutput,
    type: "audio" | "subtitles",
): Choice[] {
    return (input?.tracks?.filter((track) => track?.type === type)?.map(
        getMkvMergeTrack,
    ).filter(Boolean) as Choice[]) || [];
}

export function getAllMkvMergeTracks(input: MkvmergeIdentificationOutput) {
    return getTracks(input, "audio");
}
