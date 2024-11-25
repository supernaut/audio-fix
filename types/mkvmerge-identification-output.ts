/**
 * Inferred from https://mkvtoolnix.download/doc/mkvmerge-identification-output-schema-v20.json
 */

interface WithUid {
    uid?: number;
}

interface Attachment {
    content_type?: string;
    description?: string;
    file_name: string;
    id: number;
    size: number;
    properties: WithUid;
    type?: string;
}

interface NumberOfEntries {
    num_entries: number;
}

interface Program {
    /**
     * A unique number identifying a set of tracks that belong together; used e.g. in DVB for multiplexing multiple stations within a single transport stream
     */
    program_number?: number;
    /**
     * The name of a service provided by this program, e.g. a TV channel name such as 'arte HD'
     */
    service_name?: string;
    /**
     * The name of the provider of the service provided by this program, e.g. a TV station name such as 'ARD'
     */
    service_provider?: string;
}

interface TrackTag extends NumberOfEntries {
    track_id: number;
}

interface ContainerProperties {
    /**
     * A unique number identifying the container type that's supposed to stay constant over all future releases of MKVToolNix
     */
    container_type?: number;
    /**
     * The muxing date in ISO 8601 format (in local time zone)
     */
    date_local?: string;
    /**
     * The muxing date in ISO 8601 format (in UTC)
     */
    date_utc?: string;
    /**
     * The file's/segment's duration in nanoseconds
     */
    duration?: number;
    /**
     * States whether or not the container has timestamps for the packets (e.g. Matroska, MP4) or not (e.g. SRT, MP3)
     */
    is_providing_timestamps?: boolean;
    /**
     * A Unicode string containing the name and possibly version of the low-level library or application that created the file
     */
    muxing_application?: string;
    /**
     * A hexadecimal string of the next segment's UID (only for Matroska files)
     */
    next_segment_uid?: string;
    /**
     * An array of names of additional files processed as well
     */
    other_file?: string[];
    /**
     * States whether or not the identified file is a playlist (e.g. MPLS) referring to several other files
     */
    playlist?: boolean;
    /**
     * The number of chapters in a playlist if it is a one
     */
    playlist_chapters?: number;
    /**
     * The total duration in nanoseconds of all files referenced by the playlist if it is a one
     */
    playlist_duration?: number;
    /**
     * An array of file names the playlist contains
     */
    playlist_file?: string[];
    /**
     * The total size in bytes of all files referenced by the playlist if it is a one
     */
    playlist_size?: number;
    /**
     * A hexadecimal string of the previous segment's UID (only for Matroska files)
     */
    previous_segment_uid?: string;
    /**
     * A container describing multiple programs multiplexed into the source file, e.g. multiple programs in one DVB transport stream
     */
    programs?: Program[];
    /**
     * A hexadecimal string of the segment's UID (only for Matroska files)
     */
    segment_uid?: string;
    /**
     * Base unit for segment ticks and track ticks, in nanoseconds. A timestamp_scale value of 1.000.000 means scaled timestamps in the segment are expressed in milliseconds.
     */
    timestamp_scale?: number;
    title?: string;
    /**
     * A Unicode string containing the name and possibly version of the high-level application that created the file
     */
    writing_application?: string;
}

interface Container {
    /**
     * additional properties for the container varying by container format
     */
    properties?: ContainerProperties;
    /**
     * States whether or not mkvmerge knows about the format
     */
    recognized: boolean;
    /**
     * States whether or not mkvmerge can read the format
     */
    supported: boolean;
    /**
     * A human-readable description/name for the container format
     */
    type?: string;
}

type TrueFalseOrUnknown = "true" | "false" | "unknown";

interface TrackProperties extends WithUid {
    aac_is_sbr?: TrueFalseOrUnknown;
    alpha_mode?: number;
    audio_bits_per_sample?: number;
    audio_channels?: number;
    /**
     * Audio emphasis applied on audio samples. The player MUST apply the inverse emphasis to get the proper audio samples.
     */
    audio_emphasis?: number;
    audio_sampling_frequency?: number;
    cb_subsample?: string;
    chroma_siting?: string;
    chroma_subsample?: string;
    chromaticity_coordinates?: string;
    codec_delay?: number;
    codec_id?: string;
    codec_name?: string;
    codec_private_data?: string;
    codec_private_length?: number;
    content_encoding_algorithms?: string;
    color_bits_per_channel?: number;
    color_matrix_coefficients?: number;
    color_primaries?: number;
    color_range?: number;
    color_transfer_characteristics?: number;
    default_duration?: number;
    default_track?: boolean;
    display_dimensions?: string;
    display_unit?: number;
    enabled_track?: boolean;
    /**
     * The encoding/character set of a track containing text (e.g. subtitles) if it can be determined with confidence. For such tracks the encoding cannot be changed by the user.
     */
    encoding?: string;
    forced_track?: boolean;
    /**
     * Can be set if that track is suitable for users with hearing impairments.
     */
    flag_hearing_impaired?: boolean;
    /**
     * Can be set if that track is suitable for users with visual impairments.
     */
    flag_visual_impaired?: boolean;
    /**
     * Can be set if that track contains textual descriptions of video content suitable for playback via a text-to-speech system for a visually-impaired user.
     */
    flag_text_descriptions?: boolean;
    /**
     * Can be set if that track is in the content's original language (not a translation).
     */
    flag_original?: boolean;
    /**
     * Can be set if that track contains commentary.
     */
    flag_commentary?: boolean;
    /**
     * The track's language as an ISO 639-2 language code
     */
    language?: string;
    /**
     * The track's language as an IETF BCP 47/RFC 5646 language tag
     */
    language_ietf?: string;
    max_content_light?: number;
    max_frame_light?: number;
    max_luminance?: number;
    min_luminance?: number;
    /**
     * The minimum timestamp in nanoseconds of all the frames of this track found within the first couple of seconds of the file
     */
    minimum_timestamp?: number;
    /**
     * An array of track IDs indicating which tracks were originally multiplexed within the same track in the source file
     */
    multiplexed_tracks?: number[];
    number?: number;
    num_index_entries?: number;
    packetizer?: string;
    pixel_dimensions?: string;
    /**
     * A unique number identifying a set of tracks that belong together; used e.g. in DVB for multiplexing multiple stations within a single transport stream
     */
    program_number?: number;
    projection_pose_pitch?: number;
    projection_pose_roll?: number;
    projection_pose_yaw?: number;
    projection_private?: string;
    projection_type?: number;
    stereo_mode?: number;
    /**
     * A format-specific ID identifying a track, possibly in combination with a 'sub_stream_id' (e.g. the program ID in an MPEG transport stream)
     */
    stream_id?: number;
    /**
     * A format-specific ID identifying a track together with a 'stream_id'
     */
    sub_stream_id?: number;
    teletext_page?: number;
    text_subtitles?: boolean;
    track_name?: string;
    white_color_coordinates?: string;
}

export interface MkvmergeTrack {
    codec: string;
    id: number;
    type: string;
    properties?: TrackProperties;
}

export interface MkvmergeIdentificationOutput {
    /**
     * an array describing the attachments found if any
     */
    attachments?: Attachment[];
    chapters?: NumberOfEntries[];
    /**
     * information about the identified container
     */
    container?: Container;
    errors?: string[];
    /**
     * the identified file's name
     */
    file_name?: string;
    global_tags?: NumberOfEntries[];
    /**
     * The output format's version
     */
    identification_format_version?: number;
    track_tags?: TrackTag[];
    tracks?: MkvmergeTrack[];
    warnings?: string[];
}
