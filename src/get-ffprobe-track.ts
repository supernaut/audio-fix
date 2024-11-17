import { Choice } from "jsr:@sallai/ask";
import { type FfprobeStream } from "../types/ffprobe-output.ts";
import { getChannels } from "./get-channels.ts";
import { getLanguage } from "./get-language.ts";

function getFfprobeAudioTrack(track: FfprobeStream) {
    const codec = [
        track.channel_layout || getChannels(track?.channels),
        track.codec_name,
    ].join(" ");
    const message = [
        [
            getLanguage(track.tags?.language),
            codec,
        ].filter(Boolean).join(", "),
        track.tags?.title,
    ].filter(Boolean).join(": ");
    return { value: track.id, message };
}

export function getFfprobeTrack(
    track: FfprobeStream | undefined,
): undefined | Choice {
    if (track?.codec_type !== "audio") {
        return;
    }
    return getFfprobeAudioTrack(track);
}
