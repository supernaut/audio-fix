import { Choice } from "jsr:@sallai/ask";
import { type MkvmergeTrack } from "../../types/mkvmerge-identification-output.ts";
import { getChannels } from "./get-channels.ts";
import { getLanguage } from "./get-language.ts";

function getMkvMergeAudioTrack(track: MkvmergeTrack) {
    const codec = [
        getChannels(track.properties?.audio_channels),
        track.codec,
    ].join(" ");
    const message = [
        [
            getLanguage(track.properties?.language),
            codec,
            track.properties?.flag_original &&
            "(Original)",
        ].filter(Boolean).join(", "),
        track.properties?.track_name,
    ].filter(Boolean).join(": ");
    return { value: track.id, message };
}

export function getMkvMergeTrack(
    track: MkvmergeTrack | undefined,
): undefined | Choice {
    if (track?.type !== "audio") {
        return;
    }
    return getMkvMergeAudioTrack(track);
}
